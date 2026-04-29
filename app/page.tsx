import Link from "next/link";
import prisma from "@/lib/db";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const posts = await prisma.article.findMany();
  
  // Grab the first post to use as the Featured Article
  const featuredPost = posts.length > 0 ? posts[0] : null;

  return (
    <main className="w-full">
      {/* 2-Column Responsive Hero Section */}
      <header className="max-w-5xl mx-auto px-6 py-16 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Typography */}
          <div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-slate-900 leading-tight">
              The Intelligence <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">
                Vault.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 leading-relaxed mb-8">
              Uncovering untouched digital strategies, deep-web history, and sovereign tech paradigms.
            </p>
            <a href="#briefings" className="inline-flex items-center justify-center bg-slate-900 text-white px-6 py-3 rounded-full font-medium hover:bg-indigo-600 transition-all duration-300 shadow-md hover:shadow-lg">
              Browse the Archive
            </a>
          </div>

          {/* Right Column: Dynamic Featured Article */}
          <div className="relative w-full lg:h-[350px] rounded-3xl bg-gradient-to-br from-indigo-50 to-cyan-50 border border-slate-200/60 p-6 sm:p-8 overflow-hidden shadow-inner flex flex-col justify-end group">
            {/* Abstract Background Blur */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl transition-transform duration-700 group-hover:scale-110"></div>
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl"></div>

            {featuredPost ? (
              <Link href={`/${featuredPost.slug}`} className="relative z-10 block bg-white/80 backdrop-blur-md border border-slate-200/50 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-indigo-300 transition-all duration-300 transform group-hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center rounded-full bg-indigo-600 px-2.5 py-0.5 text-xs font-bold text-white shadow-sm">
                    Featured Briefing
                  </span>
                  <span className="text-xs font-mono text-slate-500 truncate">LATEST</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                  {featuredPost.title}
                </h3>
                <div className="mt-4 flex items-center text-sm font-bold text-indigo-600">
                  Read Full Report <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">→</span>
                </div>
              </Link>
            ) : (
               <div className="relative z-10 block bg-white/80 backdrop-blur-md border border-slate-200/50 rounded-2xl p-6 shadow-sm">
                 <p className="text-slate-500 font-medium">Awaiting first intelligence report...</p>
               </div>
            )}
          </div>

        </div>
      </header>

      {/* Grid Section */}
      <section id="briefings" className="max-w-5xl mx-auto px-6 pb-24 scroll-mt-24">
        <div className="flex items-center justify-between mb-8 border-b border-slate-200 pb-4">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Latest Briefings</h2>
          <div className="text-sm font-mono text-slate-400 hidden sm:block">Total Indexed: {posts.length}</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <Link key={post.id} href={`/${post.slug}`} className="group block h-full">
              <article className="h-full p-8 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all duration-300 relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                      Intelligence
                    </span>
                    <span className="text-xs font-mono text-slate-400 truncate">FILE: {post.slug}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                    {post.title}
                  </h3>
                </div>
                
                <div className="mt-8 flex items-center text-sm font-semibold text-indigo-600 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
                  Read Report <span className="ml-1">→</span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}