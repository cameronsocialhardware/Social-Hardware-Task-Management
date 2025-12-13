import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const manrope = Manrope({ 
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Task Management",
  description: "Futuristic Task Management Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable}`}>
      <body className="antialiased bg-[#050505]">
        <div className="fixed inset-0 z-[-1]">
           <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-orange-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow" />
           <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-amber-900/20 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow delay-1000" />
        </div>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
