import React, { useState, useEffect } from "react";
import Link from "next/link";
import ContainerBlock from "../../components/ContainerBlock";
import { getAllPostSlugs, getPostBySlug, Post } from "../../lib/posts";
import { event } from "../../utils/analytics";
import { Container, Action } from "../../components/primitives";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";

interface BlogPostPageProps {
    post: Post;
}

/**
 * The `prose` surface class. DESIGN.md §7 — Source Serif 4 at 68ch on
 * --surface, with the page chrome staying on --canvas.
 */
const BlogPostPage: NextPage<BlogPostPageProps> = ({ post }) => {
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        event("article_view", { title: post.title, slug: post.slug });
    }, [post.slug, post.title]);

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
                title: `${post.title} - Florian Wahl`,
                description: post.description || `${post.title} by Florian Wahl`,
                type: "article",
                image: post.coverImage || "/headshot.webp",
                date: post.date,
            }}
        >
            <article className="bg-surface">
                {/* The reading column is centred in the page rather than pinned to
                    the left gutter. Prose stays at 68ch for readability (§3.3);
                    only its position changes. */}
                <Container className="py-14 sm:py-20">
                    {/* font-prose so `ch` in max-w-prose resolves against the serif
                        the body is actually set in. */}
                    <div className="mx-auto max-w-prose font-prose">
                    <Link
                        href="/articles"
                        // min-h-[24px] meets the 24px target minimum (SC 2.5.8);
                        // the 11px label alone measured only 16px tall.
                        className="mb-12 inline-flex min-h-[24px] items-center text-label uppercase text-accent transition-colors duration-120 ease-system hover:text-accent-hover"
                    >
                        ← Articles
                    </Link>

                    <header className="mb-10">
                        {(formattedDate || post.readingTime) && (
                            <p className="mb-4 text-meta tabular-nums text-ink-muted">
                                {formattedDate}
                                {formattedDate && post.readingTime ? " · " : ""}
                                {post.readingTime ? `${post.readingTime} min read` : ""}
                            </p>
                        )}
                        <h1 className="font-display text-display-l font-bold text-ink">
                            {post.title}
                        </h1>
                        {post.description && (
                            <p className="mt-4 font-prose text-prose text-ink-muted">
                                {post.description}
                            </p>
                        )}
                    </header>

                    {post.coverImage && !imageError && (
                        <img
                            src={post.coverImage}
                            alt=""
                            className="mb-10 w-full rounded-lg border border-rule object-cover"
                            onError={() => setImageError(true)}
                        />
                    )}

                    <div className="post-body" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />

                    {/* CTA sits after the essay, never interrupting it. §2.4 / §11.1 */}
                    <div className="mt-16 border-t border-rule pt-8">
                        <Action
                            href="/advisory"
                            onClick={() => event("cta_click", { label: "article_footer_advisory" })}
                        >
                            Start a conversation
                        </Action>
                    </div>
                    </div>
                </Container>
            </article>
        </ContainerBlock>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const slugs = getAllPostSlugs();
    return { paths: slugs.map((slug) => ({ params: { slug } })), fallback: false };
};

export const getStaticProps: GetStaticProps<BlogPostPageProps> = async ({ params }) => {
    const slug = params?.slug as string;
    const post = getPostBySlug(slug);
    return { props: { post } };
};

export default BlogPostPage;
