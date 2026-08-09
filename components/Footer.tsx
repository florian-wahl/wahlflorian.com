import React from "react";
import userData from "../constants/data";
import SocialLinks from "./SocialLinks";
import { Container } from "./primitives";

const Footer: React.FC = () => (
    <footer className="border-t border-rule">
        <Container>
            <div className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-meta text-ink-muted">
                    &copy; {new Date().getFullYear()} {userData.name}
                </p>
                <SocialLinks iconSize={18} />
            </div>
        </Container>
    </footer>
);

export default Footer;
