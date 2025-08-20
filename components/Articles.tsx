import React from "react";
import userData from "../constants/data";

interface ProjectCardProps {
    title: string;
    link: string;
    imgUrl: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, link, imgUrl }) => {
    return (
        <a href={link} className="w-full block shadow-2xl">
            <div className="relative overflow-hidden">
                <div className="h-72 relative">
                    <img
                        src={imgUrl}
                        alt={`${title} - Article thumbnail`}
                        className="absolute inset-0 w-full h-full transform hover:scale-125 transition duration-2000 ease-out object-cover"
                    />
                </div>
                <h2 className="absolute top-10 left-10 text-gray-50 font-bold text-xl bg-gray-800 rounded-md px-2 max-w-md">
                    {title}
                </h2>
            </div>
        </a>
    );
};

const Articles: React.FC = () => {
    return (
        <section className="bg-white dark:bg-gray-800">
            <div className="max-w-6xl mx-auto h-48 bg-white dark:bg-gray-800">
                <h1 className="text-5xl md:text-9xl font-bold py-20 text-center md:text-left">
                    Articles
                </h1>
            </div>
            {/* Grid starts here */}
            <div className="bg-[#F1F1F1] -mt-10 dark:bg-gray-900">
                <div className="max-w-6xl mx-auto h-16">
                    <h2 className=" text-2xl md:text-5xl font-bold py-20 text-center md:text-left">
                        Work-related Articles
                    </h2>
                </div>

                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 py-20">
                    {userData.workArticles.map((proj, idx) => (
                        <ProjectCard
                            key={idx}
                            title={proj.title}
                            link={proj.link}
                            imgUrl={proj.imgUrl}
                        />
                    ))}
                </div>

                <div className="max-w-6xl mx-auto h-16">
                    <h2 className=" text-2xl md:text-5xl font-bold  text-center md:text-left">
                        Personal Articles
                    </h2>
                </div>

                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 pb-40">
                    {userData.personalArticles.map((proj, idx) => (
                        <ProjectCard
                            key={idx}
                            title={proj.title}
                            link={proj.link}
                            imgUrl={proj.imgUrl}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Articles; 