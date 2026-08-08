import React from "react";
import userData from "../constants/data";
import { event } from "../utils/analytics";
import { LinkedInIcon, GitHubIcon, InstagramIcon, BlueskyIcon } from "./Icons";

interface SocialLinksProps {
    className?: string;
    iconSize?: number;
}

const links = [
    { key: "LinkedIn", href: (d: typeof userData) => d.socialLinks.linkedin, Icon: LinkedInIcon },
    { key: "Bluesky", href: (d: typeof userData) => d.socialLinks.bluesky, Icon: BlueskyIcon },
    { key: "GitHub", href: (d: typeof userData) => d.socialLinks.github, Icon: GitHubIcon },
    { key: "Instagram", href: (d: typeof userData) => d.socialLinks.instagram, Icon: InstagramIcon },
];

const SocialLinks: React.FC<SocialLinksProps> = ({ className = "", iconSize = 18 }) => (
    <div className={`flex items-center gap-5 ${className}`}>
        {links.map(({ key, href, Icon }) => (
            <a
                key={key}
                href={href(userData)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={key}
                // 24x24 minimum target (SC 2.5.8) via padding, without a visible box.
                className="-m-1 p-1 text-ink-muted transition-colors duration-120 ease-system hover:text-ink"
                onClick={() => event("social_click", { platform: key, category: "social", label: key })}
            >
                <Icon size={iconSize} />
            </a>
        ))}
    </div>
);

export default SocialLinks;
