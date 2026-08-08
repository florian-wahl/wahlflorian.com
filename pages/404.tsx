import React, { useEffect } from "react";
import ContainerBlock from "../components/ContainerBlock";
import { event } from "../utils/analytics";
import { Container, Kicker, Action } from "../components/primitives";

const NotFound: React.FC = () => {
    useEffect(() => {
        event("page_404", { path: typeof window !== "undefined" ? window.location.pathname : "" });
    }, []);

    return (
        <ContainerBlock
            customMeta={{
                title: "404 – Page Not Found | Florian Wahl",
                description: "This page doesn't exist.",
                type: "website",
            }}
        >
            <Container className="flex min-h-[60vh] flex-col justify-center py-20">
                <div className="max-w-prose">
                    <Kicker className="mb-6">Error 404</Kicker>
                    <h1 className="mb-4 font-display text-display-l font-bold text-ink">
                        This page doesn&apos;t exist.
                    </h1>
                    <p className="mb-8 font-prose text-prose text-ink-muted">
                        The link may be out of date, or the page may have moved.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <Action href="/" onClick={() => event("404_navigation", { label: "go_home" })}>
                            Home
                        </Action>
                        <Action
                            href="/articles"
                            variant="ghost"
                            onClick={() => event("404_navigation", { label: "view_articles" })}
                        >
                            Articles
                        </Action>
                    </div>
                </div>
            </Container>
        </ContainerBlock>
    );
};

export default NotFound;
