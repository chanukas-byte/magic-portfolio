import { getPostsServer } from "@/app/utils/serverUtils";
import { Meta } from "@once-ui-system/core";
import { blog, baseURL } from "@/resources";
import { Posts } from "@/components/blog/Posts";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return Meta.generate({
    title: blog.title,
    description: blog.description,
    baseURL: baseURL,
    path: blog.path,
    image: `/api/og/generate?title=${encodeURIComponent(blog.title)}`,
  });
}

export default async function BlogPage() {
  const posts = getPostsServer(["src", "app", "blog", "posts"]);

  return <Posts posts={posts} />;
} 