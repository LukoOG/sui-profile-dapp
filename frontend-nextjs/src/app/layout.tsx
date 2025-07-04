import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import '@mysten/dapp-kit/dist/index.css';

import Header from "@/app/components/header";
import Footer from "./components/footer";

import SuiLayoutProvider from "./layout/SuiLayoutProvider";
import ToastProvider from "./components/ui/use-toast";

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
            <ToastProvider>
              <Header />
              <main className="main-container">{children}</main>
              <Footer />
            </ToastProvider>            
          </SuiLayoutProvider>
      </body>
    </html>
  );
}
