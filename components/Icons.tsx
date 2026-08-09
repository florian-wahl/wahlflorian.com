import React from "react";

/**
 * One icon set, one weight, functional only. DESIGN.md §6.
 *
 * UI icons are 1.5px stroke on a 24px grid and inherit `currentColor`.
 * Brand marks are filled — they are reproductions, not part of the stroke
 * system, and are kept at a matched optical weight.
 *
 * No decorative icons. If an icon does not carry information the adjacent
 * text lacks, it does not belong here.
 */

interface IconProps {
    className?: string;
    size?: number;
}

const stroke = (size: number) => ({
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true,
    focusable: false,
});

const brand = (size: number, viewBox = "0 0 24 24") => ({
    width: size,
    height: size,
    viewBox,
    fill: "currentColor",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true,
    focusable: false,
});

/* ---------- UI ---------- */

export const MailIcon: React.FC<IconProps> = ({ className = "", size = 20 }) => (
    <svg {...stroke(size)} className={className}>
        <rect x="2" y="4.5" width="20" height="15" rx="1" />
        <path d="M2.5 6l9.5 7 9.5-7" />
    </svg>
);

export const LocationIcon: React.FC<IconProps> = ({ className = "", size = 20 }) => (
    <svg {...stroke(size)} className={className}>
        <path d="M20 10.5c0 5.25-8 12-8 12s-8-6.75-8-12a8 8 0 1116 0z" />
        <circle cx="12" cy="10.5" r="2.75" />
    </svg>
);

export const SunIcon: React.FC<IconProps> = ({ className = "", size = 20 }) => (
    <svg {...stroke(size)} className={className}>
        <circle cx="12" cy="12" r="4.5" />
        <path d="M12 2v2M12 20v2M22 12h-2M4 12H2M19.07 4.93l-1.41 1.41M6.34 17.66l-1.41 1.41M19.07 19.07l-1.41-1.41M6.34 6.34L4.93 4.93" />
    </svg>
);

export const MoonIcon: React.FC<IconProps> = ({ className = "", size = 20 }) => (
    <svg {...stroke(size)} className={className}>
        <path d="M20.5 14.8A8.5 8.5 0 019.2 3.5a8.5 8.5 0 1011.3 11.3z" />
    </svg>
);

export const MenuIcon: React.FC<IconProps> = ({ className = "", size = 20 }) => (
    <svg {...stroke(size)} className={className}>
        <path d="M3.5 6.5h17M3.5 12h17M3.5 17.5h17" />
    </svg>
);

export const CloseIcon: React.FC<IconProps> = ({ className = "", size = 20 }) => (
    <svg {...stroke(size)} className={className}>
        <path d="M5.5 5.5l13 13M18.5 5.5l-13 13" />
    </svg>
);

/** Marks a link that leaves the site. Informational, not decorative. */
export const ExternalIcon: React.FC<IconProps> = ({ className = "", size = 14 }) => (
    <svg {...stroke(size)} className={className}>
        <path d="M8 5.5h10.5V16" />
        <path d="M18.5 5.5L5.5 18.5" />
    </svg>
);

export const ArrowRightIcon: React.FC<IconProps> = ({ className = "", size = 14 }) => (
    <svg {...stroke(size)} className={className}>
        <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
);

/* ---------- Brand marks ---------- */

export const LinkedInIcon: React.FC<IconProps> = ({ className = "", size = 18 }) => (
    <svg {...brand(size)} className={className}>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);

export const GitHubIcon: React.FC<IconProps> = ({ className = "", size = 18 }) => (
    <svg {...brand(size)} className={className}>
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
);

export const InstagramIcon: React.FC<IconProps> = ({ className = "", size = 18 }) => (
    <svg {...brand(size)} className={className}>
        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.209 0-4-1.79-4-4 0-2.209 1.79-4 4-4 2.209 0 4 1.79 4 4 0 2.209-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
    </svg>
);

export const BlueskyIcon: React.FC<IconProps> = ({ className = "", size = 18 }) => (
    <svg {...brand(size, "0 0 360 320")} className={className}>
        <path d="M180 142c-16.3-31.7-60.7-90.8-102-120C38.5-5.9 23.4-1 13.5 3.4 2.1 8.6 0 26.2 0 36.5c0 10.4 5.7 84.8 9.4 97.2 12.2 41 55.7 55 95.7 50.5-58.7 8.6-110.8 30-42.4 106.1 75.1 77.9 103-16.7 117.3-64.6 14.3 48 30.8 139 116 64.6 64-64.6 17.6-97.5-41.1-106.1 40 4.4 83.5-9.5 95.7-50.5 3.7-12.4 9.4-86.8 9.4-97.2 0-10.3-2-27.9-13.5-33C336.5-1 321.5-6 282 22c-41.3 29.2-85.7 88.3-102 120Z" />
    </svg>
);
