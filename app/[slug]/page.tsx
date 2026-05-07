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
    <main className="bg-white min-h-screen pt-24 pb-32">
      <article className="max-w-3xl mx-auto px-6">
        
        {/* Simple Back Button */}
        <div className="mb-12">
          <Link href="/#briefings" className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-2 inline-flex">
            <span>←</span> Back to Vault
          </Link>
        </div>

        {/* Clean Article Header (Title Only) */}
        <header className="mb-16 pb-8 border-b border-slate-100">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            {post.title}
          </h1>
        </header>

        {/* Article Content */}
        <div className="prose prose-lg prose-slate prose-headings:font-bold prose-headings:tracking-tight prose-a:text-indigo-600 hover:prose-a:text-indigo-500 max-w-none prose-blockquote:border-l-indigo-500 prose-blockquote:bg-slate-50 prose-blockquote:py-1 prose-blockquote:pr-4 prose-blockquote:not-italic prose-blockquote:text-slate-700">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>
        
      </article>
    </main>
  );
}