import ContainerBlock from "../components/ContainerBlock";
import Hero from "../components/Hero";
import UpcomingEngagements from "../components/UpcomingEngagements";
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
            <div className="bg-white dark:bg-[#0a0a0a] transition-colors duration-300">
                <div className="max-w-6xl mx-auto px-4 pt-0 pb-10 md:pb-12">
                    <p className="text-base md:text-lg font-mono text-gray-600 dark:text-gray-400 max-w-2xl text-center md:text-left">
                        Engineer by trade, fintech strategist by passion. I lead Product Strategy at Akoya, where I focus on open finance and innovation. With almost a decade in financial services — spanning consulting, digital transformation, and product — I&apos;m an active voice in the industry through conference talks, panels, and writing.
                    </p>
                </div>
            </div>
            <UpcomingEngagements />
            <ThoughtLeadership limit={9} />
            <Experience />
        </ContainerBlock>
    );
};

export default Home; 