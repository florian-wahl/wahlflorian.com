import React from "react";
import userData from "../constants/data";

const AboutMe: React.FC = () => {
    return (
        <section className="bg-white dark:bg-gray-800">
            <div className="max-w-6xl mx-auto h-48 bg-white dark:bg-gray-800">
                <h1 className=" text-5xl md:text-9xl font-bold py-20 text-center md:text-left">
                    About Me
                </h1>
            </div>
            <div className="bg-[#F1F1F1] -mt-10 dark:bg-gray-900">
                <div className="text-container max-w-6xl mx-auto pt-20">
                    <p
                        className="leading-loose text-2xl md:text-4xl font-semibold  mx-4"
                        style={{ lineHeight: "3rem" }}
                    >
                        {userData.about.title}.
                    </p>
                </div>
            </div>

            <div className="bg-[#F1F1F1] dark:bg-gray-900 px-4">
                <div className="pt-20 grid grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto gap-y-20 gap-x-20">
                    {/* Social Buttons */}
                    <div className="inline-flex flex-col">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                                Contact
                            </h2>
                            <p className="text-lg text-gray-500 mt-4 dark:text-gray-300">
                                For any inquiry, please contact me {" "}
                                <a
                                    href={`mailto:${userData.email}`}
                                    className="text-gray-800 border-b-2 border-gray-800 dark:border-gray-300 font-bold dark:text-gray-300"
                                >
                                    via e-mail
                                </a>{" "}
                                and I'll get back to you.
                            </p>
                        </div>
                        <div className="mt-8">
                            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                                Curriculum Vitae
                            </h2>
                            <p className="text-lg text-gray-500 mt-4 dark:text-gray-300">
                                You can find my latest CV{" "}
                                <a
                                    href={userData.resumeUrl}
                                    target="__blank"
                                    className="text-gray-800 border-b-2 border-gray-800 dark:border-gray-300 font-bold dark:text-gray-300"
                                >
                                    here
                                </a>.
                            </p>
                        </div>
                        {/* Social Links */}
                        <h2 className="text-xl font-semibold text-gray-700 mt-8 dark:text-gray-200">
                            Social Links
                        </h2>
                        <div className="mt-4 ml-4">
                            <div className="flex flex-row justify-start items-center">
                                <a
                                    href={userData.socialLinks.linkedin}
                                    className="flex flex-row items-center space-x-4 group"
                                >
                                    <div className="my-4">&rarr;</div>
                                    <div className="text-lg text-gray-500 font-mono relative overflow-hidden dark:text-gray-300">
                                        <div className="absolute h-0.5 w-full bg-gray-400 bottom-0 transform -translate-x-24 group-hover:translate-x-0 transition duration-300"></div>
                                        LinkedIn
                                    </div>
                                </a>
                            </div>
                            <div className="flex flex-row justify-start items-center">
                                <a
                                    href={userData.socialLinks.instagram}
                                    className="flex flex-row items-center space-x-4 group"
                                >
                                    <div className="my-4">&rarr;</div>
                                    <div className="text-lg text-gray-500 font-mono relative overflow-hidden dark:text-gray-300">
                                        <div className="absolute h-0.5 w-full bg-gray-400 bottom-0 transform -translate-x-28 group-hover:translate-x-0 transition duration-300"></div>
                                        Instagram
                                    </div>
                                </a>
                            </div>
                            <div className="flex flex-row justify-start items-center">
                                <a
                                    href={userData.socialLinks.twitter}
                                    className="flex flex-row items-center space-x-4 group"
                                >
                                    <div className="my-4">&rarr;</div>
                                    <div className="text-lg text-gray-500 font-mono relative overflow-hidden dark:text-gray-300">
                                        <div className="absolute h-0.5 w-full bg-gray-400 bottom-0 transform -translate-x-24 group-hover:translate-x-0 transition duration-300"></div>
                                        Twitter
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                    {/* Text area */}
                    <div className="col-span-1 md:col-span-2">
                        {userData.about.description?.map((desc, idx) => (
                            <p
                                key={idx}
                                className="text-xl text-gray-700 mb-4 dark:text-gray-300 "
                            >
                                {desc}
                            </p>
                        ))}

                        <h2 className="text-xl font-semibold text-gray-700 mt-8 dark:text-gray-200">
                            Public Speaking
                        </h2>
                        <div className="text-lg text-gray-500 mt-4 dark:text-gray-300" style={{ paddingLeft: "1rem" }}>
                            <ul style={{ listStyle: "square" }}>
                                {userData.about.publicSpeaking?.map((desc, idx) => (
                                    <li
                                        key={idx}
                                        className="text-xl text-gray-700 mb-4 dark:text-gray-300 "
                                    >
                                        <i>{desc[0]}</i>, {desc[1]}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <h2 className="text-xl font-semibold text-gray-700 mt-8 dark:text-gray-200">
                            Certifications
                        </h2>
                        <div className="text-lg text-gray-500 mt-4 dark:text-gray-300" style={{ paddingLeft: "1rem" }}>
                            {userData.about.certifications?.map((cert, idx) => (
                                <p key={idx} className="text-xl text-gray-700 mb-4 dark:text-gray-300 ">
                                    {cert}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutMe; 