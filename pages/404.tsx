import React, { useState, useEffect } from "react";
import Link from "next/link";
import ContainerBlock from "../components/ContainerBlock";
import { event } from "../utils/analytics";

const NotFound: React.FC = () => {
    const [blink, setBlink] = useState(true);
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowContent(true), 100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        event("page_404", { path: typeof window !== "undefined" ? window.location.pathname : "" });
    }, []);

    useEffect(() => {
        const interval = setInterval(() => setBlink((b) => !b), 530);
        return () => clearInterval(interval);
    }, []);

    return (
        <ContainerBlock
            customMeta={{
                title: "404 – Page Not Found | Florian Wahl",
                description: "This page doesn't exist. Game over.",
                type: "website",
            }}
        >
            <div className="bg-white dark:bg-[#0a0a0a] min-h-[calc(100vh-140px)] flex flex-col justify-center items-center px-4 py-20 relative overflow-hidden transition-colors duration-300">
                {/* Pixel background pattern */}
                <div
                    className="absolute inset-0 opacity-5 dark:opacity-10"
                    style={{
                        backgroundImage:
                            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
                    }}
                />

                <div
                    className="relative z-10 max-w-xl w-full text-center"
                    style={{
                        animation: showContent ? "fadeInUp 0.4s ease both" : "none",
                        opacity: showContent ? 1 : 0,
                    }}
                >
                    {/* HUD bar */}
                    <div className="flex justify-between items-center mb-6 font-mono text-xs text-gray-400 dark:text-gray-500 px-1">
                        <span>SCORE: 000000</span>
                        <span>LIVES: ☠ ☠ ☠</span>
                        <span>LEVEL: ???</span>
                    </div>

                    {/* Main game-over card */}
                    <div className="pixel-card relative mb-8 overflow-hidden">
                        {/* Scanline overlay */}
                        <div
                            className="absolute inset-0 pointer-events-none z-10"
                            style={{
                                background:
                                    "repeating-linear-gradient(0deg, rgba(0,0,0,0.06) 0px, rgba(0,0,0,0.06) 1px, transparent 1px, transparent 3px)",
                            }}
                        />

                        <div className="relative z-20 p-8 md:p-12">
                            {/* GAME OVER */}
                            <h1 className="text-6xl md:text-8xl font-bold text-black dark:text-white pixel-text leading-none mb-6">
                                GAME
                                <br />
                                OVER
                            </h1>

                            <div className="border-t-4 border-black dark:border-white mb-6" />

                            {/* Error code */}
                            <p className="font-mono text-3xl md:text-5xl font-bold text-yellow-500 dark:text-yellow-400 mb-1">
                                ERROR 404
                            </p>
                            <p className="font-mono text-sm md:text-base text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-6">
                                Level Not Found
                            </p>

                            {/* Blinking cursor */}
                            <span
                                className="font-mono text-lg text-black dark:text-white transition-opacity duration-100"
                                style={{ opacity: blink ? 1 : 0 }}
                            >
                                ▮
                            </span>
                        </div>
                    </div>

                    {/* Flavour text */}
                    <p className="font-mono text-sm md:text-base text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
                        The page you&apos;re looking for has been lost to the void.
                        <br />
                        Insert coin to continue, or return to the homepage.
                    </p>

                    {/* CTA buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                        <Link
                            href="/"
                            className="px-6 py-3 bg-yellow-400 text-black font-bold font-mono hover:bg-yellow-300 transition-colors pixel-button"
                            onClick={() => event("404_navigation", { label: "go_home" })}
                        >
                            ▶ HOMEPAGE
                        </Link>
                        <Link
                            href="/articles"
                            className="px-6 py-3 bg-white text-black font-bold font-mono hover:bg-gray-100 transition-colors pixel-button"
                            onClick={() => event("404_navigation", { label: "view_articles" })}
                        >
                            VIEW ARTICLES →
                        </Link>
                    </div>

                    {/* Footer hint */}
                    <p className="font-mono text-xs text-gray-300 dark:text-gray-700 uppercase tracking-widest">
                        Player 1 · Press Start
                    </p>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(24px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </ContainerBlock>
    );
};

export default NotFound;
