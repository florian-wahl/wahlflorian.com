import React, { useMemo } from "react";
import userData from "../constants/data";
import { event } from "../utils/analytics";
import Link from "next/link";
import { PodcastIcon, WritingIcon } from "./PixelIcons";

interface ThoughtLeadershipItem {
    title: string;
    type: "article" | "blog" | "paper" | "talk" | "podcast";
    link?: string;
    venue?: string;
    date: string; // ISO date string for sorting (YYYY-MM-DD or YYYY-MM)
    displayDate?: string; // Human-readable date
    description?: string;
}

interface ThoughtLeadershipProps {
    limit?: number; // Limit number of items to show (for homepage)
}

// Format date for display (e.g., "2024-11" -> "Nov 2024")
const formatDisplayDate = (dateStr: string): string => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const parts = dateStr.split("-");
    if (parts.length >= 2) {
        const year = parts[0];
        const month = parseInt(parts[1], 10) - 1;
        if (month >= 0 && month < 12) {
            return `${monthNames[month]} ${year}`;
        }
    }
    return dateStr;
};

const ThoughtLeadership: React.FC<ThoughtLeadershipProps> = ({ limit }) => {
    // Combine all thought leadership content with dates
    const thoughtLeadership: ThoughtLeadershipItem[] = useMemo(() => {
        const items: ThoughtLeadershipItem[] = [
            // Conference Talks
            ...userData.conferenceTalks.map((talk) => ({
                title: talk.title,
                type: "talk" as const,
                venue: talk.venue,
                date: talk.date,
                displayDate: formatDisplayDate(talk.date),
            })),
            // Work Articles - labeled as "Articles"
            ...userData.workArticles.map((article) => ({
                title: article.title,
                type: "article" as const,
                link: article.link,
                date: article.date || "2000-01",
                displayDate: article.date ? formatDisplayDate(article.date) : undefined,
            })),
            // Personal Articles - labeled as "Blog Posts"
            ...userData.personalArticles.map((article) => ({
                title: article.title,
                type: "blog" as const,
                link: article.link,
                date: article.date || "2000-01",
                displayDate: article.date ? formatDisplayDate(article.date) : undefined,
            })),
        ];
        
        // Sort by date (newest first)
        return items.sort((a, b) => b.date.localeCompare(a.date));
    }, []);
    
    // Apply limit if provided
    const displayedItems = limit ? thoughtLeadership.slice(0, limit) : thoughtLeadership;

    const getTypeIcon = (type: string) => {
        switch (type) {
            case "talk":
                return <PodcastIcon className="w-8 h-8" size={32} />;
            case "article":
                return <WritingIcon className="w-8 h-8" size={32} />;
            case "blog":
                return <WritingIcon className="w-8 h-8" size={32} />;
            case "paper":
                return <WritingIcon className="w-8 h-8" size={32} />;
            case "podcast":
                return <PodcastIcon className="w-8 h-8" size={32} />;
            default:
                return "💡";
        }
    };

    const getTypeLabel = (type: string) => {
        switch (type) {
            case "talk":
                return "Conference Talk";
            case "article":
                return "Article";
            case "blog":
                return "Blog Post";
            case "paper":
                return "Paper";
            case "podcast":
                return "Podcast";
            default:
                return "Thought Leadership";
        }
    };

    return (
        <section className="bg-white dark:bg-[#0a0a0a] py-20 transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-4">
                <div className="mb-16">
                    <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold text-black dark:text-white mb-4 pixel-text">
                        THOUGHT LEADERSHIP
                    </h2>
                    <p className="text-xl text-gray-700 dark:text-gray-300 font-mono">
                        Articles, Papers & Conference Talks
                    </p>
                </div>


                {/* Grid of Items */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayedItems.map((item, idx) => (
                        <div
                            key={idx}
                            className="pixel-card p-6 hover:border-yellow-500 dark:hover:border-yellow-400 transition-all duration-200"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="text-yellow-600 dark:text-yellow-400">{getTypeIcon(item.type)}</div>
                                <div className="flex flex-col items-end gap-1">
                                    <span className="text-xs font-mono text-gray-600 dark:text-gray-400 uppercase">
                                        {getTypeLabel(item.type)}
                                    </span>
                                    {item.displayDate && (
                                        <span className="text-xs font-mono text-yellow-600 dark:text-yellow-400">
                                            {item.displayDate}
                                        </span>
                                    )}
                                </div>
                            </div>
                            {item.link ? (
                                <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block group"
                                    onClick={() =>
                                        event("thought_leadership_click", {
                                            title: item.title,
                                            type: item.type,
                                        })
                                    }
                                >
                                    <h3 className="text-black dark:text-white font-bold text-lg mb-2 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors font-mono">
                                        {item.title}
                                    </h3>
                                    {item.venue && (
                                        <p className="text-gray-600 dark:text-gray-400 text-sm font-mono">
                                            {item.venue}
                                        </p>
                                    )}
                                    <div className="mt-4 flex items-center text-yellow-600 dark:text-yellow-400 text-sm font-mono">
                                        READ MORE →
                                    </div>
                                </a>
                            ) : (
                                <div>
                                    <h3 className="text-black dark:text-white font-bold text-lg mb-2 font-mono">
                                        {item.title}
                                    </h3>
                                    {item.venue && (
                                        <p className="text-gray-600 dark:text-gray-400 text-sm font-mono">
                                            {item.venue}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* View All Articles Link */}
                <div className="mt-12 text-center">
                    <Link
                        href="/articles"
                        className="inline-block px-8 py-4 bg-yellow-400 text-black font-bold font-mono hover:bg-yellow-300 transition-colors pixel-border pixel-button"
                    >
                        VIEW ALL ARTICLES →
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ThoughtLeadership;
