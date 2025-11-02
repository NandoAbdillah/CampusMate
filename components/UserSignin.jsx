"use client";

import { useAuth } from "@/utils/AuthContext";
import React from "react";

const UserSignin = () => {
 
  const {user, loginWithGoogle, logout, authError, loading} = useAuth();

  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
     
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
        

          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">WeAreTIG2025</h1>
            <p className="text-gray-600">Masuk dengan akun UNESA Anda</p>
          </div>

          
          <div className="bg-blue-50/50 border border-blue-200/50 rounded-xl p-4 mb-6">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <svg className="w-5 h-5 text-blue-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-medium text-blue-800 mb-1">Khusus Kelas TI G 2025</h3>
                <p className="text-xs text-blue-600">Gunakan email student UNESA (@mhs.unesa.ac.id) untuk masuk ke aplikasi ini.</p>
              </div>
            </div>
          </div>

          {
            authError && (
              <div className="bg-red-50/50 border border-red-200/50 rounded-xl p-4 mb-6">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <svg className="w-5 h-5 text-red-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-red-800 mb-1">Terjadi Kesalahan !</h3>
                  <p className="text-xs text-red-600">{authError}</p>
                </div>
              </div>
            </div>
            )
          }

          {/* Google Login Button */}
          <button
            onClick={loginWithGoogle}
            disabled={loading}
            className="w-full bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 rounded-xl py-4 px-6 flex items-center justify-center space-x-3 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed group"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-300 border-t-blue-500"></div>
                <span className="text-gray-600 font-medium">Memverifikasi...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-gray-700 font-medium group-hover:text-gray-800">Masuk dengan Google</span>
              </>
            )}
          </button>

          {/* Email Format Info */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Email harus berformat: <span className="font-mono text-blue-600">nim@mhs.unesa.ac.id</span>
            </p>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-400">
              Universitas Negeri Surabaya - Teknik Informatika
            </p>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Butuh bantuan? 
            <a href="wa.me/+6282125469584" className="text-blue-600 hover:text-blue-700 font-medium ml-1">
              Hubungi Admin
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserSignin;