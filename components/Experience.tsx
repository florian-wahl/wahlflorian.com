import React, { useMemo } from "react";
import userData from "../constants/data";
import { event } from "../utils/analytics";
import { Section, SectionHeader } from "./primitives";
import { ExternalIcon } from "./Icons";

/** "2021-10" -> "2021.10" — tabular, aligns down the column. */
const formatDate = (dateStr: string): string => {
    const [year, month] = dateStr.split("-");
    return month ? `${year}.${month.padStart(2, "0")}` : year;
};

const formatRange = (startDate: string, endDate?: string | null): string =>
    endDate ? `${formatDate(startDate)} – ${formatDate(endDate)}` : `${formatDate(startDate)} – now`;

interface ExperienceProps {
    /** `h1` on /experience, `h2` when embedded on the home page. */
    as?: "h1" | "h2";
}

const Experience: React.FC<ExperienceProps> = ({ as = "h2" }) => {
    const groups = useMemo(() => {
        const out: {
            company: string;
            companyLink: string;
            experiences: typeof userData.experience;
        }[] = [];

        userData.experience.forEach((exp) => {
            const last = out[out.length - 1];
            if (last && last.company === exp.company) {
                last.experiences.push(exp);
            } else {
                out.push({ company: exp.company, companyLink: exp.companyLink, experiences: [exp] });
            }
        });

        return out;
    }, []);

    return (
        <Section labelledBy="experience-heading">
            <SectionHeader kicker="Experience" id="experience-heading" as={as} />

            <div className="flex flex-col gap-12">
                {groups.map((group) => (
                    <div key={group.company}>
                        <a
                            href={group.companyLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => event("company_click", { company: group.company })}
                            className="mb-1 inline-flex items-center gap-1.5 font-display text-display-s font-bold text-ink transition-colors duration-120 ease-system hover:text-accent"
                        >
                            {group.company}
                            <ExternalIcon size={13} />
                        </a>

                        <div className="mt-3">
                            {group.experiences.map((exp) => (
                                <article
                                    key={`${exp.title}-${exp.startDate}`}
                                    className="border-t border-rule py-5"
                                >
                                    <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                                        <h3 className="text-body font-medium text-ink">{exp.title}</h3>
                                        <span className="shrink-0 text-meta tabular-nums text-ink-muted">
                                            {formatRange(exp.startDate, exp.endDate)}
                                        </span>
                                    </div>
                                    <p className="max-w-prose font-prose text-prose text-ink-muted">
                                        {exp.desc}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
};

export default Experience;
