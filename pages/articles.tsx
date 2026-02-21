import React from "react";
import Link from "next/link";
import ContainerBlock from "../components/ContainerBlock";
import userData from "../constants/data";
import { getAllPostsMeta, PostMeta } from "../lib/posts";
import { event } from "../utils/analytics";
import type { GetStaticProps, NextPage } from "next";

interface FeedItem {
    title: string;
    date: string;
    description: string;
    imgUrl: string;
    // external articles have a link; hosted posts have a slug
    link?: string;
    slug?: string;
}

interface ArticlesPageProps {
    feedItems: FeedItem[];
}

const ArticleCard: React.FC<{ item: FeedItem }> = ({ item }) => {
    const isHosted = !!item.slug;
    const href = isHosted ? `/articles/${item.slug}` : item.link!;

    const inner = (
        <div className="w-full h-full pixel-card bg-gray-900 overflow-hidden group flex flex-col">
            {item.imgUrl && (
                <div className="h-52 relative overflow-hidden flex-shrink-0">
                    <img
                        src={item.imgUrl}
                        alt={`${item.title} thumbnail`}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    />
                </div>
            )}
            <div className="p-6 flex flex-col flex-1">
                {item.date && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-mono mb-2">
                        {new Date(item.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            timeZone: "UTC",
                        })}
                    </p>
                )}
                <h2 className="text-black dark:text-white font-bold text-lg font-mono group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                    {item.title.toUpperCase()}
                </h2>
                {item.description && (
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 font-mono line-clamp-2">
                        {item.description}
                    </p>
                )}
                <div className="mt-auto pt-4 flex items-center text-yellow-600 dark:text-yellow-400 text-sm font-mono">
                    READ {isHosted ? "POST" : "ARTICLE"} →
                </div>
            </div>
        </div>
    );

    if (isHosted) {
        return (
            <Link
                href={href}
                className="w-full block"
                onClick={() => event("article_click", { title: item.title, category: "blog", label: item.title })}
            >
                {inner}
            </Link>
        );
    }

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full block"
            onClick={() => event("article_click", { title: item.title, category: "articles", label: item.title })}
        >
            {inner}
        </a>
    );
};

const ArticlesPage: NextPage<ArticlesPageProps> = ({ feedItems }) => {
    return (
        <ContainerBlock
            customMeta={{
                title: "Articles by Florian Wahl - Insights on Product Strategy & Fintech",
                description:
                    "Read Florian Wahl's articles and blog posts on product strategy, fintech innovation, digital transformation, and open finance.",
                type: "blog",
            }}
        >
            <section className="bg-white dark:bg-[#0a0a0a] py-20 transition-colors duration-300">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="mb-16">
                        <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-black dark:text-white mb-4 pixel-text">
                            ARTICLES
                        </h1>
                        <p className="text-xl text-gray-700 dark:text-gray-300 font-mono">
                            Writing &amp; Thought Leadership
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
                        {feedItems.map((item, idx) => (
                            <ArticleCard key={item.slug ?? item.link ?? idx} item={item} />
                        ))}
                    </div>
                </div>
            </section>
        </ContainerBlock>
    );
};

export const getStaticProps: GetStaticProps<ArticlesPageProps> = async () => {
    const posts = getAllPostsMeta();

    const postItems: FeedItem[] = posts.map((p: PostMeta) => ({
        title: p.title,
        date: p.date,
        description: p.description,
        imgUrl: p.coverImage,
        slug: p.slug,
    }));

    const externalItems: FeedItem[] = userData.articles.map((a) => ({
        title: a.title,
        date: a.date ?? "",
        description: "",
        imgUrl: a.imgUrl,
        link: a.link,
    }));

    const feedItems = [...postItems, ...externalItems].sort((a, b) => {
        if (!a.date) return 1;
        if (!b.date) return -1;
        return a.date < b.date ? 1 : -1;
    });

    return { props: { feedItems } };
};

export default ArticlesPage;
