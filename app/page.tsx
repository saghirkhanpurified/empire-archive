import prisma from "@/lib/db";
import Link from "next/link";

export default async function Home() {
  const articles = await prisma.article.findMany();

  return (
    <main className="p-20 bg-slate-50 min-h-screen text-slate-900">
      <h1 className="text-5xl font-black mb-12 tracking-tight">The Empire Archive</h1>
      <div className="grid gap-8">
        {articles.map(post => (
          <Link key={post.id} href={`/${post.slug}`}>
            <div className="p-8 bg-white shadow-sm hover:shadow-xl rounded-2xl border border-slate-200 transition-all cursor-pointer group">
              <h2 className="text-3xl font-bold text-indigo-600 group-hover:text-indigo-500">{post.title}</h2>
              <p className="mt-2 text-slate-500 font-mono">ID: {post.slug} →</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}