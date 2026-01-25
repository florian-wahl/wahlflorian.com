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
        </div>
    );
};

export default SocialLinks;
