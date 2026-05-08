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
    <html lang="en" className="scroll-smooth bg-[#09090b]">
      <body className={`${inter.className} bg-[#09090b] text-zinc-100 selection:bg-indigo-500/30 flex flex-col min-h-screen`}>
        
        {/* DARK GLASS NAVIGATION */}
        <nav className="w-full border-b border-white/10 bg-[#09090b]/80 backdrop-blur-xl sticky top-0 z-[100] transition-all duration-300">
          <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
            <Link href="/" className="group flex items-center gap-3">
              <div className="h-8 w-8 bg-white rounded-lg flex items-center justify-center text-[#09090b] font-black text-xl transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110 shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                V
              </div>
              <span className="font-black text-xl tracking-tighter uppercase text-white group-hover:text-indigo-400 transition-colors duration-300">Intelligence Vault</span>
            </Link>
            
            <div className="flex items-center gap-8 text-[11px] font-bold tracking-[0.2em] text-zinc-400 uppercase">
              <Link href="/#archive" className="hover:text-white transition-colors duration-300">Archive</Link>
              <Link href="#" className="hover:text-white transition-colors duration-300">Manifesto</Link>
              <Link href="#" className="bg-white text-[#09090b] px-5 py-2.5 rounded-md hover:bg-indigo-500 hover:text-white hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all duration-300 text-center">
                Contact
              </Link>
            </div>
          </div>
        </nav>

        <div className="flex-grow">
          {children}
        </div>

        {/* DARK FOOTER */}
        <footer className="w-full border-t border-white/10 bg-[#09090b] py-20 mt-32">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="font-black text-2xl tracking-tighter text-white opacity-50">INTELLIGENCE VAULT</div>
            <div className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
              &copy; {new Date().getFullYear()} Peshawar Operational Hub
            </div>
          </div>
        </footer>

        <Analytics />
      </body>
    </html>
  );
}