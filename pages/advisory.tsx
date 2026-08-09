import React from "react";
import ContainerBlock from "../components/ContainerBlock";
import userData from "../constants/data";
import { event } from "../utils/analytics";
import { Section, SectionHeader, Action } from "../components/primitives";
import type { NextPage } from "next";

/**
 * DESIGN.md §11.1 — the commercial page.
 *
 * Deliberately short. Florian expects little inbound discovery, so this is a
 * page for someone who already knows who he is and wants to know whether a
 * conversation makes sense. It is not a funnel.
 *
 * Copy is written to the voice of the essays in posts/: first person, plain,
 * explanatory, no sales register.
 */

const AREAS: { title: string; body: string }[] = [
    {
        title: "Open banking and data access",
        body: "What 1033 actually requires, and what it costs to comply well rather than minimally. Consent, permissioning, API standards, and the gap between shipping an endpoint and running a data sharing program.",
    },
    {
        title: "Payments and tokenization",
        body: "Account tokenization, account verification, and pay by bank. I owned a tokenization product and spent a few years on the industry side of it (FDX, Nacha), so I know the build and the politics of getting a scheme adopted.",
    },
    {
        title: "Network businesses",
        body: "Businesses that only work if both sides show up: institutions on one side, fintechs on the other. Participant incentives, governance, standards, and the chicken and egg problem of the first two years.",
    },
    {
        title: "B2B product strategy",
        body: "Pricing and packaging, roadmap and prioritization. Also the product function itself: hiring product managers, growing them, and putting a discovery process in place that people actually follow.",
    },
];

const SHAPES: { title: string; body: string }[] = [
    {
        title: "A defined project",
        body: "A readiness review, a strategy, a market assessment. Scoped up front, with something concrete at the end.",
    },
    {
        title: "An ongoing retainer",
        body: "Regular calls, a second read on work in progress, and questions as they come up. Useful when the problem is continuous rather than a one off.",
    },
    {
        title: "Advisory board or equity advisor",
        body: "A longer horizon and a lighter touch, usually with a founding team.",
    },
];

const Advisory: NextPage = () => (
    <ContainerBlock
        customMeta={{
            title: "Advisory - Florian Wahl",
            description:
                "Florian Wahl advises banks, credit unions, fintechs, and investors on open banking, data access, payments, and B2B product strategy.",
        }}
    >
        <Section labelledBy="advisory-heading" ruled={false}>
            <SectionHeader
                kicker="Advisory"
                title="Working together"
                id="advisory-heading"
                as="h1"
            />

            <div className="max-w-prose font-prose text-prose text-ink-muted">
                <p className="mb-5">
                    I spent over four years at Akoya, where I owned product strategy and
                    commercialization and helped grow the data access network from nothing to
                    billions of requests per month and seven figures in revenue. Before that, five
                    years in consulting with banks on open banking and digital transformation.
                </p>
                <p className="mb-5">
                    I take on a small amount of advisory work. If you&apos;re working on something
                    here and want a second opinion, send me a note.
                </p>
            </div>
        </Section>

        <Section labelledBy="areas-heading">
            <SectionHeader kicker="What I help with" id="areas-heading" />
            <div>
                {AREAS.map(({ title, body }) => (
                    <article key={title} className="border-b border-rule py-5">
                        <h3 className="mb-1.5 text-body font-medium text-ink">{title}</h3>
                        <p className="max-w-prose font-prose text-prose text-ink-muted">{body}</p>
                    </article>
                ))}
            </div>
            <p className="mt-6 max-w-prose font-prose text-prose text-ink-muted">
                Most of my work has been with banks, credit unions, fintechs, and data aggregators.
            </p>
        </Section>

        <Section labelledBy="shapes-heading">
            <SectionHeader kicker="How it works" id="shapes-heading" />
            <div>
                {SHAPES.map(({ title, body }) => (
                    <article key={title} className="border-b border-rule py-5">
                        <h3 className="mb-1.5 text-body font-medium text-ink">{title}</h3>
                        <p className="max-w-prose font-prose text-prose text-ink-muted">{body}</p>
                    </article>
                ))}
            </div>
        </Section>

        <Section labelledBy="contact-heading">
            <SectionHeader kicker="Getting in touch" id="contact-heading" />
            <p className="mb-8 max-w-prose font-prose text-prose text-ink-muted">
                Email is the fastest way to reach me. A sentence or two about what you are working
                on is plenty to start.
            </p>
            <Action
                href={`mailto:${userData.email}`}
                external
                onClick={() => event("cta_click", { label: "advisory_email" })}
            >
                Start a conversation
            </Action>
        </Section>
    </ContainerBlock>
);

export default Advisory;
