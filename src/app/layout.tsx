import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";
import { SearchProvider } from "./context/SearchContext"; // ✅ import this


export const metadata: Metadata = {
  title: "Versify",
  description: "A blogging and social platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <SearchProvider> {/* ✅ Wrap with SearchProvider */}


        {children}
                  </SearchProvider>

        </AuthProvider>

      </body>
    </html>
  );
}
