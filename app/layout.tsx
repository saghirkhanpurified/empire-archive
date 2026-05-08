import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: '%s | Intelligence Vault',
    default: 'The Intelligence Vault',
  },
  description: "Advanced intelligence for the modern operator.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-white text-slate-900 selection:bg-indigo-100 flex flex-col min-h-screen antialiased`}>
        
        <nav className="w-full border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-[100]">
          <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="h-7 w-7 bg-slate-900 text-white rounded-md flex items-center justify-center font-bold text-sm transition-transform group-hover:scale-110 shadow-sm">V</div>
              <span className="font-bold text-lg tracking-tight text-slate-900">Intelligence Vault</span>
            </Link>
            
            <div className="flex items-center gap-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <Link href="/#archive" className="hover:text-indigo-600 transition-colors">Archive</Link>
              <Link href="#" className="hover:text-indigo-600 transition-colors">Manifesto</Link>
            </div>
          </div>
        </nav>

        <div className="flex-grow">
          {children}
        </div>

        <footer className="w-full border-t border-slate-100 bg-slate-50 py-12 mt-20">
          <div className="max-w-4xl mx-auto px-6 text-center text-xs font-semibold text-slate-400 uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Peshawar Operational Hub
          </div>
        </footer>

        <Analytics />
      </body>
    </html>
  );
}