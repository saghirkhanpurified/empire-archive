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
    <main className="w-full pt-20 pb-32 bg-white min-h-screen">
      <article className="max-w-3xl mx-auto px-6">
        
        <div className="mb-12">
          <Link href="/#archive" className="text-xs font-mono font-bold tracking-widest text-slate-400 hover:text-indigo-600 transition-colors flex items-center gap-2 inline-flex uppercase">
            <span>←</span> Return to Archive
          </Link>
        </div>

        <header className="mb-16 pb-8 border-b border-slate-100">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.15]">
            {post.title}
          </h1>
        </header>

        <div className="prose prose-lg prose-slate max-w-none 
          prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-slate-900
          prose-a:text-indigo-600 hover:prose-a:text-indigo-500 
          prose-blockquote:border-l-indigo-500 prose-blockquote:bg-slate-50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:not-italic prose-blockquote:text-slate-700 prose-blockquote:rounded-r-lg
          prose-strong:text-slate-900 prose-code:text-indigo-600 prose-code:bg-indigo-50 prose-code:px-1 prose-code:rounded">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>
        
      </article>
    </main>
  );
}