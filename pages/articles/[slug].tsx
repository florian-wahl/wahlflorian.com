import React from "react";
import Link from "next/link";
import ContainerBlock from "../../components/ContainerBlock";
import { getAllPostSlugs, getPostBySlug, Post } from "../../lib/posts";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";

interface BlogPostPageProps {
    post: Post;
}

const BlogPostPage: NextPage<BlogPostPageProps> = ({ post }) => {
    const formattedDate = post.date
        ? new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              timeZone: "UTC",
          })
        : null;

    return (
        <ContainerBlock
            customMeta={{
                title: `${post.title} — Florian Wahl`,
                description: post.description || `${post.title} by Florian Wahl`,
                type: "article",
            }}
        >
            <article className="bg-white dark:bg-[#0a0a0a] py-20 transition-colors duration-300">
                <div className="max-w-3xl mx-auto px-4">
                    {/* Back link */}
                    <Link
                        href="/articles"
                        className="inline-flex items-center font-mono text-sm text-yellow-600 dark:text-yellow-400 hover:underline mb-12 block"
                    >
                        ← ARTICLES
                    </Link>

                    {/* Header */}
                    <header className="mb-12">
                        {formattedDate && (
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-mono mb-4">
                                {formattedDate}
                            </p>
                        )}
                        <h1 className="text-3xl md:text-5xl font-bold text-black dark:text-white font-mono pixel-text mb-6 leading-tight">
                            {post.title.toUpperCase()}
                        </h1>
                        {post.description && (
                            <p className="text-lg text-gray-600 dark:text-gray-400 font-mono border-l-4 border-yellow-500 pl-4">
                                {post.description}
                            </p>
                        )}
                    </header>

                    {/* Cover image */}
                    {post.coverImage && (
                        <div className="mb-12 pixel-card overflow-hidden">
                            <img
                                src={post.coverImage}
                                alt={post.title}
                                className="w-full object-cover"
                            />
                        </div>
                    )}

                    {/* Divider */}
                    <div className="border-t-4 border-black dark:border-white mb-12" />

                    {/* Post body */}
                    <div
                        className="post-body"
                        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
                    />

                    {/* Footer */}
                    <div className="mt-16 pt-8 border-t-4 border-black dark:border-white">
                        <Link
                            href="/articles"
                            className="inline-flex items-center font-mono text-sm text-yellow-600 dark:text-yellow-400 hover:underline"
                        >
                            ← BACK TO ARTICLES
                        </Link>
                    </div>
                </div>
            </article>
        </ContainerBlock>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const slugs = getAllPostSlugs();
    return {
        paths: slugs.map((slug) => ({ params: { slug } })),
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps<BlogPostPageProps> = async ({ params }) => {
    const slug = params?.slug as string;
    const post = getPostBySlug(slug);
    return { props: { post } };
};

export default BlogPostPage;
