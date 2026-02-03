import React from "react";
import userData from "../constants/data";
import { event } from "../utils/analytics";

interface ProjectCardProps {
    title: string;
    link: string;
    imgUrl: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, link, imgUrl }) => {
    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full block pixel-card bg-gray-900 overflow-hidden group"
            onClick={() =>
                event("article_click", {
                    title,
                    category: "articles",
                    label: title,
                })
            }
        >
            <div className="relative overflow-hidden">
                <div className="h-64 relative">
                    <img
                        src={imgUrl}
                        alt={`${title} - Article thumbnail`}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    />
                </div>
                <div className="p-6">
                                    <h2 className="text-black dark:text-white font-bold text-lg font-mono group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                                        {title.toUpperCase()}
                                    </h2>
                                    <div className="mt-4 flex items-center text-yellow-600 dark:text-yellow-400 text-sm font-mono">
                                        READ ARTICLE →
                                    </div>
                </div>
            </div>
        </a>
    );
};

const Articles: React.FC = () => {
    return (
        <section className="bg-white dark:bg-[#0a0a0a] py-20 transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-4">
                <div className="mb-16">
                    <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-black dark:text-white mb-4 pixel-text">
                        ARTICLES
                    </h1>
                    <p className="text-xl text-gray-700 dark:text-gray-300 font-mono">
                        Writing & Thought Leadership
                    </p>
                </div>

                {/* Work Articles */}
                <div className="mb-20">
                    <h2 className="text-2xl md:text-4xl font-bold text-black dark:text-white mb-8 font-mono pixel-text">
                        WORK ARTICLES
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {userData.workArticles.map((proj, idx) => (
                            <ProjectCard
                                key={idx}
                                title={proj.title}
                                link={proj.link}
                                imgUrl={proj.imgUrl}
                            />
                        ))}
                    </div>
                </div>

                {/* Personal Articles */}
                <div>
                    <h2 className="text-2xl md:text-4xl font-bold text-black dark:text-white mb-8 font-mono pixel-text">
                        PERSONAL ARTICLES
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
                        {userData.personalArticles.map((proj, idx) => (
                            <ProjectCard
                                key={idx}
                                title={proj.title}
                                link={proj.link}
                                imgUrl={proj.imgUrl}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Articles; 
