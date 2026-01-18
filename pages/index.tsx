import ContainerBlock from "../components/ContainerBlock";
import Hero from "../components/Hero";
import ThoughtLeadership from "../components/ThoughtLeadership";
import Experience from "../components/Experience";
import type { NextPage } from 'next';

const Home: NextPage = () => {
    return (
        <ContainerBlock
            customMeta={{
                title: "Florian Wahl - Product Leader & Fintech Expert",
                description: "Product leader, engineer, and fintech expert. Explore my work experience, thought leadership, and capabilities."
            }}
        >
            <Hero />
            <ThoughtLeadership limit={9} />
            <Experience />
        </ContainerBlock>
    );
};

export default Home; 