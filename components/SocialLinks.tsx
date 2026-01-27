import React from "react";
import userData from "../constants/data";
import { event } from "../utils/analytics";

interface SocialLinksProps {
    className?: string;
    iconSize?: number;
    buttonSize?: "sm" | "md" | "lg";
}

const SocialLinks: React.FC<SocialLinksProps> = ({ 
    className = "", 
    iconSize = 16,
    buttonSize = "md" 
}) => {
    // Map button size to padding classes
    const paddingClasses = {
        sm: "p-2",
        md: "p-3",
        lg: "p-4"
    };

    const padding = paddingClasses[buttonSize];

    const handleSocialClick = (platform: string, url: string) => {
        event("social_click", {
            platform,
            category: "social",
            label: platform,
        });
    };

    return (
        <div className={`flex space-x-4 ${className}`}>
            {/* LinkedIn */}
            <a
                href={userData.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={`pixel-button bg-white text-black ${padding} hover:bg-gray-200 transition-colors`}
                aria-label="LinkedIn"
                onClick={() => handleSocialClick("LinkedIn", userData.socialLinks.linkedin)}
            >
                <svg
                    id="Linkedin"
                    width={iconSize}
                    height={iconSize}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="m22,2v-1H2v1h-1v20h1v1h20v-1h1V2h-1Zm-9,10v8h-3v-11h3v1h1v-1h4v1h1v10h-3v-8h-3Zm-9-4v-3h3v3h-3Zm3,1v11h-3v-11h3Z" fill="currentColor"/>
                </svg>
            </a>

            {/* Instagram */}
            <a
                href={userData.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={`pixel-button bg-white text-black ${padding} hover:bg-gray-200 transition-colors`}
                aria-label="Instagram"
                onClick={() => handleSocialClick("Instagram", userData.socialLinks.instagram)}
            >
                <svg
                    id="Instagram"
                    width={iconSize}
                    height={iconSize}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="m17,9v-1h-1v-1h-1v-1h-6v1h-1v1h-1v1h-1v6h1v1h1v1h1v1h6v-1h1v-1h1v-1h1v-6h-1Zm-1,5h-1v1h-1v1h-4v-1h-1v-1h-1v-4h1v-1h1v-1h4v1h1v1h1v4Z" fill="currentColor"/>
                    <path d="m22,5v-2h-1v-1h-2v-1H5v1h-2v1h-1v2h-1v14h1v2h1v1h2v1h14v-1h2v-1h1v-2h1V5h-1Zm-1,14h-1v1h-1v1H5v-1h-1v-1h-1V5h1v-1h1v-1h14v1h1v1h1v14Z" fill="currentColor"/>
                    <rect x="17" y="5" width="2" height="2" fill="currentColor"/>
                </svg>
            </a>

            {/* Mastodon */}
            <a
                href={userData.socialLinks.mastodon}
                target="_blank"
                rel="me noopener noreferrer"
                className={`pixel-button bg-white text-black ${padding} hover:bg-gray-200 transition-colors`}
                aria-label="Mastodon"
                onClick={() => handleSocialClick("Mastodon", userData.socialLinks.mastodon)}
            >
                <svg
                    id="Mastodon"
                    width={iconSize}
                    height={iconSize}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="m22,7v-3h-1v-1h-1v-1h-1v-1H5v1h-1v1h-1v1h-1v3h-1v9h1v3h1v1h1v1h1v1h2v1h7v-1h2v-2h-7v-1h-1v-2h1v1h9v-1h2v-1h1v-1h1v-2h1v-6h-1Zm-3,7h-3v-7h-2v1h-1v4h-2v-4h-1v-1h-2v7h-3V6h1v-1h1v-1h3v1h1v1h2v-1h1v-1h3v1h1v1h1v8Z" fill="currentColor"/>
                </svg>
            </a>

            {/* GitHub */}
            <a
                href={userData.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`pixel-button bg-white text-black ${padding} hover:bg-gray-200 transition-colors`}
                aria-label="GitHub"
                onClick={() => handleSocialClick("GitHub", userData.socialLinks.github)}
            >
                <svg
                    id="Github"
                    width={iconSize}
                    height={iconSize}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <polygon points="23 9 23 15 22 15 22 17 21 17 21 19 20 19 20 20 19 20 19 21 18 21 18 22 16 22 16 23 15 23 15 18 14 18 14 17 15 17 15 16 17 16 17 15 18 15 18 14 19 14 19 9 18 9 18 6 16 6 16 7 15 7 15 8 14 8 14 7 10 7 10 8 9 8 9 7 8 7 8 6 6 6 6 9 5 9 5 14 6 14 6 15 7 15 7 16 9 16 9 18 7 18 7 17 6 17 6 16 4 16 4 17 5 17 5 19 6 19 6 20 9 20 9 23 8 23 8 22 6 22 6 21 5 21 5 20 4 20 4 19 3 19 3 17 2 17 2 15 1 15 1 9 2 9 2 7 3 7 3 5 4 5 4 4 5 4 5 3 7 3 7 2 9 2 9 1 15 1 15 2 17 2 17 3 19 3 19 4 20 4 20 5 21 5 21 7 22 7 22 9 23 9" fill="currentColor"/>
                </svg>
            </a>
        </div>
    );
};

export default SocialLinks;
