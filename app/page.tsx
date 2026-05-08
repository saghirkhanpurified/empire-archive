import Link from "next/link";
import prisma from "@/lib/db";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const posts = await prisma.article.findMany({
    orderBy: { id: 'desc' }
  });

  return (
    <main className="w-full">
      {/* CLEAN HERO SECTION */}
      <section className="max-w-3xl mx-auto px-6 pt-24 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-[10px] font-mono font-bold tracking-widest uppercase text-slate-500 mb-6 border border-slate-200">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          System Online
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 mb-6 leading-tight">
          We don't provide news.<br/> 
          We provide <span className="text-indigo-600">leverage.</span>
        </h1>
        
        <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
          A specialized database of AI prompts, Web3 protocols, and digital systems. We build the architecture that helps you navigate the 2026 digital landscape.
        </p>
      </section>

      {/* SHARP ARCHIVE FEED */}
      <section id="archive" className="max-w-3xl mx-auto px-6 pb-32">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900">The Archive</h2>
          <div className="text-xs font-mono text-slate-400">Total Entries: {posts.length}</div>
        </div>

        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <Link key={post.id} href={`/${post.slug}`} className="group block">
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-md hover:border-indigo-300 flex items-center justify-between gap-6">
                <div>
                  <div className="text-xs font-mono text-slate-400 mb-2">REPORT #{post.id.toString().padStart(3, '0')}</div>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                    {post.title}
                  </h3>
                </div>
                
                <div className="h-10 w-10 shrink-0 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-indigo-50 group-hover:border-indigo-200 transition-all">
                  <span className="text-slate-400 group-hover:text-indigo-600 font-bold transition-colors">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}