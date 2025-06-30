import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import '@mysten/dapp-kit/dist/index.css';

import Header from "@/app/components/header";
// import Footer from "@/app/components/footer";

import SuiLayoutProvider from "./layout/SuiLayoutProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <SuiLayoutProvider>
            <Header />
            <main className="main-container">{children}</main>
          </SuiLayoutProvider>
      </body>
    </html>
  );
}
