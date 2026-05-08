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
  description: "Advanced intelligence and systems for the modern operator.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-[#FCFCFC] text-slate-900 selection:bg-indigo-100 flex flex-col`}>
        
        <nav className="w-full border-b border-slate-200 bg-white sticky top-0 z-[100]">
          <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
            <Link href="/" className="group flex items-center gap-3">
              <div className="h-8 w-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-black text-xl transition-transform group-hover:rotate-12">
                V
              </div>
              <span className="font-black text-xl tracking-tighter uppercase">Intelligence Vault</span>
            </Link>
            
            <div className="flex items-center gap-8 text-[11px] font-bold tracking-[0.2em] text-slate-400 uppercase">
              <Link href="/" className="hover:text-indigo-600 transition-colors">Index</Link>
              <Link href="/about" className="hover:text-indigo-600 transition-colors">Manifesto</Link>
              <Link href="/about" className="bg-slate-900 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition-all text-center">
                Contact
              </Link>
            </div>
          </div>
        </nav>

        <div className="flex-grow">
          {children}
        </div>

        <footer className="w-full border-t border-slate-200 bg-white py-20">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="font-black text-2xl tracking-tighter">INTELLIGENCE VAULT</div>
            <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
              &copy; {new Date().getFullYear()} Peshawar Operational Hub
            </div>
            <div className="flex gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <Link href="#" className="hover:text-indigo-600">Twitter</Link>
              <Link href="#" className="hover:text-indigo-600">GitHub</Link>
            </div>
          </div>
        </footer>

        <Analytics />
      </body>
    </html>
  );
}