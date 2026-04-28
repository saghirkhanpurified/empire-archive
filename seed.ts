import { PrismaClient } from '@prisma/client'
const db = new PrismaClient()

async function main() {
  await db.article.upsert({
    where: { slug: 'cypherpunk-history' }, // 1. New Unique ID
    update: {},
    create: {
      slug: 'cypherpunk-history',        // 2. Match the ID here
      title: 'History of the Cypherpunks', // 3. Your Title
      // 4. Your Markdown Content
      content: `## The Origins of Privacy\n\nIn the late 1980s, a group of cryptographers realized that the internet would eventually threaten personal privacy.\n\n### Key Figures\n* Eric Hughes\n* Timothy C. May\n* John Gilmore\n\n> "Privacy is the power to selectively reveal oneself to the world."`,
    },
  })
  console.log("✅ New Intelligence injected perfectly.")
}

main().catch(e => console.error(e)).finally(async () => await db.$disconnect())