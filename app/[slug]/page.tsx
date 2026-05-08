import { notFound } from "next/navigation";
import prisma from "@/lib/db";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const dynamic = 'force-dynamic';

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;

  const post = await prisma.article.findUnique({
    where: { slug: resolvedParams.slug },
  });

  if (!post) {
    notFound();
  }

  return (
    <main className="w-full pt-24 pb-32">
      <article className="max-w-3xl mx-auto px-6 relative">
        
        {/* Subtle background glow for the reading page */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-indigo-900/10 blur-[100px] pointer-events-none -z-10"></div>

        <div className="mb-16">
          <Link href="/#archive" className="text-xs font-mono font-bold tracking-widest text-zinc-500 hover:text-indigo-400 transition-colors flex items-center gap-2 inline-flex uppercase">
            <span>←</span> Return to Archive
          </Link>
        </div>

        <header className="mb-16 pb-12 border-b border-white/10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.15]">
            {post.title}
          </h1>
        </header>

        {/* PROSE-INVERT is the magic word that makes markdown look good on dark backgrounds */}
        <div className="prose prose-lg prose-invert prose-zinc max-w-none 
          prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-white
          prose-a:text-indigo-400 hover:prose-a:text-indigo-300 
          prose-blockquote:border-l-indigo-500 prose-blockquote:bg-white/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:not-italic prose-blockquote:text-zinc-300 prose-blockquote:rounded-r-lg
          prose-strong:text-white prose-code:text-indigo-300 prose-code:bg-indigo-500/10 prose-code:px-1 prose-code:rounded">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>
        
      </article>
    </main>
  );
}