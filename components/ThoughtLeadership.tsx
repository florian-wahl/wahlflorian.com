import React, { useMemo } from "react";
import userData from "../constants/data";
import { event } from "../utils/analytics";
import { Section, SectionHeader, IndexRow, Action } from "./primitives";

interface ThoughtLeadershipItem {
    title: string;
    type: "article" | "blog" | "talk";
    link?: string;
    slug?: string;
    venue?: string;
    date: string;
    displayDate?: string;
}

interface ThoughtLeadershipProps {
    limit?: number;
    hostedPosts?: { title: string; date: string; slug: string }[];
    showViewAll?: boolean;
}

/** "2024-11" -> "2024.11". Tabular and fixed-width so the column aligns. */
export const formatIndexDate = (dateStr: string): string => {
    const [year, month] = dateStr.split("-");
    return month ? `${year}.${month.padStart(2, "0")}` : year;
};

const TYPE_LABEL: Record<ThoughtLeadershipItem["type"], string> = {
    talk: "Talk",
    article: "Article",
    blog: "Essay",
};

const ThoughtLeadership: React.FC<ThoughtLeadershipProps> = ({
    limit,
    hostedPosts = [],
    showViewAll = true,
}) => {
    const items: ThoughtLeadershipItem[] = useMemo(() => {
        const all: ThoughtLeadershipItem[] = [
            ...userData.conferenceTalks.map((talk) => ({
                title: talk.title,
                type: "talk" as const,
                venue: talk.venue,
                date: talk.date,
                displayDate: formatIndexDate(talk.date),
            })),
            ...userData.articles.map((article) => ({
                title: article.title,
                type: "article" as const,
                link: article.link,
                date: article.date || "2000-01",
                displayDate: article.date ? formatIndexDate(article.date) : undefined,
            })),
            ...hostedPosts.map((post) => ({
                title: post.title,
                type: "blog" as const,
                slug: post.slug,
                date: post.date || "2000-01",
                displayDate: post.date ? formatIndexDate(post.date) : undefined,
            })),
        ];
        return all.sort((a, b) => b.date.localeCompare(a.date));
    }, [hostedPosts]);

    const displayed = limit ? items.slice(0, limit) : items;

    return (
        <Section labelledBy="writing-heading">
            <SectionHeader kicker="Writing & Speaking" id="writing-heading" />

            <div>
                {displayed.map((item, idx) => (
                    <IndexRow
                        key={`${item.title}-${idx}`}
                        date={item.displayDate}
                        title={item.title}
                        meta={item.venue || TYPE_LABEL[item.type]}
                        href={item.slug ? `/articles/${item.slug}` : item.link}
                        external={Boolean(item.link)}
                        onClick={() =>
                            event("thought_leadership_click", { title: item.title, type: item.type })
                        }
                    />
                ))}
            </div>

            {showViewAll && (
                <div className="mt-8">
                    <Action
                        href="/articles"
                        variant="ghost"
                        onClick={() => event("cta_click", { label: "view_all_articles" })}
                    >
                        All writing
                    </Action>
                </div>
            )}
        </Section>
    );
};

export default ThoughtLeadership;
