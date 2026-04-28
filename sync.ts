import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const db = new PrismaClient();
const contentDir = path.join(process.cwd(), 'content');

async function syncContent() {
  console.log("Initiating local-to-cloud payload sync...");
  
  // 1. Check if the content folder exists
  if (!fs.existsSync(contentDir)) {
    console.error("❌ No 'content' folder found.");
    return;
  }

  // 2. Read all files in the folder
  const files = fs.readdirSync(contentDir);
  const mdFiles = files.filter(file => file.endsWith('.md'));

  if (mdFiles.length === 0) {
    console.log("⚠️ No markdown files found in the vault.");
    return;
  }

  console.log(`Found ${mdFiles.length} intelligence reports. Injecting into database...`);

  // 3. Process each file
  for (const file of mdFiles) {
    const filePath = path.join(contentDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Parse the frontmatter and the body content
    const { data, content } = matter(fileContent);
    
    // The URL slug is just the filename without '.md'
    const slug = file.replace('.md', '');
    // Fallback to "Untitled" if you forget to add a title in the frontmatter
    const title = data.title || "Untitled Intelligence Report"; 

    console.log(`-> Syncing: ${title}`);

    // Push to Supabase Cloud Database (Upsert means Update if it exists, Create if it doesn't)
    await db.article.upsert({
      where: { slug: slug },
      update: {
        title: title,
        content: content.trim(),
      },
      create: {
        slug: slug,
        title: title,
        content: content.trim(),
      },
    });
  }

  console.log("✅ All intelligence reports synced to the live cloud matrix successfully.");
}

syncContent()
  .catch(e => console.error(e))
  .finally(async () => await db.$disconnect());