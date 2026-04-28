import Link from "next/link";
import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

// Modern Next.js: params is a Promise
export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  // Fetch the intelligence report from the database
  const post = await prisma.article.findUnique({
    where: { slug: slug }
  });

  // Trigger 404 if the slug doesn't exist in our DB
  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Top Navigation */}
      <nav className="p-6 border-b border-slate-100 bg-slate-50/50 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="text-indigo-600 font-bold hover:text-indigo-500 transition-colors">
            ← Back to Archive Hub
          </Link>
        </div>
      </nav>

      {/* Article Body */}
      <article className="max-w-3xl mx-auto py-16 px-6">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">
            {post.title}
          </h1>
          <div className="flex items-center text-slate-400 font-mono text-sm">
            <span>FILE ID: {post.slug}</span>
            <span className="mx-3">•</span>
            <span>STATUS: VERIFIED</span>
          </div>
        </header>

        {/* The Markdown Processor */}
        <div className="prose prose-lg prose-indigo max-w-none">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </article>

      {/* Footer Branding */}
      <footer className="max-w-3xl mx-auto py-12 border-t border-slate-100 text-center text-slate-400 text-sm font-mono">
        &copy; 2026 EMPIRE ARCHIVE // ALL RIGHTS RESERVED
      </footer>
    </main>
  );
}