import React from "react";
import Link from "next/link";
import { ArrowRightIcon, ExternalIcon } from "./Icons";

/**
 * Shared primitives for the design system. DESIGN.md §§3–7.
 *
 * These exist so the accent-usage rule (§2.4) and the separation language (§4)
 * are enforced in one place rather than re-decided per component.
 */

/* ---------- Kicker ---------- */

/**
 * Small uppercase section marker: a short accent tick, the label in accent, then
 * a hairline running to the edge.
 *
 * The tick and the accent label are the system's signature motif — they give
 * every section the same copper marker without the accent ever becoming a fill
 * or a decoration. See DESIGN.md §2.4.
 *
 * `as` exists because a kicker is often the only heading a section has; it must
 * be able to render as a real `h2` so the document outline isn't broken.
 */
export const Kicker: React.FC<{
    children: React.ReactNode;
    className?: string;
    as?: "p" | "h1" | "h2";
    id?: string;
}> = ({ children, className = "", as = "p", id }) => {
    const Tag = as;
    return (
        <Tag
            id={id}
            className={`flex items-center gap-3 text-label-s font-medium uppercase text-accent ${className}`}
        >
            <span className="h-px w-4 shrink-0 bg-accent" aria-hidden="true" />
            {children}
            <span className="h-px flex-1 bg-rule" aria-hidden="true" />
        </Tag>
    );
};

/* ---------- Section + page headings ---------- */

export const SectionHeader: React.FC<{
    kicker: string;
    title?: string;
    id?: string;
    as?: "h1" | "h2";
    className?: string;
}> = ({ kicker, title, id, as = "h2", className = "" }) => {
    const Heading = as;
    return (
        <div className={`mb-10 ${className}`}>
            {title ? (
                <>
                    <Kicker className="mb-4">{kicker}</Kicker>
                    <Heading id={id} className="font-display text-display-l font-bold text-ink">
                        {title}
                    </Heading>
                </>
            ) : (
                // No title: the kicker *is* the heading, so it renders as one and
                // honours `as`. Hardcoding h2 here left /experience with no h1 at
                // all, and rendering it as a <p> left the outline as h1 → h3.
                <Kicker as={as} id={id}>
                    {kicker}
                </Kicker>
            )}
        </div>
    );
};

/* ---------- Buttons ---------- */

type ButtonVariant = "primary" | "ghost";

const buttonBase =
    "inline-flex items-center gap-2 rounded px-5 py-2.5 text-body font-medium transition-colors duration-120 ease-system";

const buttonVariant: Record<ButtonVariant, string> = {
    // The one permitted accent fill. §2.4
    primary: "border border-accent bg-accent text-on-accent hover:border-accent-hover hover:bg-accent-hover",
    // Ghost resolves to accent on hover — the affordance is the accent, not a fill.
    ghost: "border border-interactive text-ink hover:border-accent hover:text-accent",
};

interface ActionProps {
    href: string;
    children: React.ReactNode;
    variant?: ButtonVariant;
    external?: boolean;
    onClick?: () => void;
    className?: string;
}

/** Primary/secondary action. Renders next/link internally, `a` externally. */
export const Action: React.FC<ActionProps> = ({
    href,
    children,
    variant = "primary",
    external = false,
    onClick,
    className = "",
}) => {
    const cls = `${buttonBase} ${buttonVariant[variant]} ${className}`;
    const inner = (
        <>
            {children}
            {external ? (
                <ExternalIcon size={13} className="shrink-0" />
            ) : (
                <ArrowRightIcon size={14} className="shrink-0" />
            )}
        </>
    );

    if (external) {
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" className={cls} onClick={onClick}>
                {inner}
            </a>
        );
    }
    return (
        <Link href={href} className={cls} onClick={onClick}>
            {inner}
        </Link>
    );
};

/* ---------- Index row ---------- */

export interface IndexRowProps {
    /** Pre-formatted, tabular. e.g. "2026.04" */
    date?: string;
    title: string;
    /** Venue, publisher, or company. */
    meta?: string;
    href?: string;
    external?: boolean;
    onClick?: () => void;
    /** Type label — replaces the decorative card icons the old design used. */
    kind?: string;
}

/**
 * The one list row used by speaking, writing, and experience indexes.
 * A 1px rule, never a card. Dates are tabular and fixed-width so they align
 * down the column without a table.
 */
export const IndexRow: React.FC<IndexRowProps> = ({
    date,
    title,
    meta,
    href,
    external,
    onClick,
    kind,
}) => {
    const body = (
        <div className="flex flex-col gap-1 border-b border-rule py-3.5 sm:flex-row sm:items-baseline sm:gap-6">
            {date && (
                <span className="shrink-0 text-meta tabular-nums text-ink-muted sm:w-[5.5rem]">
                    {date}
                </span>
            )}
            <span className="min-w-0 flex-1 text-body-s font-medium text-ink">
                {title}
                {href && external && (
                    <ExternalIcon
                        size={12}
                        className="ml-1.5 inline-block shrink-0 align-baseline text-ink-muted"
                    />
                )}
            </span>
            {(meta || kind) && (
                <span className="shrink-0 text-meta text-ink-muted sm:text-right">
                    {meta || kind}
                </span>
            )}
        </div>
    );

    if (!href) return body;

    const cls = "block transition-colors duration-120 ease-system hover:text-accent";

    return external ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls} onClick={onClick}>
            {body}
        </a>
    ) : (
        <Link href={href} className={cls} onClick={onClick}>
            {body}
        </Link>
    );
};

/* ---------- Page shell ---------- */

/** Consistent page gutter and max width for every route. */
export const Container: React.FC<{ children: React.ReactNode; className?: string }> = ({
    children,
    className = "",
}) => <div className={`mx-auto w-full max-w-5xl px-6 sm:px-8 ${className}`}>{children}</div>;

/** Standard vertical rhythm for a page section, with a top hairline. */
export const Section: React.FC<{
    children: React.ReactNode;
    className?: string;
    labelledBy?: string;
    ruled?: boolean;
}> = ({ children, className = "", labelledBy, ruled = true }) => (
    <section
        aria-labelledby={labelledBy}
        className={`${ruled ? "border-t border-rule" : ""} py-14 sm:py-20 ${className}`}
    >
        <Container>{children}</Container>
    </section>
);
