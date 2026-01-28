import React, { useMemo } from "react";
import userData from "../constants/data";
import { event } from "../utils/analytics";
import { PodcastIcon } from "./PixelIcons";

// Format date for display (e.g. "2025-06-15" -> "Jun 15, 2025", "2025-06" -> "Jun 2025")
const formatUpcomingDate = (dateStr: string): string => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const parts = dateStr.split("-");
    if (parts.length >= 2) {
        const year = parts[0];
        const month = parseInt(parts[1], 10) - 1;
        if (month >= 0 && month < 12) {
            if (parts.length >= 3) {
                const day = parseInt(parts[2], 10);
                if (!isNaN(day)) {
                    return `${monthNames[month]} ${day}, ${year}`;
                }
            }
            return `${monthNames[month]} ${year}`;
        }
    }
    return dateStr;
};

const UpcomingEngagements: React.FC = () => {
    const engagements = useMemo(() => {
        const list = userData.upcomingEngagements ?? [];
        return [...list].sort((a, b) => a.date.localeCompare(b.date));
    }, []);

    if (engagements.length === 0) {
        return null;
    }

    return (
        <section className="bg-white dark:bg-[#0a0a0a] py-20 transition-colors duration-300" aria-labelledby="upcoming-heading">
            <div className="max-w-6xl mx-auto px-4">
                <div className="mb-16">
                    <h2 id="upcoming-heading" className="text-4xl md:text-6xl lg:text-8xl font-bold text-black dark:text-white mb-4 pixel-text">
                        UPCOMING
                    </h2>
                    <p className="text-xl text-gray-700 dark:text-gray-300 font-mono">
                        Talks & panels
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {engagements.map((item, idx) => (
                        <div
                            key={idx}
                            className="pixel-card p-6 hover:border-yellow-500 dark:hover:border-yellow-400 transition-all duration-200"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="text-yellow-600 dark:text-yellow-400">
                                    <PodcastIcon className="w-8 h-8" size={32} />
                                </div>
                                <span className="text-xs font-mono text-yellow-600 dark:text-yellow-400">
                                    {formatUpcomingDate(item.date)}
                                </span>
                            </div>
                            <h3 className="text-black dark:text-white font-bold text-lg mb-2 font-mono">
                                {item.title}
                            </h3>
                            {item.description && (
                                <p className="text-gray-600 dark:text-gray-400 text-sm font-mono mb-3">
                                    {item.description}
                                </p>
                            )}
                            <p className="text-gray-600 dark:text-gray-400 text-sm font-mono">
                                {item.location ? `${item.conference} · ${item.location}` : item.conference}
                            </p>
                            {item.link && (
                                <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-4 inline-block text-yellow-600 dark:text-yellow-400 text-sm font-mono hover:underline"
                                    aria-label={`Session details for ${item.title}`}
                                    onClick={() =>
                                        event("upcoming_engagement_click", {
                                            title: item.title,
                                            link: item.link ?? "",
                                        })
                                    }
                                >
                                    Session details →
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default UpcomingEngagements;
