import React, { useMemo } from "react";
import userData from "../constants/data";

interface ExperienceCardProps {
    title: string;
    desc: string;
    year: string;
    company: string;
    companyLink: string;
    nextYear?: string;
    isFirstInGroup?: boolean;
    isLastInGroup?: boolean;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ 
    title, 
    desc, 
    year, 
    company, 
    companyLink, 
    nextYear,
    isFirstInGroup,
    isLastInGroup 
}) => {
    // Format date range: nextYear is when this role ended (start date of previous role)
    const formatDateRange = () => {
        if (year === "Current") {
            return "Current";
        }
        
        // Extract month abbreviation and year from start date
        const startMonth = year.split(" ")[0].substring(0, 3);
        const startYear = year.split(" ")[1];
        
        if (nextYear && nextYear !== "Current") {
            // Show date range: "Oct 2021 - Feb 2022"
            const endMonth = nextYear.split(" ")[0].substring(0, 3);
            const endYear = nextYear.split(" ")[1];
            return `${startMonth} ${startYear} - ${endMonth} ${endYear}`;
        }
        
        // If no end date (oldest role), just show start date
        return `${startMonth} ${startYear}`;
    };

    return (
        <div className="relative z-10">
            <div className="pixel-card bg-gray-900 p-6 mx-4">
                <div className="flex flex-col mb-4">
                    <div className="flex items-start justify-between gap-4 mb-2">
                        <h2 className="text-xl md:text-2xl font-bold text-white font-mono flex-1">
                            {title.toUpperCase()}
                        </h2>
                        <span className="text-gray-400 font-mono text-xs whitespace-nowrap">
                            {formatDateRange()}
                        </span>
                    </div>
                    <a 
                        href={companyLink} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-yellow-400 font-mono text-sm hover:text-yellow-300 transition-colors"
                    >
                        {company.toUpperCase()} →
                    </a>
                </div>
                <p className="text-gray-300 font-mono text-sm leading-relaxed">{desc}</p>
            </div>
        </div>
    );
};

const Experience: React.FC = () => {
    // Group experiences by company
    const groupedExperiences = useMemo(() => {
        const groups: { company: string; companyLink: string; experiences: typeof userData.experience }[] = [];
        
        userData.experience.forEach((exp, idx) => {
            const lastGroup = groups[groups.length - 1];
            
            // If same company as previous, add to existing group
            if (lastGroup && lastGroup.company === exp.company) {
                lastGroup.experiences.push(exp);
            } else {
                // Create new group
                groups.push({
                    company: exp.company,
                    companyLink: exp.companyLink,
                    experiences: [exp]
                });
            }
        });
        
        return groups;
    }, []);

    return (
        <section className="bg-[#0a0a0a] dark:bg-gray-900 py-20">
            <div className="max-w-6xl mx-auto px-4">
                <div className="mb-16">
                    <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-white dark:text-gray-100 mb-4 pixel-text">
                        EXPERIENCE
                    </h1>
                    <p className="text-xl text-gray-300 dark:text-gray-400 font-mono">
                        Career Timeline
                    </p>
                </div>
                
                <div className="grid grid-cols-1 max-w-4xl mx-auto pt-10 relative">
                    {/* Timeline line - only show on desktop */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-white transform md:-translate-x-1/2 hidden md:block"></div>
                    
                    {/* Grouped Experience cards */}
                    {groupedExperiences.map((group, groupIdx) => (
                        <React.Fragment key={groupIdx}>
                            {/* Company Header */}
                            <div className="relative mb-6">
                                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-yellow-400 border-4 border-black transform md:-translate-x-1/2 -translate-y-1/2 top-1/2 z-20"></div>
                                <div className="ml-12 md:ml-0 md:pl-1/2 md:pr-1/2">
                                    <a
                                        href={group.companyLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block pixel-card bg-gray-800 border-yellow-400 p-4 hover:border-yellow-300 transition-colors"
                                    >
                                        <h3 className="text-xl md:text-2xl font-bold text-yellow-400 font-mono">
                                            {group.company.toUpperCase()}
                                        </h3>
                                    </a>
                                </div>
                            </div>
                            
                            {/* Roles at this company */}
                            {group.experiences.map((exp, roleIdx) => {
                                // Find the previous role in the entire experience list to get end date
                                const currentIndex = userData.experience.findIndex(e => 
                                    e.title === exp.title && e.company === exp.company && e.year === exp.year
                                );
                                const previousExp = currentIndex > 0 ? userData.experience[currentIndex - 1] : null;
                                const endDate = previousExp ? previousExp.year : null;
                                
                                return (
                                    <div 
                                        key={roleIdx}
                                        className={`relative mb-6 md:mb-8 ${roleIdx % 2 === 0 ? 'md:pr-1/2 md:pr-8' : 'md:pl-1/2 md:pl-8 md:text-right'}`}
                                    >
                                        {/* Timeline dot */}
                                        <div className="absolute left-8 md:left-1/2 w-3 h-3 bg-white border-2 border-black transform md:-translate-x-1/2 -translate-y-1/2 top-1/2 z-20"></div>
                                        
                                        <ExperienceCard
                                            title={exp.title}
                                            desc={exp.desc}
                                            year={exp.year}
                                            company={exp.company}
                                            companyLink={exp.companyLink}
                                            nextYear={endDate || undefined}
                                            isFirstInGroup={roleIdx === 0}
                                            isLastInGroup={roleIdx === group.experiences.length - 1}
                                        />
                                    </div>
                                );
                            })}
                            
                            {/* Spacing between company groups */}
                            {groupIdx < groupedExperiences.length - 1 && (
                                <div className="mb-8"></div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience; 