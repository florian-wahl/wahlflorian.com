import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import userData from "../constants/data";
import { event } from "../utils/analytics";
import { useSwipe } from "../hooks/useSwipe";
import SocialLinks from "./SocialLinks";

const ThemeButton: React.FC = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="w-10 h-10" />;
    }

    return (
        <button
            aria-label={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            type="button"
            className="w-10 h-10 p-3 rounded focus:outline-none"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                className="w-4 h-4 text-yellow-500 dark:text-yellow-500"
            >
                {theme === "dark" ? (
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                ) : (
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                )}
            </svg>
        </button>
    );
};

const Navbar: React.FC = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close menu when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [router.asPath]);

    // Prevent scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Add swipe gesture for closing menu (on menu element)
    useSwipe({
        onSwipeRight: () => {
            if (isOpen) setIsOpen(false);
        },
        element: menuRef.current
    });

    // Add swipe gesture for opening menu (on document)
    useSwipe({
        onSwipeLeft: () => {
            if (!isOpen) setIsOpen(true);
        },
        element: null // This will use document as the target
    });

    return (
        <div className="relative bg-white dark:bg-[#0a0a0a] border-b-4 border-black dark:border-white transition-colors duration-300" ref={menuRef}>
            <div className="max-w-6xl mx-auto px-4 py-6 md:py-8">
                <div className="flex md:flex-row justify-between items-center">
                    {/* Logo and Name */}
                    <div className="flex flex-col">
                        <Link href="/">
                            <h1 className="font-bold text-xl md:text-3xl text-black dark:text-white font-mono pixel-text">
                                {userData.name.toUpperCase()}
                            </h1>
                            <p className="text-sm font-mono text-yellow-600 dark:text-yellow-400">
                                {userData.designation.toUpperCase()}
                            </p>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="space-x-4 hidden md:flex items-center">
                        <Link
                            href="/articles"
                            onClick={() => event('nav_click', { destination: 'articles' })}
                            className={`px-4 py-2 font-mono text-sm font-bold transition-colors duration-200 ${
                                router.asPath.startsWith("/articles")
                                    ? "bg-yellow-500 dark:bg-yellow-400 text-black pixel-border"
                                    : "text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 pixel-border border-black dark:border-white"
                            }`}
                        >
                            ARTICLES
                        </Link>
                        <Link
                            href="/experience"
                            onClick={() => event('nav_click', { destination: 'experience' })}
                            className={`px-4 py-2 font-mono text-sm font-bold transition-colors duration-200 ${
                                router.asPath === "/experience"
                                    ? "bg-yellow-500 dark:bg-yellow-400 text-black pixel-border"
                                    : "text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 pixel-border border-black dark:border-white"
                            }`}
                        >
                            EXPERIENCE
                        </Link>
                        <Link
                            href="https://portfolio.wahlflorian.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => event('nav_click', { destination: 'portfolio' })}
                            className="px-4 py-2 font-mono text-sm font-bold text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 pixel-border border-black dark:border-white transition-colors duration-200"
                        >
                            PORTFOLIO →
                        </Link>
                        <Link
                            href="/contact"
                            onClick={() => event('nav_click', { destination: 'contact' })}
                            className={`px-4 py-2 font-mono text-sm font-bold transition-colors duration-200 ${
                                router.asPath === "/contact"
                                    ? "bg-yellow-500 dark:bg-yellow-400 text-black pixel-border"
                                    : "text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 pixel-border border-black dark:border-white"
                            }`}
                        >
                            CONTACT
                        </Link>
                    </div>

                    {/* Desktop Social Links and Theme Toggle */}
                    <div className="hidden md:flex space-x-4 items-center">
                        <ThemeButton />
                        <SocialLinks iconSize={16} buttonSize="sm" />
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`md:hidden pixel-button bg-white text-black p-3 focus:outline-none ${isOpen ? 'invisible' : 'visible'}`}
                        aria-label={isOpen ? "Close Menu" : "Open Menu"}
                    >
                        <svg
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            className="w-6 h-6"
                        >
                            <path
                                fillRule="evenodd"
                                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`${isOpen ? 'fixed' : 'hidden'
                        } md:hidden inset-0 bg-black bg-opacity-75 z-40 transition-opacity duration-200 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0'}`}
                    onClick={() => setIsOpen(false)}
                >
                    <div
                        className="fixed top-0 right-0 h-full w-72 bg-white dark:bg-gray-900 border-l-4 border-black dark:border-white shadow-lg transform transition-transform duration-300 ease-in-out"
                        style={{
                            transform: isOpen ? 'translateX(0)' : 'translateX(100%)'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Mobile Menu Header */}
                        <div className="flex justify-between items-center p-4 border-b-4 border-black dark:border-white">
                            <h2 className="text-lg font-bold font-mono text-black dark:text-white">MENU</h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="pixel-button bg-white text-black p-2 hover:bg-gray-200 transition-colors"
                                aria-label="Close Menu"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>

                        {/* Mobile Menu Content */}
                        <div className="p-4">
                            <nav className="flex flex-col space-y-4">
                                <Link
                                    href="/"
                                    onClick={() => {
                                        setIsOpen(false);
                                        event('nav_click', { destination: 'home' });
                                    }}
                                    className={`px-4 py-3 font-mono text-sm font-bold transition-colors ${
                                        router.asPath === "/"
                                            ? "bg-yellow-500 dark:bg-yellow-400 text-black pixel-border"
                                            : "text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 pixel-border border-black dark:border-white"
                                    }`}
                                >
                                    HOME
                                </Link>
                                <Link
                                    href="/articles"
                                    onClick={() => {
                                        setIsOpen(false);
                                        event('nav_click', { destination: 'articles' });
                                    }}
                                    className={`px-4 py-3 font-mono text-sm font-bold transition-colors ${
                                        router.asPath.startsWith("/articles")
                                            ? "bg-yellow-500 dark:bg-yellow-400 text-black pixel-border"
                                            : "text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 pixel-border border-black dark:border-white"
                                    }`}
                                >
                                    ARTICLES
                                </Link>
                                <Link
                                    href="/experience"
                                    onClick={() => {
                                        setIsOpen(false);
                                        event('nav_click', { destination: 'experience' });
                                    }}
                                    className={`px-4 py-3 font-mono text-sm font-bold transition-colors ${
                                        router.asPath === "/experience"
                                            ? "bg-yellow-500 dark:bg-yellow-400 text-black pixel-border"
                                            : "text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 pixel-border border-black dark:border-white"
                                    }`}
                                >
                                    EXPERIENCE
                                </Link>
                                <Link
                                    href="https://portfolio.wahlflorian.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => {
                                        setIsOpen(false);
                                        event('nav_click', { destination: 'portfolio' });
                                    }}
                                    className="px-4 py-3 font-mono text-sm font-bold text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 pixel-border border-black dark:border-white transition-colors"
                                >
                                    PORTFOLIO →
                                </Link>
                                <Link
                                    href="/contact"
                                    onClick={() => {
                                        setIsOpen(false);
                                        event('nav_click', { destination: 'contact' });
                                    }}
                                    className={`px-4 py-3 font-mono text-sm font-bold transition-colors ${
                                        router.asPath === "/contact"
                                            ? "bg-yellow-500 dark:bg-yellow-400 text-black pixel-border"
                                            : "text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 pixel-border border-black dark:border-white"
                                    }`}
                                >
                                    CONTACT
                                </Link>
                            </nav>

                            {/* Divider */}
                            <div className="my-6 border-t-4 border-black dark:border-white" />

                            {/* Theme Toggle and Social Links */}
                            <div className="space-y-6">
                                <div className="flex items-center justify-between px-4">
                                    <span className="text-sm font-bold font-mono text-black dark:text-white">
                                        THEME
                                    </span>
                                    <ThemeButton />
                                </div>
                                <div className="px-4">
                                    <h3 className="text-sm font-bold font-mono text-black dark:text-white mb-3">
                                        CONNECT
                                    </h3>
                                    <SocialLinks className="justify-start" iconSize={16} buttonSize="sm" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
