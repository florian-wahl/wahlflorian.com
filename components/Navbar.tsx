import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import userData from "../constants/data";
import { sendGAEvent } from "@next/third-parties/google";
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
            aria-label="Toggle Dark Mode"
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
        <div className="relative" ref={menuRef}>
            <div className="max-w-6xl mx-auto px-4 py-10 md:py-20">
                <div className="flex md:flex-row justify-between items-center">
                    {/* Logo and Name */}
                    <div className="flex flex-col">
                        <Link href="/">
                            <h1 className="font-semibold text-xl md:text-4xl dark:text-gray-100">
                                {userData.name}
                            </h1>
                            <p className="text-base font-light text-gray-500 dark:text-gray-300">
                                {userData.designation}
                            </p>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="space-x-8 hidden md:block">
                        <Link
                            href="/articles"
                            onClick={() => sendGAEvent({ event: 'navClicked', value: 'articles' })}
                            className={`text-base ${router.asPath === "/articles"
                                ? "text-gray-800 font-bold dark:text-gray-400"
                                : "text-gray-600 dark:text-gray-300 font-normal hover:text-gray-800 dark:hover:text-gray-100 transition-colors duration-200"
                                }`}
                        >
                            Articles
                            {router.asPath === "/articles" && (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-arrow-down inline-block h-3 w-3"
                                    viewBox="0 0 16 16"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"
                                    />
                                </svg>
                            )}
                        </Link>
                        <Link
                            href="/experience"
                            className={`text-base ${router.asPath === "/experience"
                                ? "text-gray-800 font-bold dark:text-gray-400"
                                : "text-gray-600 dark:text-gray-300 font-normal hover:text-gray-800 dark:hover:text-gray-100 transition-colors duration-200"
                                }`}
                        >
                            Experience{" "}
                            {router.asPath === "/experience" && (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-arrow-down inline-block h-3 w-3"
                                    viewBox="0 0 16 16"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"
                                    />
                                </svg>
                            )}
                        </Link>
                        <Link
                            href="https://portfolio.wahlflorian.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-base ${router.asPath === "/portfolio"
                                ? "text-gray-800 font-bold dark:text-gray-400"
                                : "text-gray-600 dark:text-gray-300 font-normal hover:text-gray-800 dark:hover:text-gray-100 transition-colors duration-200"
                                }`}
                        >
                            Portfolio{" "}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                fill="currentColor"
                                viewBox="0 0 30 30"
                                className="bi bi-arrow-down inline-block h-3 w-3"
                            >
                                <path d="M 25.980469 2.9902344 A 1.0001 1.0001 0 0 0 25.869141 3 L 20 3 A 1.0001 1.0001 0 1 0 20 5 L 23.585938 5 L 13.292969 15.292969 A 1.0001 1.0001 0 1 0 14.707031 16.707031 L 25 6.4140625 L 25 10 A 1.0001 1.0001 0 1 0 27 10 L 27 4.1269531 A 1.0001 1.0001 0 0 0 25.980469 2.9902344 z M 6 7 C 4.9069372 7 4 7.9069372 4 9 L 4 24 C 4 25.093063 4.9069372 26 6 26 L 21 26 C 22.093063 26 23 25.093063 23 24 L 23 14 L 23 11.421875 L 21 13.421875 L 21 16 L 21 24 L 6 24 L 6 9 L 14 9 L 16 9 L 16.578125 9 L 18.578125 7 L 16 7 L 14 7 L 6 7 z" />
                            </svg>
                        </Link>
                        <Link
                            href="/contact"
                            className={`text-base ${router.asPath === "/contact"
                                ? "text-gray-800 font-bold dark:text-gray-400"
                                : "text-gray-600 dark:text-gray-300 font-normal hover:text-gray-800 dark:hover:text-gray-100 transition-colors duration-200"
                                }`}
                        >
                            Contact
                            {router.asPath === "/contact" && (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-arrow-down inline-block h-3 w-3"
                                    viewBox="0 0 16 16"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"
                                    />
                                </svg>
                            )}
                        </Link>
                    </div>

                    {/* Desktop Social Links and Theme Toggle */}
                    <div className="hidden md:flex space-x-4 items-center">
                        <ThemeButton />
                        <SocialLinks />
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`md:hidden rounded-lg focus:outline-none focus:shadow-outline ${isOpen ? 'invisible' : 'visible'}`}
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
                        } md:hidden inset-0 bg-gray-800 bg-opacity-50 z-40 transition-opacity duration-200 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0'}`}
                    onClick={() => setIsOpen(false)}
                >
                    <div
                        className="fixed top-0 right-0 h-full w-72 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out"
                        style={{
                            transform: isOpen ? 'translateX(0)' : 'translateX(100%)'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Mobile Menu Header */}
                        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Menu</h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
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
                                        sendGAEvent({ event: 'navClicked', value: 'home' });
                                    }}
                                    className={`transform transition-transform duration-200 ease-in-out hover:translate-x-2 text-base px-4 py-2 rounded-md ${router.asPath === "/"
                                        ? "bg-gray-200 dark:bg-gray-700 text-gray-800 font-bold dark:text-gray-100"
                                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        }`}
                                >
                                    Home
                                </Link>
                                <Link
                                    href="/articles"
                                    onClick={() => {
                                        setIsOpen(false);
                                        sendGAEvent({ event: 'navClicked', value: 'articles' });
                                    }}
                                    className={`transform transition-transform duration-200 ease-in-out hover:translate-x-2 text-base px-4 py-2 rounded-md ${router.asPath === "/articles"
                                        ? "bg-gray-200 dark:bg-gray-700 text-gray-800 font-bold dark:text-gray-100"
                                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        }`}
                                >
                                    Articles
                                </Link>
                                <Link
                                    href="/experience"
                                    onClick={() => setIsOpen(false)}
                                    className={`transform transition-transform duration-200 ease-in-out hover:translate-x-2 text-base px-4 py-2 rounded-md ${router.asPath === "/experience"
                                        ? "bg-gray-200 dark:bg-gray-700 text-gray-800 font-bold dark:text-gray-100"
                                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        }`}
                                >
                                    Experience
                                </Link>
                                <Link
                                    href="https://portfolio.wahlflorian.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setIsOpen(false)}
                                    className="transform transition-transform duration-200 ease-in-out hover:translate-x-2 text-base px-4 py-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    Portfolio
                                </Link>
                                <Link
                                    href="/contact"
                                    onClick={() => setIsOpen(false)}
                                    className={`transform transition-transform duration-200 ease-in-out hover:translate-x-2 text-base px-4 py-2 rounded-md ${router.asPath === "/contact"
                                        ? "bg-gray-200 dark:bg-gray-700 text-gray-800 font-bold dark:text-gray-100"
                                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        }`}
                                >
                                    Contact
                                </Link>
                            </nav>

                            {/* Divider */}
                            <div className="my-6 border-t border-gray-200 dark:border-gray-700" />

                            {/* Theme Toggle and Social Links */}
                            <div className="space-y-6">
                                <div className="flex items-center justify-between px-4">
                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                        Dark Mode
                                    </span>
                                    <ThemeButton />
                                </div>
                                <div className="px-4">
                                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-3">
                                        Connect with me
                                    </h3>
                                    <SocialLinks className="justify-start" />
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
