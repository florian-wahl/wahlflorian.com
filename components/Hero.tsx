import React from "react";
import OptimizedImage from "./OptimizedImage";
import userData from "../constants/data";
import { event } from "../utils/analytics";
import { Container, Kicker, Action } from "./primitives";
import { LocationIcon } from "./Icons";

/**
 * DESIGN.md §11.3 — hero, then bio.
 *
 * The typewriter effect, staggered fade-in, and infinite tagline pulse are
 * removed rather than tuned: §5 permits state-change motion only.
 */
const Hero: React.FC = () => (
    // No border-b: the following Section carries border-t, and stacking the two
    // renders a 2px rule. Separation is one hairline, never two. §4
    <header>
        <Container className="py-14 sm:py-20">
            <div className="grid gap-12 md:grid-cols-[minmax(0,1.55fr)_minmax(0,0.85fr)] md:items-start md:gap-14">
                <div>
                    <Kicker className="mb-6">{userData.designation}</Kicker>

                    <h1 className="mb-6 max-w-[14ch] font-display text-display-xl font-bold text-ink">
                        {userData.name}
                    </h1>

                    {/* Was a row of animated pixel badges. Now one quiet line. */}
                    <p className="mb-8 text-body text-ink-muted">
                        {userData.rainbowContent.map((s) => s.replace(/\.$/, "")).join(" · ")}
                    </p>

                    <div className="flex flex-wrap gap-3">
                        <Action
                            href="/contact"
                            onClick={() => event("cta_click", { label: "start_a_conversation" })}
                        >
                            Start a conversation
                        </Action>
                        <Action
                            href="/experience"
                            variant="ghost"
                            onClick={() => event("cta_click", { label: "view_experience" })}
                        >
                            View experience
                        </Action>
                    </div>

                    {/* Bio sits in the left column, not below the grid. Below, it
                        orphaned ~140px of whitespace under the taller image column. */}
                    <p className="mt-10 font-prose text-prose text-ink-muted">{userData.bio}</p>
                </div>

                <div className="order-first md:order-none">
                    <OptimizedImage
                        src={userData.avatarUrl}
                        alt={`${userData.name}, ${userData.designation}`}
                        width={400}
                        height={400}
                        className="w-full max-w-[280px] rounded-lg border border-rule md:max-w-none"
                        priority
                        style={{ height: "auto", objectFit: "cover" }}
                    />
                    <p className="mt-4 flex items-center gap-2 text-meta text-ink-muted">
                        <LocationIcon size={14} />
                        {userData.address}
                    </p>
                </div>
            </div>
        </Container>
    </header>
);

export default Hero;
