import { NextResponse } from 'next/server';
import path from "path";
import matter from "gray-matter";
import fs from "fs";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'work'; // 'work' or 'blog'
    
    const pathSegments = type === 'blog' 
      ? ['src', 'app', 'blog', 'posts']
      : ['src', 'app', 'work', 'projects'];
    
    // Construct the path to the posts directory
    const postsDirectory = path.join(process.cwd(), ...pathSegments);
    
    // Check if directory exists
    if (!fs.existsSync(postsDirectory)) {
      console.warn(`Posts directory not found: ${postsDirectory}`);
      return NextResponse.json([]);
    }

    // Read all files in the directory
    const fileNames = fs.readdirSync(postsDirectory);
    const mdxFiles = fileNames.filter(fileName => fileName.endsWith('.mdx'));

    const posts = mdxFiles.map(fileName => {
      // Remove the ".mdx" extension from file name to get slug
      const slug = fileName.replace(/\.mdx$/, '');

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      return {
        slug,
        metadata: {
          title: matterResult.data.title || 'Untitled',
          summary: matterResult.data.summary || '',
          publishedAt: matterResult.data.publishedAt || new Date().toISOString(),
          tag: matterResult.data.tag || '',
          image: matterResult.data.image || '',
          images: matterResult.data.images || [],
          link: matterResult.data.link || '',
          team: matterResult.data.team || [],
        },
        content: matterResult.content,
      };
    });

    // Sort posts by published date (newest first)
    const sortedPosts = posts.sort((a, b) => {
      return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
    });

    return NextResponse.json(sortedPosts);
  } catch (error) {
    console.error('Error reading posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
} 