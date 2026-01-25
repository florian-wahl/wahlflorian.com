import React from "react";
import userData from "../constants/data";
import { PodcastIcon } from "./PixelIcons";

const AboutMe: React.FC = () => {
    return (
        <section className="bg-white dark:bg-[#0a0a0a] py-20 transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-4">
                <div className="mb-16">
                    <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-black dark:text-white mb-4 pixel-text">
                        ABOUT ME
                    </h1>
                </div>
                
                <div className="mb-12">
                    <p className="text-2xl md:text-3xl font-bold text-black dark:text-white font-mono leading-relaxed">
                        {userData.about.title}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {/* Contact & Links */}
                    <div className="space-y-8">
                        <div className="pixel-card bg-gray-50 dark:bg-gray-900 p-6">
                            <h2 className="text-xl font-bold text-black dark:text-white font-mono mb-4">
                                CONTACT
                            </h2>
                            <p className="text-gray-700 dark:text-gray-300 font-mono text-sm mb-4">
                                For any inquiry, please contact me
                            </p>
                            <a
                                href={`mailto:${userData.email}`}
                                className="inline-block px-4 py-2 bg-yellow-500 dark:bg-yellow-400 text-black font-bold font-mono text-sm pixel-button hover:bg-yellow-400 dark:hover:bg-yellow-300 transition-colors"
                            >
                                SEND EMAIL →
                            </a>
                        </div>
                        
                        <div className="pixel-card bg-gray-50 dark:bg-gray-900 p-6">
                            <h2 className="text-xl font-bold text-black dark:text-white font-mono mb-4">
                                RESUME
                            </h2>
                            <a
                                href={userData.resumeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block px-4 py-2 bg-white dark:bg-white text-black font-bold font-mono text-sm pixel-button hover:bg-gray-100 dark:hover:bg-gray-200 transition-colors"
                            >
                                VIEW CV →
                            </a>
                        </div>
                    </div>
                    
                    {/* Description */}
                    <div className="col-span-1 md:col-span-2 space-y-8">
                        {userData.about.description?.map((desc, idx) => (
                            <p
                                key={idx}
                                className="text-lg text-gray-700 dark:text-gray-300 font-mono leading-relaxed"
                            >
                                {desc}
                            </p>
                        ))}
                    </div>
                </div>

                {/* Public Speaking */}
                <div className="mb-12">
                    <h2 className="text-2xl md:text-4xl font-bold text-black dark:text-white mb-6 font-mono pixel-text">
                        PUBLIC SPEAKING
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {userData.conferenceTalks.map((talk, idx) => (
                            <div key={idx} className="pixel-card bg-gray-50 dark:bg-gray-900 p-6">
                                <p className="text-black dark:text-white font-mono text-sm mb-2 flex items-center gap-2">
                                    <PodcastIcon className="text-yellow-600 dark:text-yellow-400" size={20} /> {talk.title}
                                </p>
                                <p className="text-gray-600 dark:text-gray-400 font-mono text-xs">
                                    {talk.venue}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Certifications */}
                <div>
                    <h2 className="text-2xl md:text-4xl font-bold text-black dark:text-white mb-6 font-mono pixel-text">
                        CERTIFICATIONS
                    </h2>
                    <div className="pixel-card bg-gray-50 dark:bg-gray-900 p-6">
                        {userData.about.certifications?.map((cert, idx) => (
                            <p key={idx} className="text-gray-700 dark:text-gray-300 font-mono text-base leading-relaxed">
                                {cert}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutMe; 