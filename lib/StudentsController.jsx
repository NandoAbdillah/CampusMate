// lib/studentController.js
import {
  collection,
  doc,
  getDoc,
  setDoc,
  getDocs,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

const STUDENTS_COLLECTION = "allowed_students";

export class StudentController {
 
  static async addAllowedStudent(nim, name, email, adminUserId) {
    try {
     
      if (!adminUserId) {
        throw new Error("Unauthorized: Admin access required");
      }

      const studentData = {
        nim,
        name,
        email,
        addedBy: adminUserId,
        addedAt: serverTimestamp(),
        isActive: true,
      };

      await setDoc(doc(db, STUDENTS_COLLECTION, nim), studentData);
      return studentData;
    } catch (error) {
      console.error("Error adding student:", error);
      throw error;
    }
  }

  // Mengecek apakah NIM diizinkan
  static async isStudentAllowed(nim) {
    try {
      const docRef = doc(db, STUDENTS_COLLECTION, nim);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        return data.isActive === true;
      }

      return false;
    } catch (error) {
      console.error("Error checking student:", error);
      return false;
    }
  }

  // Mendapatkan semua mahasiswa yang diizinkan
  static async getAllowedStudents() {
    try {
      const querySnapshot = await getDocs(collection(db, STUDENTS_COLLECTION));
      const students = [];

      querySnapshot.forEach((doc) => {
        students.push({
          nim: doc.id,
          ...doc.data(),
        });
      });

      return students;
    } catch (error) {
      console.error("Error getting students:", error);
      throw error;
    }
  }

  // Menonaktifkan mahasiswa
  static async deactivateStudent(nim, adminUserId) {
    try {
      if (!adminUserId) {
        throw new Error("Unauthorized: Admin access required");
      }

      const docRef = doc(db, STUDENTS_COLLECTION, nim);
      await setDoc(
        docRef,
        {
          isActive: false,
          deactivatedBy: adminUserId,
          deactivatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      return { message: "Student deactivated successfully" };
    } catch (error) {
      console.error("Error deactivating student:", error);
      throw error;
    }
  }

  // Menghapus mahasiswa dari daftar
  static async removeStudent(nim, adminUserId) {
    try {
      if (!adminUserId) {
        throw new Error("Unauthorized: Admin access required");
      }

      const docRef = doc(db, STUDENTS_COLLECTION, nim);
      await deleteDoc(docRef);

      return { message: "Student removed successfully" };
    } catch (error) {
      console.error("Error removing student:", error);
      throw error;
    }
  }
}
