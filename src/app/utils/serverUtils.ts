import path from "path";
import matter from "gray-matter";
import fs from "fs";

export const getPostsServer = (pathSegments: string[]) => {
  try {
    // Construct the path to the posts directory
    const postsDirectory = path.join(process.cwd(), ...pathSegments);
    
    // Check if directory exists
    if (!fs.existsSync(postsDirectory)) {
      console.warn(`Posts directory not found: ${postsDirectory}`);
      return [];
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
    return posts.sort((a, b) => {
      return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
    });
  } catch (error) {
    console.error('Error reading posts:', error);
    return [];
  }
}; 