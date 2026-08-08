import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import userData from "../constants/data";
import { event } from "../utils/analytics";
import { useSwipe } from "../hooks/useSwipe";
import SocialLinks from "./SocialLinks";
import { Container } from "./primitives";
import { SunIcon, MoonIcon, MenuIcon, CloseIcon, ExternalIcon } from "./Icons";

const ThemeButton: React.FC = () => {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    // Reserve the slot pre-hydration so the chrome doesn't shift.
    if (!mounted) return <div className="h-8 w-8" aria-hidden="true" />;

    const isDark = resolvedTheme === "dark";
    return (
        <button
            type="button"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="flex h-8 w-8 items-center justify-center rounded text-ink-muted transition-colors duration-120 ease-system hover:text-ink"
        >
            {isDark ? <SunIcon size={18} /> : <MoonIcon size={18} />}
        </button>
    );
};

const NAV = [
    { href: "/articles", label: "Writing", key: "articles" },
    { href: "/experience", label: "Experience", key: "experience" },
    { href: "/contact", label: "Contact", key: "contact" },
];

const PHOTOGRAPHY = "https://portfolio.wahlflorian.com/";

const Navbar: React.FC = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => setIsOpen(false), [router.asPath]);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "unset";
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    useSwipe({ onSwipeRight: () => isOpen && setIsOpen(false), element: menuRef.current });
    useSwipe({ onSwipeLeft: () => !isOpen && setIsOpen(true), element: null });

    const isActive = (href: string) =>
        href === "/articles" ? router.asPath.startsWith("/articles") : router.asPath === href;

    const linkClass = (active: boolean) =>
        `border-b py-1 text-label uppercase transition-colors duration-120 ease-system ${
            active
                ? "border-accent text-ink"
                : "border-transparent text-ink-muted hover:border-accent hover:text-ink"
        }`;

    return (
        <div className="border-b border-rule bg-canvas" ref={menuRef}>
            <Container>
                <div className="flex items-center justify-between gap-8 py-5">
                    <Link
                        href="/"
                        className="font-display text-display-s font-bold text-ink transition-colors duration-120 ease-system hover:text-accent"
                    >
                        {userData.name}
                    </Link>

                    <nav className="hidden items-baseline gap-7 md:flex">
                        {NAV.map(({ href, label, key }) => (
                            <Link
                                key={key}
                                href={href}
                                onClick={() => event("nav_click", { destination: key })}
                                className={linkClass(isActive(href))}
                            >
                                {label}
                            </Link>
                        ))}
                        <a
                            href={PHOTOGRAPHY}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => event("nav_click", { destination: "photography" })}
                            className={`${linkClass(false)} inline-flex items-center gap-1.5`}
                        >
                            Photography
                            <ExternalIcon size={11} />
                        </a>
                    </nav>

                    <div className="hidden items-center gap-5 md:flex">
                        <ThemeButton />
                        <SocialLinks iconSize={17} />
                    </div>

                    <div className="flex items-center gap-2 md:hidden">
                        <ThemeButton />
                        <button
                            type="button"
                            onClick={() => setIsOpen(true)}
                            aria-label="Open menu"
                            aria-expanded={isOpen}
                            className="flex h-8 w-8 items-center justify-center rounded text-ink transition-colors duration-120 ease-system hover:text-accent"
                        >
                            <MenuIcon size={20} />
                        </button>
                    </div>
                </div>
            </Container>

            {/* Mobile menu */}
            <div
                className={`fixed inset-0 z-40 bg-overlay transition-opacity duration-200 ease-system md:hidden ${
                    isOpen ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
                onClick={() => setIsOpen(false)}
                aria-hidden={!isOpen}
            >
                <div
                    className="fixed inset-y-0 right-0 flex w-72 flex-col border-l border-rule bg-canvas transition-transform duration-200 ease-system"
                    style={{ transform: isOpen ? "translateX(0)" : "translateX(100%)" }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex items-center justify-between border-b border-rule px-6 py-5">
                        <span className="text-label-s uppercase text-ink-muted">Menu</span>
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            aria-label="Close menu"
                            className="flex h-8 w-8 items-center justify-center rounded text-ink transition-colors duration-120 ease-system hover:text-accent"
                        >
                            <CloseIcon size={20} />
                        </button>
                    </div>

                    <nav className="flex flex-col px-6">
                        {[{ href: "/", label: "Home", key: "home" }, ...NAV].map(({ href, label, key }) => (
                            <Link
                                key={key}
                                href={href}
                                onClick={() => {
                                    setIsOpen(false);
                                    event("nav_click", { destination: key });
                                }}
                                className={`border-b border-rule py-4 text-label uppercase transition-colors duration-120 ease-system ${
                                    isActive(href) ? "text-accent" : "text-ink hover:text-accent"
                                }`}
                            >
                                {label}
                            </Link>
                        ))}
                        <a
                            href={PHOTOGRAPHY}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => {
                                setIsOpen(false);
                                event("nav_click", { destination: "photography" });
                            }}
                            className="flex items-center gap-1.5 border-b border-rule py-4 text-label uppercase text-ink transition-colors duration-120 ease-system hover:text-accent"
                        >
                            Photography
                            <ExternalIcon size={11} />
                        </a>
                    </nav>

                    <div className="mt-auto px-6 py-6">
                        <p className="mb-4 text-label-s uppercase text-ink-muted">Connect</p>
                        <SocialLinks iconSize={18} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
