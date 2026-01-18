import React from "react";
import userData from "../constants/data";
import { event } from "../utils/analytics";
import Link from "next/link";

interface ThoughtLeadershipItem {
    title: string;
    type: "article" | "paper" | "talk" | "podcast";
    link?: string;
    venue?: string;
    date?: string;
    description?: string;
}

const ThoughtLeadership: React.FC = () => {
    // Combine all thought leadership content
    const thoughtLeadership: ThoughtLeadershipItem[] = [
        // Conference Talks
        ...userData.about.publicSpeaking.map(([title, venue]) => ({
            title,
            type: "talk" as const,
            venue,
        })),
        // Work Articles
        ...userData.workArticles.map((article) => ({
            title: article.title,
            type: "article" as const,
            link: article.link,
        })),
        // Personal Articles
        ...userData.personalArticles.map((article) => ({
            title: article.title,
            type: "article" as const,
            link: article.link,
        })),
    ];

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
                    {thoughtLeadership.map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-gray-900 border-4 border-white p-6 hover:border-yellow-400 transition-all duration-200 pixel-card"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <span className="text-3xl">{getTypeIcon(item.type)}</span>
                                <span className="text-xs font-mono text-gray-400 uppercase">
                                    {getTypeLabel(item.type)}
                                </span>
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
