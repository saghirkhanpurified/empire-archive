import Link from "next/link";
import prisma from "@/lib/db";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const posts = await prisma.article.findMany({
    orderBy: { id: 'desc' }
  });
  
  const featuredPost = posts[0];
  const secondaryPosts = posts.slice(1);

  return (
    <main className="w-full bg-[#FCFCFC] min-h-screen">
      {/* 1. THE STATUS BAR (Visual Authority) */}
      <div className="w-full border-b border-slate-200 bg-white py-3">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              System Live
            </span>
            <span>//</span>
            <span>Location: Peshawar, PK</span>
          </div>
          <div>Last Update: {new Date().toLocaleDateString()}</div>
        </div>
      </div>

      {/* 2. THE LEAD REPORT (High-Impact Entry) */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-24">
        <Link href={`/${featuredPost?.slug}`} className="group block">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8">
              <span className="inline-block mb-6 text-xs font-bold tracking-widest text-indigo-600 uppercase border-b-2 border-indigo-600 pb-1">
                Featured Intelligence
              </span>
              <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 leading-[1.1] mb-8 group-hover:text-indigo-600 transition-colors">
                {featuredPost?.title || "Initializing Vault..."}
              </h1>
              <p className="text-xl text-slate-500 leading-relaxed max-w-2xl">
                A deep-dive analysis into the shifting paradigms of 2026. This report deconstructs the intersection of technical architecture and human survival.
              </p>
            </div>
            <div className="lg:col-span-4 lg:pt-20">
              <div className="p-8 bg-slate-900 rounded-2xl text-white shadow-2xl transform transition-transform group-hover:-translate-y-2">
                <div className="text-xs font-mono text-slate-400 mb-4 tracking-widest uppercase">Abstract</div>
                <p className="text-sm leading-relaxed text-slate-300">
                  Accessing the core protocols of the Intelligence Vault. This document contains high-signal data designed for the modern operator.
                </p>
                <div className="mt-8 flex items-center font-bold text-sm text-indigo-400">
                  Open File <span className="ml-2">→</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </section>

      {/* 3. THE MASTER INDEX (The Vertical Archive) */}
      <section id="archive" className="w-full bg-white border-t border-slate-200 pt-24 pb-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-4xl font-black tracking-tighter text-slate-900 mb-2">The Archive</h2>
              <p className="text-slate-500 font-medium">Classified reports on AI, Linguistics, and Systems.</p>
            </div>
            <div className="h-px flex-grow bg-slate-100 mx-8 hidden md:block"></div>
            <div className="text-xs font-mono text-slate-400 font-bold uppercase tracking-widest">
              Total Entries: {posts.length}
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {secondaryPosts.map((post) => (
              <Link key={post.id} href={`/${post.slug}`} className="group block py-10 transition-all hover:px-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex-grow max-w-3xl">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                        Report #{post.id.toString().padStart(3, '0')}
                      </span>
                      <span className="h-1 w-1 rounded-full bg-slate-200"></span>
                      <span className="text-[10px] font-mono font-bold text-indigo-500 uppercase tracking-widest">
                        Verified Access
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {post.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden md:block">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Status</div>
                      <div className="text-xs font-bold text-slate-900">DECRYPTED</div>
                    </div>
                    <div className="h-12 w-12 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-indigo-600 group-hover:bg-indigo-50 transition-all">
                      <span className="text-indigo-600 font-bold">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. THE SYSTEM PHILOSOPHY (Scrolling Context) */}
      <section className="py-32 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none overflow-hidden text-[15vw] font-black leading-none select-none tracking-tighter break-all">
          INTELLIGENCEVAULTINTELLIGENCEVAULT
        </div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-tight">
            We don't provide news.<br/> We provide <span className="text-indigo-400 font-serif italic">leverage</span>.
          </h2>
          <p className="text-xl text-slate-400 leading-relaxed mb-12 max-w-2xl mx-auto font-medium">
            The Intelligence Vault is a specialized database for students at the Institute of Management Sciences and beyond. We build the systems that help you navigate the 2026 digital landscape.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-white/10">
            <div>
              <div className="text-2xl font-bold text-white mb-1">AI</div>
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Mastery</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white mb-1">Web3</div>
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Protocol</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white mb-1">Notion</div>
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Systems</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white mb-1">Linguistics</div>
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Control</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}