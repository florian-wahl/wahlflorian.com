import React from "react";

// Podcast icon from HackerNoon Pixel Icon Library
export const PodcastIcon: React.FC<{ className?: string; size?: number }> = ({ className = "", size = 24 }) => {
    return (
        <svg
            id="Podcasts"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="currentColor"
            className={className}
            style={{ display: 'inline-block', verticalAlign: 'middle' }}
            xmlns="http://www.w3.org/2000/svg"
        >
            <polygon points="9 14 8 14 8 12 11 12 11 11 8 11 8 9 11 9 11 8 8 8 8 6 11 6 11 5 8 5 8 3 9 3 9 2 10 2 10 1 14 1 14 2 15 2 15 3 16 3 16 5 13 5 13 6 16 6 16 8 13 8 13 9 16 9 16 11 13 11 13 12 16 12 16 14 15 14 15 15 14 15 14 16 10 16 10 15 9 15 9 14"/>
            <polygon points="19 12 19 15 18 15 18 17 17 17 17 18 15 18 15 19 13 19 13 21 16 21 16 23 8 23 8 21 11 21 11 19 9 19 9 18 7 18 7 17 6 17 6 15 5 15 5 12 6 12 6 14 7 14 7 16 8 16 8 17 10 17 10 18 14 18 14 17 16 17 16 16 17 16 17 14 18 14 18 12 19 12"/>
        </svg>
    );
};

// Writing icon from HackerNoon Pixel Icon Library
export const WritingIcon: React.FC<{ className?: string; size?: number }> = ({ className = "", size = 24 }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="currentColor"
            className={className}
            style={{ display: 'inline-block', verticalAlign: 'middle' }}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M23.5049 7.5012V9.50166H22.5047V10.5019H21.5045V9.50166H20.5043V8.50143H19.504V7.5012H20.5043V6.50098H22.5047V7.5012H23.5049Z" fill="currentColor"/>
            <path d="M21.5046 10.5019V11.5021H20.5044V12.5024H19.5041V13.5026H18.5039V14.5028H17.5037V15.5031H16.5035V16.5033H15.5032V17.5035H14.503V18.5037H11.5023V15.5031H12.5025V14.5028H13.5028V13.5026H14.503V12.5024H15.5032V11.5021H16.5035V10.5019H17.5037V9.50169H18.5039V8.50146H19.5041V9.50169H20.5044V10.5019H21.5046Z" fill="currentColor"/>
            <path d="M17.5036 2.50023V1.5H2.50023V2.50023H1.5V22.5048H2.50023V23.505H17.5036V22.5048H18.5039V16.5034H17.5036V17.5036H16.5034V18.5039H15.5032V19.5041H10.502V14.503H11.5023V13.5027H12.5025V12.5025H13.5027V11.5023H14.503V10.502H15.5032V9.50182H16.5034V8.50159H17.5036V7.50136H18.5039V2.50023H17.5036ZM16.5034 5.50091H3.50045V4.50068H16.5034V5.50091ZM14.503 8.50159H3.50045V7.50136H14.503V8.50159ZM8.50159 17.5036H3.50045V16.5034H8.50159V17.5036ZM3.50045 14.503V13.5027H9.50182V14.503H3.50045ZM3.50045 11.5023V10.502H12.5025V11.5023H3.50045Z" fill="currentColor"/>
        </svg>
    );
};

// Microphone icon (alias for PodcastIcon for backward compatibility)
export const MicrophoneIcon: React.FC<{ className?: string; size?: number }> = ({ className = "", size = 24 }) => {
    return <PodcastIcon className={className} size={size} />;
};

// Document/Article icon (alias for WritingIcon)
export const DocumentIcon: React.FC<{ className?: string; size?: number }> = ({ className = "", size = 24 }) => {
    return <WritingIcon className={className} size={size} />;
};

// Paper icon (same as document)
export const PaperIcon: React.FC<{ className?: string; size?: number }> = ({ className = "", size = 24 }) => {
    return <WritingIcon className={className} size={size} />;
};

// Mail icon from HackerNoon Pixel Icon Library
export const MailIcon: React.FC<{ className?: string; size?: number }> = ({ className = "", size = 24 }) => {
    return (
        <svg
            id="Envelope"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="currentColor"
            className={className}
            style={{ display: 'inline-block', verticalAlign: 'middle' }}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="m21,5v-1H3v1H1v14h1v1h20v-1h1V5h-2Zm-11,7v-1h-1v-1h-1v-1h-1v-1h-1v-1h-1v-1h14v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-2v-1h-1Zm-6-5v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h2v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v11H3V7h1Z" fill="currentColor"/>
        </svg>
    );
};

// Location icon from HackerNoon Pixel Icon Library
export const LocationIcon: React.FC<{ className?: string; size?: number }> = ({ className = "", size = 24 }) => {
    return (
        <svg
            id="Location_Pin"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="currentColor"
            className={className}
            style={{ display: 'inline-block', verticalAlign: 'middle' }}
            xmlns="http://www.w3.org/2000/svg"
        >
            <polygon points="15 8 15 10 14 10 14 11 13 11 13 12 11 12 11 11 10 11 10 10 9 10 9 8 10 8 10 7 11 7 11 6 13 6 13 7 14 7 14 8 15 8"/>
            <path d="m19,6v-2h-1v-1h-1v-1h-2v-1h-6v1h-2v1h-1v1h-1v2h-1v6h1v2h1v1h1v2h1v1h1v2h1v1h1v2h2v-2h1v-1h1v-2h1v-1h1v-2h1v-1h1v-2h1v-6h-1Zm-2,6v2h-1v1h-1v2h-1v1h-1v2h-2v-2h-1v-1h-1v-2h-1v-1h-1v-2h-1v-6h1v-2h2v-1h6v1h2v2h1v6h-1Z"/>
        </svg>
    );
};
