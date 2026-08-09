import React from "react";
import Link from "next/link";
import ContainerBlock from "../components/ContainerBlock";
import userData from "../constants/data";
import { getAllPostsMeta, PostMeta } from "../lib/posts";
import { event } from "../utils/analytics";
import { Section, SectionHeader } from "../components/primitives";
import { ExternalIcon } from "../components/Icons";
import type { GetStaticProps, NextPage } from "next";

interface FeedItem {
    title: string;
    date: string;
    description: string;
    readingTime?: number;
    link?: string;
    slug?: string;
}

interface ArticlesPageProps {
    feedItems: FeedItem[];
}

/** "2024-11-21" -> "2024.11" — tabular, aligns down the column. */
const formatDate = (date: string): string => {
    if (!date) return "";
    const [year, month] = date.split("-");
    return month ? `${year}.${month.padStart(2, "0")}` : year;
};

const ArticleRow: React.FC<{ item: FeedItem }> = ({ item }) => {
    const isHosted = Boolean(item.slug);
    const href = isHosted ? `/articles/${item.slug}` : item.link!;

    // Descriptions are omitted: only hosted posts carry one, so showing them
    // made the list alternate between two row heights for no reason the reader
    // can see. Type + reading time are available for every item.
    const body = (
        <div className="flex flex-col gap-1 border-b border-rule py-4 sm:flex-row sm:items-baseline sm:gap-8">
            <p className="shrink-0 text-meta tabular-nums text-ink-muted sm:w-[5.5rem]">
                {formatDate(item.date)}
            </p>
            <h2 className="min-w-0 flex-1 text-body font-medium text-ink">
                {item.title}
                {!isHosted && (
                    <ExternalIcon
                        size={12}
                        className="ml-1.5 inline-block align-baseline text-ink-muted"
                    />
                )}
            </h2>
            <p className="shrink-0 text-meta text-ink-muted sm:text-right">
                {isHosted ? "Essay" : "Article"}
                {item.readingTime ? ` · ${item.readingTime} min` : ""}
            </p>
        </div>
    );

    const cls = "block transition-colors duration-120 ease-system hover:text-accent";
    const track = () =>
        event("article_click", {
            title: item.title,
            category: isHosted ? "blog" : "articles",
            label: item.title,
        });

    return isHosted ? (
        <Link href={href} className={cls} onClick={track}>
            {body}
        </Link>
    ) : (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls} onClick={track}>
            {body}
        </a>
    );
};

const ArticlesPage: NextPage<ArticlesPageProps> = ({ feedItems }) => (
    <ContainerBlock
        customMeta={{
            title: "Florian Wahl - Articles on Product & Fintech",
            description:
                "Read Florian Wahl's articles and blog posts on product strategy, fintech innovation, digital transformation, and open finance.",
            type: "blog",
        }}
    >
        <Section labelledBy="articles-heading" ruled={false}>
            <SectionHeader kicker="Writing" title="Articles" id="articles-heading" as="h1" />
            <div>
                {feedItems.map((item, idx) => (
                    <ArticleRow key={item.slug ?? item.link ?? idx} item={item} />
                ))}
            </div>
        </Section>
    </ContainerBlock>
);

export const getStaticProps: GetStaticProps<ArticlesPageProps> = async () => {
    const posts = getAllPostsMeta();

    const postItems: FeedItem[] = posts.map((p: PostMeta) => ({
        title: p.title,
        date: p.date,
        description: p.description,
        readingTime: p.readingTime,
        slug: p.slug,
    }));

    const externalItems: FeedItem[] = userData.articles.map((a) => ({
        title: a.title,
        date: a.date ?? "",
        description: "",
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
