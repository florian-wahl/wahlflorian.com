import React, { useMemo } from "react";
import userData from "../constants/data";
import { event } from "../utils/analytics";

interface ExperienceCardProps {
    title: string;
    desc: string;
    startDate: string;
    endDate?: string | null;
    company: string;
    companyLink: string;
    isFirstInGroup?: boolean;
    isLastInGroup?: boolean;
}

// Format date for display (e.g., "2021-10" -> "Oct 2021")
const formatDisplayDate = (dateStr: string): string => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const parts = dateStr.split("-");
    if (parts.length >= 2) {
        const year = parts[0];
        const month = parseInt(parts[1], 10) - 1;
        if (month >= 0 && month < 12) {
            return `${monthNames[month]} ${year}`;
        }
    }
    return dateStr;
};

const ExperienceCard: React.FC<ExperienceCardProps> = ({ 
    title, 
    desc, 
    startDate,
    endDate,
    company, 
    companyLink, 
    isFirstInGroup,
    isLastInGroup 
}) => {
    // Format date range
    const formatDateRange = () => {
        const startDisplay = formatDisplayDate(startDate);
        
        if (!endDate) {
            // Current role
            return "Current";
        }
        
        const endDisplay = formatDisplayDate(endDate);
        return `${startDisplay} - ${endDisplay}`;
    };

    return (
        <div className="relative z-10">
            <div className="pixel-card bg-gray-50 dark:bg-gray-900 p-6 mx-4">
                <div className="flex flex-col mb-4">
                    <div className="flex items-start justify-between gap-4 mb-2">
                        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-black dark:text-white font-mono flex-1">
                            {title.toUpperCase()}
                        </h2>
                        <span className="text-gray-600 dark:text-gray-400 font-mono text-xs sm:text-sm whitespace-nowrap">
                            {formatDateRange()}
                        </span>
                    </div>
                    <a
                        href={companyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => event('company_click', { company })}
                        className="text-yellow-600 dark:text-yellow-400 font-mono text-sm hover:text-yellow-500 dark:hover:text-yellow-300 transition-colors"
                    >
                        {company.toUpperCase()} →
                    </a>
                </div>
                <p className="text-gray-700 dark:text-gray-300 font-mono text-sm sm:text-base leading-relaxed">{desc}</p>
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
        <section className="bg-white dark:bg-[#0a0a0a] py-20 transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-4">
                <div className="mb-16">
                    <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-black dark:text-white mb-4 pixel-text">
                        EXPERIENCE
                    </h1>
                    <p className="text-xl text-gray-700 dark:text-gray-300 font-mono">
                        Career Timeline
                    </p>
                </div>
                
                <div className="grid grid-cols-1 max-w-4xl mx-auto pt-10 relative">
                    {/* Timeline line - only show on desktop */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-black dark:bg-white transform md:-translate-x-1/2 hidden md:block"></div>
                    
                    {/* Grouped Experience cards */}
                    {groupedExperiences.map((group, groupIdx) => (
                        <React.Fragment key={groupIdx}>
                            {/* Company Header */}
                            <div className="relative mb-6">
                                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-yellow-500 dark:bg-yellow-400 border-4 border-black transform md:-translate-x-1/2 -translate-y-1/2 top-1/2 z-20"></div>
                                <div className="ml-10 sm:ml-12 md:ml-0 md:pl-1/2 md:pr-1/2">
                                    <a
                                        href={group.companyLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => event('company_click', { company: group.company })}
                                        className="inline-block pixel-card bg-gray-200 dark:bg-gray-800 border-yellow-500 dark:border-yellow-400 p-4 hover:border-yellow-400 dark:hover:border-yellow-300 transition-colors"
                                    >
                                        <h3 className="text-xl md:text-2xl font-bold text-yellow-600 dark:text-yellow-400 font-mono">
                                            {group.company.toUpperCase()}
                                        </h3>
                                    </a>
                                </div>
                            </div>
                            
                            {/* Roles at this company */}
                            {group.experiences.map((exp, roleIdx) => {
                                return (
                                    <div 
                                        key={roleIdx}
                                        className={`relative mb-6 md:mb-8 ${roleIdx % 2 === 0 ? 'md:pr-1/2 md:pr-8' : 'md:pl-1/2 md:pl-8 md:text-right'}`}
                                    >
                                        <ExperienceCard
                                            title={exp.title}
                                            desc={exp.desc}
                                            startDate={exp.startDate}
                                            endDate={exp.endDate}
                                            company={exp.company}
                                            companyLink={exp.companyLink}
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