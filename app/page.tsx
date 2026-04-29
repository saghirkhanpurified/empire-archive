import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ["latin"] });

// GLOBAL SEO BASE
export const metadata: Metadata = {
  title: {
    template: '%s | Empire Archive',
    default: 'The Empire Archive | Tech, Security & Philosophy',
  },
  description: "A sovereign database of strategic research, cybersecurity history, and technological philosophy.",
  openGraph: {
    title: 'The Empire Archive',
    description: 'A sovereign database of strategic research.',
    siteName: 'Empire Archive',
    type: 'website',
  },
  verification: {
    google: 'Numt_xZgHuBPBALKfYw7inpQIHZk7DvRDR4fMW0qLko',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen bg-white text-slate-900 selection:bg-indigo-100 flex flex-col`}>
        
        {/* GLOBAL GLASS NAVIGATION */}
        <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-lg">
          <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/" className="font-extrabold text-xl tracking-tighter text-slate-900 hover:text-indigo-600 transition-colors">
              Empire<span className="text-indigo-600">Archive</span>
            </Link>
            
            {/* PROFESSIONAL NAVIGATION LINKS */}
            <div className="flex items-center gap-6 text-sm font-semibold text-slate-600">
              <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
              <Link href="/about" className="hover:text-indigo-600 transition-colors">About</Link>
            </div>
          </div>
        </nav>

        {/* MAIN CONTENT AREA */}
        <div className="flex-grow">
          {children}
        </div>

        {/* GLOBAL FOOTER */}
        <footer className="w-full border-t border-slate-200 bg-white py-12 mt-24">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <p className="text-sm font-mono text-slate-400">
              &copy; {new Date().getFullYear()} EMPIRE ARCHIVE // SOVEREIGN INTELLIGENCE
            </p>
          </div>
        </footer>

        {/* VERCEL RADAR TRACKING */}
        <Analytics />
      </body>
    </html>
  );
}