import React, { useState, useEffect, useRef } from "react";
import OptimizedImage from "./OptimizedImage";
import userData from "../constants/data";
import Link from "next/link";
import { event } from "../utils/analytics";

const Hero: React.FC = () => {
    const [show, setShow] = useState(false);
    const [firstName, lastName] = userData.name.toUpperCase().split(" ");
    const fullName = `${firstName} ${lastName}`;
    const [displayedName, setDisplayedName] = useState("");
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
                designationTimeoutRef.current = window.setTimeout(() => {
                    setShowDesignation(true);
                    taglinesTimeoutRef.current = window.setTimeout(() => {
                        setShowTaglines(true);
                    }, 400);
                }, 300);
            }
        }, 80);

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

    // Split displayed name across the two lines
    const displayedFirst = displayedName.slice(0, firstName.length);
    const displayedLast = displayedName.length > firstName.length
        ? displayedName.slice(firstName.length + 1) // +1 to skip the space
        : "";
    const cursorOnFirst = displayedName.length <= firstName.length && displayedName.length < fullName.length;
    const cursorOnLast = displayedName.length > firstName.length && displayedName.length < fullName.length;

    return (
        <div className="bg-white dark:bg-[#0a0a0a] min-h-screen flex flex-col justify-center items-center px-4 py-20 relative overflow-hidden transition-colors duration-300">
            {/* Pixel background pattern */}
            <div className="absolute inset-0 opacity-10 dark:opacity-10" style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.05) 2px, rgba(0,0,0,0.05) 4px)',
            }}></div>
            <div className="absolute inset-0 opacity-10 hidden dark:block" style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
            }}></div>

            <div className="max-w-6xl mx-auto w-full relative z-10 flex flex-col gap-12">
                {/* Section 1: Two columns — name/tags/CTAs | headshot */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-12">
                    {/* Left: name, designation, tags, buttons */}
                    <div className="w-full md:w-1/2 text-center md:text-left">
                        <div className="mb-6">
                            <span className="inline-block px-4 py-2 bg-yellow-400 text-black font-bold font-mono text-sm pixel-border">
                                EXPERT MODE
                            </span>
                        </div>

                        {/* Name — fixed sizes per breakpoint.
                            Mobile (full-width col): text-6xl → sm: text-8xl
                            Desktop (half-width col): md: text-7xl → lg: text-8xl → xl: text-9xl → 2xl: text-9xl */}
                        <div className="mb-6 py-4 md:pr-5">
                            <h1 className="font-bold text-black dark:text-white pixel-text leading-none text-6xl sm:text-8xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-9xl">
                                <span className="block">
                                    {displayedFirst}
                                    {cursorOnFirst && <span className="animate-pulse">|</span>}
                                </span>
                                <span className="block">
                                    {displayedLast || <span className="invisible">{lastName}</span>}
                                    {cursorOnLast && <span className="animate-pulse">|</span>}
                                </span>
                            </h1>
                        </div>

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
                                className="px-6 py-3 bg-yellow-400 text-black font-bold font-mono hover:bg-yellow-300 transition-colors pixel-button whitespace-nowrap"
                                onClick={() => event("cta_click", { label: "view_experience" })}
                            >
                                VIEW EXPERIENCE →
                            </Link>
                            <a
                                href={userData.resumeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 bg-white text-black font-bold font-mono hover:bg-gray-200 transition-colors pixel-button whitespace-nowrap"
                                onClick={() => event("cta_click", { label: "view_resume" })}
                            >
                                VIEW RESUME →
                            </a>
                        </div>
                    </div>

                    {/* Right: headshot + location */}
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
                                <p className="font-mono text-sm text-black dark:text-white">NEW YORK, NY</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 2: Full-width bio */}
                <div className="w-full">
                    <p className="text-base md:text-lg font-mono text-gray-600 dark:text-gray-400">
                        {userData.bio}
                    </p>
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
