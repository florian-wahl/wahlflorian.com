import ContainerBlock from "../components/ContainerBlock";
import FeaturedArticles from "../components/FeaturedArticles";
import Hero from "../components/Hero";
import AboutMe from "../components/AboutMe";
import type { NextPage } from 'next';

const Home: NextPage = () => {
    return (
        <ContainerBlock
            customMeta={{
                title: "Florian Wahl",
                description: "This is my portfolio website."
            }}
        >
            <Hero />
            <AboutMe />
            <FeaturedArticles />
        </ContainerBlock>
    );
};

export default Home; 