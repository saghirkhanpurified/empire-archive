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
    <main className="w-full">
      
      {/* 1. THE NEW HERO (Your favorite part, moved to the front) */}
      <section className="relative pt-32 pb-40 overflow-hidden border-b border-white/10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono font-bold tracking-widest uppercase text-indigo-400 mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
            System Online // Peshawar
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-[1.1] text-white">
            We don't provide news.<br/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 italic pr-4">
              We provide leverage.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-400 leading-relaxed mb-16 max-w-2xl mx-auto font-medium">
            A specialized database of AI prompts, Web3 protocols, and digital systems. We build the architecture that helps you navigate the 2026 digital landscape.
          </p>
        </div>
      </section>

      {/* 2. THE LEAD REPORT */}
      <section className="max-w-6xl mx-auto px-6 -mt-16 relative z-20">
        <Link href={`/${featuredPost?.slug}`} className="group block">
          <div className="bg-[#121214] border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl transition-all duration-500 hover:border-indigo-500/50 hover:shadow-[0_0_40px_rgba(99,102,241,0.15)] hover:-translate-y-2">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[10px] font-black tracking-widest text-indigo-400 uppercase border-b-2 border-indigo-400/50 pb-1">
                Latest Decryption
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-[1.1] mb-6 group-hover:text-indigo-300 transition-colors duration-300">
              {featuredPost?.title || "Initializing Vault..."}
            </h2>
            <div className="flex items-center font-bold text-sm text-indigo-400 group-hover:translate-x-2 transition-transform duration-300">
              Access Intelligence Report <span className="ml-2">→</span>
            </div>
          </div>
        </Link>
      </section>

      {/* 3. THE DARK ARCHIVE */}
      <section id="archive" className="w-full pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between mb-16 pb-6 border-b border-white/10">
            <h2 className="text-3xl font-black tracking-tighter text-white">The Archive</h2>
            <div className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-widest">
              Entries: {posts.length}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {secondaryPosts.map((post) => (
              <Link key={post.id} href={`/${post.slug}`} className="group block">
                <div className="p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/5 transition-all duration-500 hover:bg-white/[0.04] hover:border-indigo-500/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
                        Report #{post.id.toString().padStart(3, '0')}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-zinc-200 group-hover:text-white transition-colors duration-300">
                      {post.title}
                    </h3>
                  </div>
                  
                  <div className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-indigo-500 group-hover:bg-indigo-500/10 transition-all duration-300 shadow-[0_0_0_rgba(99,102,241,0)] group-hover:shadow-[0_0_15px_rgba(99,102,241,0.4)]">
                    <span className="text-zinc-500 group-hover:text-indigo-400 font-bold transition-colors">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}