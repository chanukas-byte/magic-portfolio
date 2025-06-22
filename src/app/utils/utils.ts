import path from "path";
import matter from "gray-matter";

export const getPosts = async (pathSegments: string[]) => {
  try {
    // Determine the type based on path segments
    const type = pathSegments.includes('blog') ? 'blog' : 'work';
    
    // Use the API route to fetch posts
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/posts?type=${type}`, {
      cache: 'no-store' // Disable caching to always get fresh data
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.statusText}`);
    }
    
    const posts = await response.json();
    return posts;
  } catch (error) {
    console.error('Error reading posts:', error);
    return [];
  }
};
