import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";
import { ContextProvider } from "@/utils/ContextProvider";
import { AuthProvider } from "@/utils/AuthContext";
import { DarkModeProvider } from "@/utils/DarkModeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const bricolageGrosteque = Bricolage_Grotesque({
  variable: "--font-bricolage-grotesque",
  subsets: ["latin"],
});

export const metadata = {
  title: "CampusMate",
  description: "CampusMate -  Management System for Colleges",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body className={`${bricolageGrosteque.variable} antialiased`}>
        <AuthProvider>
          <ContextProvider>
            <DarkModeProvider>{children}</DarkModeProvider>
          </ContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
