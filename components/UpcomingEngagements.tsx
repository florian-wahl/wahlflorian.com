import React, { useMemo } from "react";
import userData from "../constants/data";
import { event } from "../utils/analytics";
import { Section, SectionHeader, IndexRow } from "./primitives";

/** "2026-04-15" -> "2026.04.15"; "2026-04" -> "2026.04". Tabular, sortable-looking. */
const formatUpcomingDate = (dateStr: string): string =>
    dateStr
        .split("-")
        .map((part, i) => (i === 0 ? part : part.padStart(2, "0")))
        .join(".");

const UpcomingEngagements: React.FC = () => {
    const engagements = useMemo(
        () => [...(userData.upcomingEngagements ?? [])].sort((a, b) => a.date.localeCompare(b.date)),
        []
    );

    if (engagements.length === 0) return null;

    return (
        <Section labelledBy="upcoming-heading">
            <SectionHeader kicker="Upcoming" id="upcoming-heading" />

            <div>
                {engagements.map((item, idx) => (
                    <IndexRow
                        key={`${item.title}-${idx}`}
                        date={formatUpcomingDate(item.date)}
                        title={item.title}
                        meta={item.location ? `${item.conference} · ${item.location}` : item.conference}
                        href={item.link}
                        external={Boolean(item.link)}
                        onClick={() =>
                            event("upcoming_engagement_click", {
                                title: item.title,
                                link: item.link ?? "",
                            })
                        }
                    />
                ))}
            </div>
        </Section>
    );
};

export default UpcomingEngagements;
