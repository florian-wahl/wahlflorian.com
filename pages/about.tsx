import React from "react";
import ContainerBlock from "../components/ContainerBlock";
import AboutMe from "../components/AboutMe";
import type { NextPage } from 'next';

const About: NextPage = () => {
  return (
    <ContainerBlock
      customMeta={{
        title: "About Florian Wahl - Product Leader & Fintech Expert",
        description: "Learn about Florian Wahl's experience in product strategy, fintech innovation, and digital transformation. Discover his journey from engineering to product leadership at Akoya.",
        type: "profile",
      }}
    >
      <AboutMe />
    </ContainerBlock>
  );
};

export default About;
