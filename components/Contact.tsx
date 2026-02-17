import React from "react";
import userData from "../constants/data";
import { MailIcon, LocationIcon } from "./PixelIcons";
import SocialLinks from "./SocialLinks";
import { event } from "../utils/analytics";

const Contact: React.FC = () => {
    return (
        <section className="bg-white dark:bg-[#0a0a0a] py-20 transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-4">
                <div className="mb-16">
                    <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-black dark:text-white mb-4 pixel-text">
                        CONTACT
                    </h1>
                    <p className="text-xl text-gray-700 dark:text-gray-300 font-mono">
                        Let's Connect
                    </p>
                </div>
                
                <div className="pixel-card bg-gray-50 dark:bg-gray-900 p-8 md:p-12 lg:p-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                            <header className="mb-12">
                                <h2 className="text-black dark:text-white font-bold text-3xl font-mono mb-4">
                                    GET IN TOUCH
                                </h2>
                                <p className="text-gray-700 dark:text-gray-300 font-mono text-base">
                                    Ready to collaborate? Send me a message and I'll get back to you.
                                </p>
                            </header>
                            
                            <div className="space-y-6 mb-12">
                                <a
                                    href={`mailto:${userData.email}`}
                                    className="flex flex-row items-center space-x-4 pixel-card bg-gray-100 dark:bg-gray-800 p-4 hover:border-yellow-500 dark:hover:border-yellow-400 transition-colors group"
                                    onClick={() => event("contact_click", { method: "email" })}
                                >
                                    <MailIcon className="text-yellow-600 dark:text-yellow-400" size={24} />
                                    <div>
                                        <p className="text-yellow-600 dark:text-yellow-400 font-mono text-xs uppercase mb-1">Email</p>
                                        <p className="text-black dark:text-white font-mono text-sm group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                                            {userData.email}
                                        </p>
                                    </div>
                                </a>
                                
                                <div className="flex flex-row items-center space-x-4 pixel-card bg-gray-100 dark:bg-gray-800 p-4">
                                    <LocationIcon className="text-yellow-600 dark:text-yellow-400" size={24} />
                                    <div>
                                        <p className="text-yellow-600 dark:text-yellow-400 font-mono text-xs uppercase mb-1">Location</p>
                                        <p className="text-black dark:text-white font-mono text-sm">
                                            {userData.address}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            <div>
                                <p className="text-yellow-600 dark:text-yellow-400 font-mono text-xs uppercase mb-4">Connect</p>
                                <SocialLinks iconSize={20} buttonSize="lg" />
                            </div>
                        </div>
                        
                        <div className="flex flex-col justify-center">
                            <div className="pixel-card bg-gray-100 dark:bg-gray-800 p-8">
                                <h3 className="text-black dark:text-white font-bold text-2xl font-mono mb-6">
                                    QUICK LINKS
                                </h3>
                                <div className="space-y-4">
                                    <a
                                        href={userData.resumeUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block pixel-button bg-yellow-400 text-black p-4 text-center font-bold font-mono hover:bg-yellow-300 transition-colors"
                                        onClick={() => event("resume_click", {})}
                                    >
                                        VIEW RESUME →
                                    </a>
                                    <a
                                        href="https://portfolio.wahlflorian.com/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block pixel-button bg-white text-black p-4 text-center font-bold font-mono hover:bg-gray-200 transition-colors"
                                        onClick={() => event("portfolio_click", {})}
                                    >
                                        PHOTOGRAPHY PORTFOLIO →
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact; 
