import React, { useState, useEffect, useRef } from "react";
import OptimizedImage from "./OptimizedImage";
import userData from "../constants/data";
import Link from "next/link";

const Hero: React.FC = () => {
    const [show, setShow] = useState(false);
    const fullName = userData.name.toUpperCase();
    const [displayedName, setDisplayedName] = useState(fullName);
    const [showDesignation, setShowDesignation] = useState(false);
    const [showTaglines, setShowTaglines] = useState(false);
    const designationTimeoutRef = useRef<number | null>(null);
    const taglinesTimeoutRef = useRef<number | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(true);
        }, 200);
        return () => clearTimeout(timer);
    }, []);

    // Typing effect for name
    useEffect(() => {
        if (!show) return;

        setDisplayedName("");

        let currentIndex = 0;
        const typingInterval = setInterval(() => {
            if (currentIndex < fullName.length) {
                setDisplayedName(fullName.slice(0, currentIndex + 1));
                currentIndex++;
            } else {
                clearInterval(typingInterval);
                // Show designation first, then taglines
                designationTimeoutRef.current = window.setTimeout(() => {
                    setShowDesignation(true);
                    // Show taglines after designation appears
                    taglinesTimeoutRef.current = window.setTimeout(() => {
                        setShowTaglines(true);
                    }, 400);
                }, 300);
            }
        }, 80); // Typing speed

        return () => {
            clearInterval(typingInterval);
            if (designationTimeoutRef.current !== null) {
                clearTimeout(designationTimeoutRef.current);
                designationTimeoutRef.current = null;
            }
            if (taglinesTimeoutRef.current !== null) {
                clearTimeout(taglinesTimeoutRef.current);
                taglinesTimeoutRef.current = null;
            }
        };
    }, [show, fullName]);

    return (
        <div className="bg-white dark:bg-[#0a0a0a] min-h-screen flex flex-col justify-center items-center px-4 py-20 relative overflow-hidden transition-colors duration-300">
            {/* Pixel background pattern */}
            <div className="absolute inset-0 opacity-10 dark:opacity-10" style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.05) 2px, rgba(0,0,0,0.05) 4px)',
            }}></div>
            <div className="absolute inset-0 opacity-10 hidden dark:block" style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
            }}></div>

            <div className="max-w-6xl mx-auto w-full relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-12">
                    {/* Text container */}
                    <div className="w-full md:w-1/2 text-center md:text-left">
                        <div className="mb-6">
                            <span className="inline-block px-4 py-2 bg-yellow-400 text-black font-bold font-mono text-sm pixel-border">
                                EXPERT MODE
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold text-black dark:text-white mb-6 pixel-text">
                            {displayedName}
                            {displayedName.length < fullName.length && (
                                <span className="animate-pulse">|</span>
                            )}
                        </h1>
                        <p 
                            className="text-2xl md:text-3xl text-yellow-500 dark:text-yellow-400 font-mono mb-8"
                            style={{
                                animation: showDesignation ? `fadeInUp 0.5s ease both` : 'none',
                                opacity: showDesignation ? 1 : 0
                            }}
                        >
                            {userData.designation.toUpperCase()}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-8 justify-center md:justify-start">
                            {userData.rainbowContent.map((content, index) => (
                                <div
                                    key={index}
                                    className="flex-shrink-0 tagline-badge"
                                    style={{
                                        animation: showTaglines ? `fadeInUp 0.5s ease ${index * 0.15}s both, pulse 2s ease-in-out ${1 + index * 0.3}s infinite` : 'none',
                                        opacity: showTaglines ? 1 : 0
                                    }}
                                >
                                    <span className="inline-block px-3 py-2 sm:px-4 bg-gray-100 dark:bg-gray-900 border-2 border-black dark:border-white text-black dark:text-white font-mono text-xs sm:text-sm md:text-lg pixel-border whitespace-nowrap hover:scale-105 transition-transform duration-200">
                                        {content.toUpperCase()}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                            <Link
                                href="/experience"
                                className="px-6 py-3 bg-yellow-400 text-black font-bold font-mono hover:bg-yellow-300 transition-colors pixel-button"
                            >
                                VIEW EXPERIENCE →
                            </Link>
                            <Link
                                href="/contact"
                                className="px-6 py-3 bg-white text-black font-bold font-mono hover:bg-gray-200 transition-colors pixel-button"
                            >
                                CONTACT ME →
                            </Link>
                        </div>
                    </div>

                    {/* Image container */}
                    <div className="w-full md:w-1/2 flex justify-center">
                        <div className="relative">
                            <div className="pixel-border bg-gray-100 dark:bg-gray-900 p-4">
                                <OptimizedImage
                                    src={userData.avatarUrl}
                                    alt="Florian Wahl - Product Leader and Engineer"
                                    width={400}
                                    height={400}
                                    className="w-full h-auto pixel-image"
                                    priority
                                    style={{
                                        maxWidth: '100%',
                                        height: 'auto',
                                        objectFit: 'cover',
                                    }}
                                />
                            </div>
                            <div className="mt-4 flex items-center justify-center gap-2">
                                <span className="text-yellow-500 dark:text-yellow-400 font-mono text-sm">▶</span>
                                <p className="font-mono text-sm text-black dark:text-white">PLAYER 1</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes pulse {
                    0%, 100% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1.02);
                    }
                }
                
                .tagline-badge:hover {
                    animation: fadeInUp 0.5s ease both, pulse 1s ease-in-out infinite !important;
                }
            `}</style>
        </div>
    );
};

export default Hero; 
