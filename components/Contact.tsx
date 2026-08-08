import React from "react";
import userData from "../constants/data";
import { MailIcon, LocationIcon } from "./Icons";
import SocialLinks from "./SocialLinks";
import { event } from "../utils/analytics";
import { Section, SectionHeader, Action } from "./primitives";

const Contact: React.FC = () => (
    <Section labelledBy="contact-heading" ruled={false}>
        <SectionHeader kicker="Contact" title="Start a conversation" id="contact-heading" as="h1" />

        {/* Existing copy, kept verbatim — content is out of scope this iteration (§12). */}
        <p className="mb-12 max-w-prose font-prose text-prose text-ink-muted">
            Ready to collaborate? Send me a message and I&apos;ll get back to you.
        </p>

        <div className="grid gap-12 sm:grid-cols-2">
            <div>
                <p className="mb-5 text-label-s uppercase text-ink-muted">Direct</p>

                <div className="border-t border-rule">
                    <a
                        href={`mailto:${userData.email}`}
                        onClick={() => event("contact_click", { method: "email" })}
                        className="flex items-center gap-3 border-b border-rule py-4 text-body text-ink transition-colors duration-120 ease-system hover:text-accent"
                    >
                        <MailIcon size={17} className="shrink-0 text-ink-muted" />
                        {userData.email}
                    </a>
                    <p className="flex items-center gap-3 border-b border-rule py-4 text-body text-ink-muted">
                        <LocationIcon size={17} className="shrink-0" />
                        {userData.address}
                    </p>
                </div>

                <p className="mb-4 mt-8 text-label-s uppercase text-ink-muted">Elsewhere</p>
                <SocialLinks iconSize={18} />
            </div>

            <div>
                <p className="mb-5 text-label-s uppercase text-ink-muted">Also</p>
                <div className="flex flex-col items-start gap-3">
                    <Action
                        href={userData.resumeUrl}
                        variant="ghost"
                        external
                        onClick={() => event("resume_click", {})}
                    >
                        Résumé
                    </Action>
                    <Action
                        href="https://portfolio.wahlflorian.com/"
                        variant="ghost"
                        external
                        onClick={() => event("portfolio_click", {})}
                    >
                        Photography
                    </Action>
                </div>
            </div>
        </div>
    </Section>
);

export default Contact;
