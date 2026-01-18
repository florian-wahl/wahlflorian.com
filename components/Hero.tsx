import React, { useState, useEffect } from "react";
import OptimizedImage from "./OptimizedImage";
import userData from "../constants/data";
import Link from "next/link";

const Hero: React.FC = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(true);
        }, 200);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="bg-[#0a0a0a] min-h-screen flex flex-col justify-center items-center px-4 py-20 relative overflow-hidden">
            {/* Pixel background pattern */}
            <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
            }}></div>

            <div className="max-w-6xl mx-auto w-full relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-12">
                    {/* Text container */}
                    <div className="w-full md:w-1/2 text-center md:text-left">
                        <div className="mb-6">
                            <span className="inline-block px-4 py-2 bg-yellow-400 text-black font-bold font-mono text-sm pixel-border">
                                EXPERT MODE
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold text-white mb-6 pixel-text">
                            {userData.name.toUpperCase()}
                        </h1>
                        <p className="text-2xl md:text-3xl text-yellow-400 font-mono mb-8">
                            {userData.designation.toUpperCase()}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-8">
                            {userData.rainbowContent.map((content, index) => (
                                <div
                                    key={index}
                                    className="inline-block"
                                    style={{
                                        animation: show ? `fadeInUp 0.5s ease ${index * 0.1}s both` : 'none'
                                    }}
                                >
                                    <span className="px-3 py-2 sm:px-4 bg-gray-900 border-2 border-white text-white font-mono text-sm sm:text-lg pixel-border">
                                        {content.toUpperCase()}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                            <Link
                                href="/experience"
                                className="px-6 py-3 bg-yellow-400 text-black font-bold font-mono hover:bg-yellow-300 transition-colors pixel-button"
                            >
                                VIEW EXPERIENCE →
                            </Link>
                            <Link
                                href="/contact"
                                className="px-6 py-3 bg-white text-black font-bold font-mono hover:bg-gray-200 transition-colors pixel-button"
                            >
                                CONTACT ME →
                            </Link>
                        </div>
                    </div>

                    {/* Image container */}
                    <div className="w-full md:w-1/2 flex justify-center">
                        <div className="relative">
                            <div className="pixel-border bg-gray-900 p-4">
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
                                <span className="text-yellow-400 font-mono text-sm">▶</span>
                                <p className="font-mono text-sm text-white">PLAYER 1</p>
                            </div>
                        </div>
                    </div>
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
            `}</style>
        </div>
    );
};

export default Hero; 