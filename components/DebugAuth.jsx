"use client";
import { useAuth } from "@/utils/AuthContext";
import { auth } from "@/lib/firebaseConfig";
import { useEffect, useState } from "react";

export default function DebugAuth() {
  const { user, loading, authError } = useAuth();
  const [debugInfo, setDebugInfo] = useState({});

  useEffect(() => {
    const updateDebugInfo = () => {
      const sessionData = localStorage.getItem('userSession');
      let parsedSession = null;
      
      try {
        parsedSession = sessionData ? JSON.parse(sessionData) : null;
      } catch (e) {
        console.error('Error parsing session:', e);
      }

      setDebugInfo({
        // Auth Context State
        contextUser: user ? {
          email: user.email,
          nim: user.nim,
          isAdmin: user.isAdmin
        } : null,
        contextLoading: loading,
        contextError: authError,
        
        // Firebase Auth State
        firebaseUser: auth.currentUser ? {
          email: auth.currentUser.email,
          uid: auth.currentUser.uid,
          displayName: auth.currentUser.displayName
        } : null,
        
        // Session Storage
        sessionStorage: parsedSession,
        sessionValid: parsedSession ? Date.now() < parsedSession.expiresAt : false,
        
        // Timestamps
        now: new Date().toISOString()
      });
    };

    updateDebugInfo();
    const interval = setInterval(updateDebugInfo, 1000);

    return () => clearInterval(interval);
  }, [user, loading, authError]);

  const clearAllData = () => {
    localStorage.clear();
    window.location.reload();
  };

  const forceLogout = async () => {
    try {
      await auth.signOut();
      localStorage.clear();
    } catch (error) {
      console.error('Force logout error:', error);
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg mb-4 text-xs">
      <h3 className="font-bold mb-2">🐛 Auth Debug Panel</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Context State */}
        <div>
          <h4 className="font-semibold text-blue-600 mb-1">Context State:</h4>
          <div className="bg-white p-2 rounded">
            <div>Loading: <span className={debugInfo.contextLoading ? 'text-yellow-600' : 'text-green-600'}>
              {debugInfo.contextLoading ? 'Yes' : 'No'}
            </span></div>
            <div>User: <span className={debugInfo.contextUser ? 'text-green-600' : 'text-red-600'}>
              {debugInfo.contextUser ? debugInfo.contextUser.email : 'None'}
            </span></div>
            {debugInfo.contextUser && (
              <>
                <div>NIM: {debugInfo.contextUser.nim || 'N/A'}</div>
                <div>Admin: {debugInfo.contextUser.isAdmin ? 'Yes' : 'No'}</div>
              </>
            )}
            {debugInfo.contextError && (
              <div className="text-red-600">Error: {debugInfo.contextError}</div>
            )}
          </div>
        </div>

        {/* Firebase State */}
        <div>
          <h4 className="font-semibold text-orange-600 mb-1">Firebase State:</h4>
          <div className="bg-white p-2 rounded">
            <div>Firebase User: <span className={debugInfo.firebaseUser ? 'text-green-600' : 'text-red-600'}>
              {debugInfo.firebaseUser ? debugInfo.firebaseUser.email : 'None'}
            </span></div>
            {debugInfo.firebaseUser && (
              <>
                <div>UID: {debugInfo.firebaseUser.uid.substring(0, 8)}...</div>
                <div>Name: {debugInfo.firebaseUser.displayName}</div>
              </>
            )}
          </div>
        </div>

        {/* Session State */}
        <div>
          <h4 className="font-semibold text-purple-600 mb-1">Session Storage:</h4>
          <div className="bg-white p-2 rounded">
            <div>Stored: <span className={debugInfo.sessionStorage ? 'text-green-600' : 'text-red-600'}>
              {debugInfo.sessionStorage ? 'Yes' : 'No'}
            </span></div>
            {debugInfo.sessionStorage && (
              <>
                <div>Valid: <span className={debugInfo.sessionValid ? 'text-green-600' : 'text-red-600'}>
                  {debugInfo.sessionValid ? 'Yes' : 'Expired'}
                </span></div>
                <div>Email: {debugInfo.sessionStorage.email}</div>
                <div>Days Left: {Math.round((debugInfo.sessionStorage.expiresAt - Date.now()) / (1000*60*60*24))}</div>
              </>
            )}
          </div>
        </div>

        {/* Actions */}
        <div>
          <h4 className="font-semibold text-red-600 mb-1">Actions:</h4>
          <div className="space-y-1">
            <button
              onClick={clearAllData}
              className="bg-red-500 text-white px-2 py-1 rounded text-xs w-full"
            >
              Clear All Data
            </button>
            <button
              onClick={forceLogout}
              className="bg-orange-500 text-white px-2 py-1 rounded text-xs w-full"
            >
              Force Logout
            </button>
            <button
              onClick={() => window.location.reload()}
              className="bg-gray-500 text-white px-2 py-1 rounded text-xs w-full"
            >
              Reload Page
            </button>
          </div>
        </div>
      </div>

      <div className="mt-2 text-gray-500">
        Last updated: {debugInfo.now}
      </div>
    </div>
  );
}