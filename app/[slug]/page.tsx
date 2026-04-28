import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Metadata } from "next";

export const dynamic = 'force-dynamic';

// 1. DYNAMIC SEO BEACON: This tells Google exactly what this page is about.
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await prisma.article.findUnique({ where: { slug: resolvedParams.slug } });
  
  if (!post) return { title: 'Not Found' };
  
  return {
    title: post.title,
    description: `Read the full intelligence report on ${post.title}.`,
    openGraph: {
      title: post.title,
      type: 'article',
    }
  }
}

// 2. THE PAGE UI
export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = await prisma.article.findUnique({
    where: { slug: resolvedParams.slug }
  });

  if (!post) notFound();

  return (
    <main className="max-w-3xl mx-auto px-6 py-16 md:py-24">
      {/* Breadcrumbs for SEO */}
      <nav className="mb-8 text-sm font-mono text-slate-400 flex items-center gap-2">
        <a href="/" className="hover:text-indigo-600 transition-colors">Home</a>
        <span>/</span>
        <span className="text-slate-600 truncate">{post.slug}</span>
      </nav>

      <article>
        <header className="mb-12 border-b border-slate-200 pb-8">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center text-slate-500 text-sm">
            <span className="bg-slate-100 px-3 py-1 rounded-full font-mono text-xs text-slate-600 border border-slate-200">
              STATUS: DECLASSIFIED
            </span>
          </div>
        </header>

        {/* The Content Matrix */}
        <div className="prose prose-lg prose-slate prose-headings:font-bold prose-headings:tracking-tight prose-a:text-indigo-600 hover:prose-a:text-indigo-500 max-w-none">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </article>
    </main>
  );
}