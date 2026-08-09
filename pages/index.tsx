import ContainerBlock from "../components/ContainerBlock";
import Hero from "../components/Hero";
import UpcomingEngagements from "../components/UpcomingEngagements";
import ThoughtLeadership from "../components/ThoughtLeadership";
import Experience from "../components/Experience";
import { getAllPostsMeta, PostMeta } from "../lib/posts";
import type { GetStaticProps, NextPage } from "next";

interface HomeProps {
    postsMeta: Pick<PostMeta, "title" | "date" | "slug">[];
}

/**
 * DESIGN.md §11.3 order, minus the advisory band.
 *
 * The band is deferred with /advisory (§12): it needs copy that doesn't exist
 * yet, and the hero already carries this page's single CTA — §11.2 allows one
 * per page, never two.
 */
const Home: NextPage<HomeProps> = ({ postsMeta }) => (
    <ContainerBlock
        customMeta={{
            title: "Florian Wahl - Product Leader & Fintech Expert",
            description:
                "Product leader, engineer, and fintech expert. Explore my work experience, thought leadership, and capabilities.",
        }}
    >
        <Hero />
        <UpcomingEngagements />
        <ThoughtLeadership limit={8} hostedPosts={postsMeta} />
        <Experience variant="compact" />
    </ContainerBlock>
);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
    const posts = getAllPostsMeta();
    const postsMeta = posts.map(({ title, date, slug }) => ({ title, date, slug }));
    return { props: { postsMeta } };
};

export default Home;
