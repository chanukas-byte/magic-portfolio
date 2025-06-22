"use client";

import { Column, Heading, Text } from "@once-ui-system/core";
import styles from "./Posts.module.scss";

type Post = {
    slug: string;
    metadata: {
        title: string;
        summary: string;
        publishedAt: string;
    };
};

type PostsProps = {
    posts: Post[];
};

export function Posts({ posts }: PostsProps) {
    return (
        <Column as="section" gap="l" className={styles.posts}>
            <Heading>Blog Posts</Heading>
            {posts.length > 0 ? (
                posts.map((post) => (
                    <div key={post.slug}>
                        <Heading as="h2">{post.metadata.title}</Heading>
                        <Text>{post.metadata.summary}</Text>
                        <Text>
                            <small>{new Date(post.metadata.publishedAt).toLocaleDateString()}</small>
                        </Text>
                    </div>
                ))
            ) : (
                <Text>No blog posts yet. Check back soon!</Text>
            )}
        </Column>
    );
}