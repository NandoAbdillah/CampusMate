"use client";

import { auth, googleProvider } from "@/lib/firebaseConfig";
import { StudentController } from "@/lib/StudentsController";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  const allowedStudents = ["25051204013", "25051204012", "25051204059 "];
  const adminEmails = [
    "25051204012@mhs.unesa.ac.id",
    "25051204059@mhs.unesa.ac.id",
  ];

  const SESSION_DURATION = 30 * 24 * 60 * 60 * 1000;

  const validateStudentEmail = (email) => {
    const emailRegex = /^(\d{11})@mhs\.unesa\.ac\.id$/;
    const match = email.match(emailRegex);

    if (!match) {
      return {
        isValid: false,
        error: "Format email harus NIM@mhs.unesa.ac.id",
      };
    }

    const nim = match[1];
    if (!allowedStudents.includes(nim)) {
      return {
        isValid: false,
        error: "NIM Anda tidak terdaftar dalam kelas ini",
      };
    }

    return {
      isValid: true,
      nim,
    };
  };

  const isAdmin = (email) => {
    return adminEmails.includes(email);
  };

  const saveSessionInfo = (userData) => {
    try {
      const shortName = userData.displayName
        .split("_")[1]
        .split(" ")
        .slice(0, 2)
        .join(" ");
      const sessionData = {
        userId: userData.uid,
        email: userData.email,
        displayName: userData.displayName,
        name: shortName,
        nim: userData.nim || null,
        isAdmin: userData.isAdmin || false,
        loginTime: Date.now(),
        expiresAt: Date.now() + SESSION_DURATION,
      };

      localStorage.setItem("userSession", JSON.stringify(sessionData));

      setUser(sessionData);
      // section saved
      // console.log(' Session saved:', sessionData);
    } catch (error) {
      // error
      console.error("Error saving session:", error);
    }
  };

  const getStoredSession = () => {
    try {
      const sessionData = localStorage.getItem("userSession");
      if (!sessionData) {
        console.log("No stored session found");
        return null;
      }

      const session = JSON.parse(sessionData);
      const now = Date.now();

      // Check if session expired (> 30 days)
      if (now > session.expiresAt) {
        localStorage.removeItem("userSession");
        // console.log('Session expired, removed from localStorage');
        return null;
      }

      const daysLeft = Math.round(
        (session.expiresAt - now) / (1000 * 60 * 60 * 24)
      );
      // console.log('Valid session found, expires in', daysLeft, 'days');
      return session;
    } catch (error) {
      console.error("Error checking session:", error);
      return null;
    }
  };

  const clearSession = () => {
    localStorage.removeItem("userSession");
    console.log("Session cleared");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log("🔄 Auth state changed:", firebaseUser?.email || "No user");

      if (firebaseUser) {
        try {
          const storedSession = getStoredSession();

          // Check if admin
          if (isAdmin(firebaseUser.email)) {
            // console.log('Admin login detected');

            const userData = {
              ...firebaseUser,
              isAdmin: true,
              nim: null,
            };

            setUser(userData);
            saveSessionInfo(userData);
            setAuthError(null);
            setLoading(false);

            // console.log('Admin user set successfully');
            return;
          }

          const validation = validateStudentEmail(firebaseUser.email);

          if (!validation.isValid) {
            console.log("Email validation failed:", validation.error);
            setUser(null);
            setAuthError(validation.error);
            clearSession();
            await signOut(auth);
            setLoading(false);
            return;
          }

          console.log("Email validation passed for NIM:", validation.nim);

          // opsional
          try {
            const isAllowed = await StudentController.isStudentAllowed(
              validation.nim
            );
            if (!isAllowed) {
              // console.log('Student not allowed in database');
              setUser(null);
              setAuthError(
                "NIM Anda tidak terdaftar dalam database atau sudah dinonaktifkan"
              );
              clearSession();
              await signOut(auth);
              setLoading(false);
              return;
            }
            console.log("Database check passed");
          } catch (dbError) {
            console.warn(
              "Database check failed, allowing based on hardcoded list:",
              dbError.message
            );
            // Continue dengan validation list hardcoded
          }

          // User valid - CREATE USER OBJECT
          const userData = {
            ...firebaseUser,
            nim: validation.nim,
            isAdmin: false,
          };

          console.log(
            "Setting valid user:",
            userData.email,
            "NIM:",
            userData.nim
          );
          setUser(userData);
          saveSessionInfo(userData);
          setAuthError(null);
        } catch (error) {
          console.error("Auth validation error:", error);
          setUser(null);
          setAuthError("Terjadi kesalahan saat validasi. Silakan coba lagi.");
          clearSession();
          await signOut(auth);
        }
      } else {
        // User logged out
        console.log("User logged out");
        setUser(null);
        setAuthError(null);
        clearSession();
      }

      setLoading(false);
      // console.log('Auth loading completed');
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    try {
      setAuthError(null);
      setLoading(true);

      // console.log('Attempting Google login...');

      const result = await signInWithPopup(auth, googleProvider);
      // console.log('Login popup successful:', result.user.email);

      // JANGAN validate di sini, biarkan onAuthStateChanged yang handle
      return result.user;
    } catch (error) {
      console.error("Login error:", error);

      let errorMessage = "Terjadi kesalahan saat login";

      if (error.code === "auth/popup-closed-by-user") {
        errorMessage = "Login dibatalkan";
      } else if (error.code === "auth/popup-blocked") {
        errorMessage = "Popup diblokir browser. Silakan izinkan popup";
      } else if (error.code === "auth/unauthorized-domain") {
        errorMessage =
          "Domain tidak diizinkan. Pastikan mengakses dari domain yang benar";
      } else if (error.code === "auth/operation-not-allowed") {
        errorMessage = "Google Sign-In belum diaktifkan";
      } else {
        errorMessage = error.message;
      }

      setAuthError(errorMessage);
      setLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      clearSession();
      console.log("Logged out and session cleared");
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };

  const value = {
    user,
    loginWithGoogle,
    logout,
    loading,
    authError,
    isAdmin: user?.isAdmin || false,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
