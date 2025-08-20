import React from "react";
import Link from "next/link";
import OptimizedImage from "./OptimizedImage";

const FeaturedArticles: React.FC = () => {
    return (
        <div className="bg-[#F1F1F1] -mt-40 dark:bg-gray-900">
            <div className="max-w-6xl mx-auto px-4">
                <header className="flex flex-col md:flex-row justify-between items-center pt-40 mx-2 md:mx-10 md:my-20 lg:my-0">
                    <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold py-10 md:py-20 text-center md:text-left">
                        Featured Articles
                    </h2>
                    <Link
                        href="/articles"
                        className="mb-10 md:mb-0 px-6 md:px-8 py-3 md:py-4 rounded-md bg-white shadow-lg text-lg md:text-xl font-semibold flex flex-row space-x-4 items-center dark:text-gray-700 hover:scale-105 transition-transform duration-200"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-arrow-up-right-square"
                            stroke="4"
                            strokeWidth="4"
                            viewBox="0 0 16 16"
                        >
                            <path
                                fillRule="evenodd"
                                d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm5.854 8.803a.5.5 0 1 1-.708-.707L9.243 6H6.475a.5.5 0 1 1 0-1h3.975a.5.5 0 0 1 .5.5v3.975a.5.5 0 1 1-1 0V6.707l-4.096 4.096z"
                            />
                        </svg>
                        <p>View all</p>
                    </Link>
                </header>

                {/* Grid starts here */}
                <div className="grid md:grid-cols-3 gap-4 md:gap-8 lg:-mt-8 pb-20 md:pb-40 mx-2 md:mx-0">
                    {/* Single card */}
                    <a
                        href="https://medium.com/@flwahl/a-framework-for-product-strategy-68ddabe8cb6"
                        className="w-full block col-span-3 shadow-lg md:shadow-2xl rounded-lg overflow-hidden"
                    >
                        <div className="relative overflow-hidden">
                            <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
                                <img
                                    src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*ywYLQMzS1NLVWYHB3B7sZA.jpeg"
                                    alt="A Framework for Product Strategy - Product management framework illustration"
                                    className="absolute inset-0 w-full h-full transform hover:scale-125 transition duration-2000 ease-out object-cover"
                                />
                            </div>
                            <h2 className="absolute top-4 md:top-10 left-4 md:left-10 text-gray-50 font-bold text-lg md:text-xl bg-red-500 rounded-md px-2 py-1 shadow-md">
                                A Framework for Product Strategy
                            </h2>
                        </div>
                    </a>
                    {/* Single card */}
                    <a
                        href="https://akoya.com/hs-search-results?term=Florian+Wahl&type=BLOG_POST&type=LISTING_PAGE"
                        className="w-full block col-span-3 sm:col-span-2 shadow-lg md:shadow-2xl rounded-lg overflow-hidden"
                    >
                        <div className="relative overflow-hidden">
                            <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
                                <img
                                    src="https://akoya.com/hubfs/Blog%20posts%20-%20SVGs/Instant%20ACH%20verification%20and%20meeting%20consumer%20expectations%20-%20Blog%20post.svg"
                                    alt="Akoya Blog Series - Financial technology and open banking articles"
                                    className="absolute inset-0 w-full h-full transform hover:scale-125 transition duration-2000 ease-out object-cover"
                                />
                            </div>
                            <h2 className="absolute top-4 md:top-10 left-4 md:left-10 text-gray-50 font-bold text-lg md:text-xl bg-red-500 rounded-md px-2 py-1 shadow-md">
                                Akoya - Blog Series
                            </h2>
                        </div>
                    </a>
                    {/* Single card */}
                    <a
                        href="https://bootcamp.uxdesign.cc/a-process-for-product-management-9e12af274fa"
                        className="w-full block col-span-3 sm:col-span-1 shadow-lg md:shadow-2xl rounded-lg overflow-hidden"
                    >
                        <div className="relative overflow-hidden">
                            <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
                                <img
                                    src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*yg7tmTyUqldSMY6ITNfsLQ.png"
                                    alt="A Process For Product Management - Product management workflow diagram"
                                    className="absolute inset-0 w-full h-full transform hover:scale-125 transition duration-2000 ease-out object-cover"
                                />
                            </div>
                            <h2 className="absolute top-4 md:top-10 left-4 md:left-10 text-gray-50 font-bold text-lg md:text-xl bg-red-500 rounded-md px-2 py-1 shadow-md max-w-[calc(100%-2rem)] md:max-w-60">
                                A Process For Product Management
                            </h2>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default FeaturedArticles; 