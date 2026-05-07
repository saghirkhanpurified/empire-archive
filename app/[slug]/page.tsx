import { notFound } from "next/navigation";
import prisma from "@/lib/db";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Make the page dynamic
export const dynamic = 'force-dynamic';

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  // Fetch the specific article from the database
  const post = await prisma.article.findUnique({
    where: { slug: params.slug },
  });

  if (!post) {
    notFound();
  }

  return (
    <main className="bg-white min-h-screen pt-24 pb-32">
      <article className="max-w-3xl mx-auto px-6">
        
        {/* Back Button & Category */}
        <div className="flex items-center justify-between mb-12">
          <Link href="/#briefings" className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-2">
            <span>←</span> Back to Vault
          </Link>
          <span className="inline-flex items-center rounded-full bg-slate-50 px-3 py-1 text-xs font-mono font-medium text-slate-500 ring-1 ring-inset ring-slate-200">
            INTELLIGENCE REPORT
          </span>
        </div>

        {/* Article Header */}
        <header className="mb-16 pb-8 border-b border-slate-100">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
              Verified Protocol
            </div>
            <span>//</span>
            <time>Target Audience: University Students</time>
          </div>
        </header>

        {/* Article Content (Prose) */}
        <div className="prose prose-lg prose-slate prose-headings:font-bold prose-headings:tracking-tight prose-a:text-indigo-600 hover:prose-a:text-indigo-500 max-w-none prose-blockquote:border-l-indigo-500 prose-blockquote:bg-slate-50 prose-blockquote:py-1 prose-blockquote:pr-4 prose-blockquote:not-italic prose-blockquote:text-slate-700">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>
        
      </article>
    </main>
  );
}