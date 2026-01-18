import React, { useMemo } from "react";
import userData from "../constants/data";
import { event } from "../utils/analytics";
import Link from "next/link";

interface ThoughtLeadershipItem {
    title: string;
    type: "article" | "paper" | "talk" | "podcast";
    link?: string;
    venue?: string;
    date: string; // ISO date string for sorting (YYYY-MM-DD or YYYY-MM)
    displayDate?: string; // Human-readable date
    description?: string;
}

interface ThoughtLeadershipProps {
    limit?: number; // Limit number of items to show (for homepage)
}

// Parse date from venue string (e.g., "OpenFinity EXPO, November 2024" -> "2024-11")
const parseDateFromVenue = (venue: string): string => {
    const monthNames: { [key: string]: string } = {
        "january": "01", "february": "02", "march": "03", "april": "04",
        "may": "05", "june": "06", "july": "07", "august": "08",
        "september": "09", "october": "10", "november": "11", "december": "12"
    };
    
    // Try to extract month and year from venue string
    const parts = venue.split(",");
    if (parts.length > 1) {
        const datePart = parts[parts.length - 1].trim();
        const dateMatch = datePart.match(/(\w+)\s+(\d{4})/i);
        if (dateMatch) {
            const month = monthNames[dateMatch[1].toLowerCase()];
            const year = dateMatch[2];
            if (month) {
                return `${year}-${month}`;
            }
        }
    }
    // Fallback: return a date far in the past if we can't parse
    return "2000-01";
};

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
            // Conference Talks - extract date from venue
            ...userData.about.publicSpeaking.map(([title, venue]) => {
                const date = parseDateFromVenue(venue);
                return {
                    title,
                    type: "talk" as const,
                    venue,
                    date,
                    displayDate: formatDisplayDate(date),
                };
            }),
            // Work Articles
            ...userData.workArticles.map((article) => ({
                title: article.title,
                type: "article" as const,
                link: article.link,
                date: article.date || "2000-01",
                displayDate: article.date ? formatDisplayDate(article.date) : undefined,
            })),
            // Personal Articles
            ...userData.personalArticles.map((article) => ({
                title: article.title,
                type: "article" as const,
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
                return "🎤";
            case "article":
                return "📝";
            case "paper":
                return "📄";
            case "podcast":
                return "🎙️";
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
            case "paper":
                return "Paper";
            case "podcast":
                return "Podcast";
            default:
                return "Thought Leadership";
        }
    };

    return (
        <section className="bg-[#0a0a0a] dark:bg-gray-900 py-20">
            <div className="max-w-6xl mx-auto px-4">
                <div className="mb-16">
                    <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold text-white dark:text-gray-100 mb-4 pixel-text">
                        THOUGHT LEADERSHIP
                    </h2>
                    <p className="text-xl text-gray-300 dark:text-gray-400 font-mono">
                        Articles, Papers & Conference Talks
                    </p>
                </div>


                {/* Grid of Items */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayedItems.map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-gray-900 border-4 border-white p-6 hover:border-yellow-400 transition-all duration-200 pixel-card"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <span className="text-3xl">{getTypeIcon(item.type)}</span>
                                <div className="flex flex-col items-end gap-1">
                                    <span className="text-xs font-mono text-gray-400 uppercase">
                                        {getTypeLabel(item.type)}
                                    </span>
                                    {item.displayDate && (
                                        <span className="text-xs font-mono text-yellow-400">
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
                                    <h3 className="text-white font-bold text-lg mb-2 group-hover:text-yellow-400 transition-colors font-mono">
                                        {item.title}
                                    </h3>
                                    {item.venue && (
                                        <p className="text-gray-400 text-sm font-mono">
                                            {item.venue}
                                        </p>
                                    )}
                                    <div className="mt-4 flex items-center text-yellow-400 text-sm font-mono">
                                        READ MORE →
                                    </div>
                                </a>
                            ) : (
                                <div>
                                    <h3 className="text-white font-bold text-lg mb-2 font-mono">
                                        {item.title}
                                    </h3>
                                    {item.venue && (
                                        <p className="text-gray-400 text-sm font-mono">
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
