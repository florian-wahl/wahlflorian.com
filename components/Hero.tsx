import React, { useState, useEffect } from "react";
import { RoughNotationGroup } from "react-rough-notation";
import { RainbowHighlight } from "./RainbowHighlight";
import userData from "../constants/data";

const Hero: React.FC = () => {
    const colors: string[] = ["#F59E0B", "#84CC16", "#10B981", "#3B82F6"];
    const [show, setShow] = useState(false);

    useEffect(() => {
        // Add a slight delay before starting animations
        const timer = setTimeout(() => {
            setShow(true);
        }, 400);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex flex-col-reverse md:flex-row justify-center items-center overflow-hidden px-4 md:px-0">
            {/* Text container */}
            <div className="w-full md:w-1/2 text-center md:text-left lg:p-10">
                <RoughNotationGroup show={show}>
                    {userData.rainbowContent.map((content, index) => (
                        <RainbowHighlight
                            color={colors[index]}
                            key={index}
                            order={index + 1}
                        >
                            <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-gray-700 dark:text-gray-200 my-2">
                                {content}
                            </h2>
                        </RainbowHighlight>
                    ))}
                </RoughNotationGroup>
            </div>
            {/* Image container */}
            <div className="w-2/3 md:w-1/2 mb-8 md:mb-0 md:-mr-40 mt-10 md:mt-20">
                <div className="relative w-full max-w-md mx-auto">
                    <img
                        src={userData.avatarUrl}
                        alt="avatar"
                        className="heroimg shadow rounded-2xl w-full h-auto"
                        loading="eager"
                        style={{
                            maxWidth: '100%',
                            height: 'auto',
                            objectFit: 'cover',
                        }}
                    />
                    <div className="flex flex-row justify-start mt-4">
                        <div className="flex flex-row items-center space-x-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-arrow-90deg-up"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.854 1.146a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L4 2.707V12.5A2.5 2.5 0 0 0 6.5 15h8a.5.5 0 0 0 0-1h-8A1.5 1.5 0 0 1 5 12.5V2.707l3.146 3.147a.5.5 0 1 0 .708-.708l-4-4z"
                                />
                            </svg>
                            <p className="font-mono text-sm md:text-base">That's me</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero; 