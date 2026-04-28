import Link from "next/link";
import prisma from "@/lib/db";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const posts = await prisma.article.findMany();

  return (
    <main className="w-full">
      {/* Hero Section */}
      <header className="max-w-5xl mx-auto px-6 py-24 md:py-32">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-slate-900 leading-tight">
          The Intelligence <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">
            Vault.
          </span>
        </h1>
        <p className="text-lg md:text-xl text-slate-500 max-w-2xl leading-relaxed">
          Uncovering untouched digital strategies, deep-web history, and sovereign tech paradigms.
        </p>
      </header>

      {/* Grid Section */}
      <section className="max-w-5xl mx-auto px-6 pb-12">
        <div className="flex items-center justify-between mb-8 border-b border-slate-200 pb-4">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Latest Briefings</h2>
          <div className="text-sm font-mono text-slate-400 hidden sm:block">Records: {posts.length}</div>
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