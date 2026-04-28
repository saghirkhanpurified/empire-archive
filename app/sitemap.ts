import { MetadataRoute } from 'next'
import prisma from '@/lib/db'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch all articles
  const posts = await prisma.article.findMany();

  // Create an array of URLs for Google
  const postUrls = posts.map((post) => ({
    url: `https://the-intelligence-vault.vercel.app/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: 'https://the-intelligence-vault.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...postUrls,
  ]
}