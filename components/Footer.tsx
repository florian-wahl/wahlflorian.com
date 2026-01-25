import React from "react";
import userData from "../constants/data";
import SocialLinks from "./SocialLinks";

const Footer: React.FC = () => {
    return (
        <div className="bg-white dark:bg-[#0a0a0a] border-t-4 border-black dark:border-white transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-4 py-10 md:py-12">
                <div className="h-1 w-full bg-black dark:bg-white mb-8"></div>
                <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between md:items-center">
                    <div>
                        <p className="text-black dark:text-white font-mono text-sm">
                            &copy; {new Date().getFullYear()} FLORIAN WAHL. ALL RIGHTS RESERVED.
                        </p>
                    </div>
                    <SocialLinks iconSize={16} buttonSize="md" />
                </div>
            </div>
        </div>
    );
};

export default Footer;
