import React from "react";
import userData from "../constants/data";
import { event } from "../utils/analytics";

const Contact: React.FC = () => {
    return (
        <section className="bg-[#0a0a0a] dark:bg-gray-900 py-20">
            <div className="max-w-6xl mx-auto px-4">
                <div className="mb-16">
                    <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-white dark:text-gray-100 mb-4 pixel-text">
                        CONTACT
                    </h1>
                    <p className="text-xl text-gray-300 dark:text-gray-400 font-mono">
                        Let's Connect
                    </p>
                </div>
                
                <div className="pixel-card bg-gray-900 p-8 md:p-12 lg:p-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                            <header className="mb-12">
                                <h2 className="text-white font-bold text-3xl font-mono mb-4">
                                    GET IN TOUCH
                                </h2>
                                <p className="text-gray-300 font-mono text-base">
                                    Ready to collaborate? Send me a message and I'll get back to you.
                                </p>
                            </header>
                            
                            <div className="space-y-6 mb-12">
                                <a
                                    href={`mailto:${userData.email}`}
                                    className="flex flex-row items-center space-x-4 pixel-card bg-gray-800 p-4 hover:border-yellow-400 transition-colors group"
                                >
                                    <div className="text-2xl">📧</div>
                                    <div>
                                        <p className="text-yellow-400 font-mono text-xs uppercase mb-1">Email</p>
                                        <p className="text-white font-mono text-sm group-hover:text-yellow-400 transition-colors">
                                            {userData.email}
                                        </p>
                                    </div>
                                </a>
                                
                                <div className="flex flex-row items-center space-x-4 pixel-card bg-gray-800 p-4">
                                    <div className="text-2xl">📍</div>
                                    <div>
                                        <p className="text-yellow-400 font-mono text-xs uppercase mb-1">Location</p>
                                        <p className="text-white font-mono text-sm">
                                            {userData.address}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            <div>
                                <p className="text-yellow-400 font-mono text-xs uppercase mb-4">Connect</p>
                                <div className="flex flex-row space-x-4">
                                    <a
                                        href={userData.socialLinks.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="pixel-button bg-white text-black p-4 hover:bg-gray-200 transition-colors"
                                        onClick={() =>
                                            event("social_click", {
                                                platform: "LinkedIn",
                                                category: "social",
                                                label: "LinkedIn",
                                            })
                                        }
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            fill="currentColor"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                                        </svg>
                                    </a>
                                    <a
                                        href={userData.socialLinks.twitter}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="pixel-button bg-white text-black p-4 hover:bg-gray-200 transition-colors"
                                        onClick={() =>
                                            event("social_click", {
                                                platform: "Twitter",
                                                category: "social",
                                                label: "Twitter",
                                            })
                                        }
                                    >
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M8 3C9.10457 3 10 3.89543 10 5V8H16C17.1046 8 18 8.89543 18 10C18 11.1046 17.1046 12 16 12H10V14C10 15.6569 11.3431 17 13 17H16C17.1046 17 18 17.8954 18 19C18 20.1046 17.1046 21 16 21H13C9.13401 21 6 17.866 6 14V5C6 3.89543 6.89543 3 8 3Z"
                                            />
                                        </svg>
                                    </a>
                                    <a
                                        href={userData.socialLinks.instagram}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="pixel-button bg-white text-black p-4 hover:bg-gray-200 transition-colors"
                                        onClick={() =>
                                            event("social_click", {
                                                platform: "Instagram",
                                                category: "social",
                                                label: "Instagram",
                                            })
                                        }
                                    >
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7ZM9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12Z"
                                            />
                                            <path
                                                d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z"
                                            />
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M5 1C2.79086 1 1 2.79086 1 5V19C1 21.2091 2.79086 23 5 23H19C21.2091 23 23 21.2091 23 19V5C23 2.79086 21.2091 1 19 1H5ZM19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
                                            />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex flex-col justify-center">
                            <div className="pixel-card bg-gray-800 p-8">
                                <h3 className="text-white font-bold text-2xl font-mono mb-6">
                                    QUICK LINKS
                                </h3>
                                <div className="space-y-4">
                                    <a
                                        href={userData.resumeUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block pixel-button bg-yellow-400 text-black p-4 text-center font-bold font-mono hover:bg-yellow-300 transition-colors"
                                    >
                                        VIEW RESUME →
                                    </a>
                                    <a
                                        href="https://portfolio.wahlflorian.com/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block pixel-button bg-white text-black p-4 text-center font-bold font-mono hover:bg-gray-200 transition-colors"
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
