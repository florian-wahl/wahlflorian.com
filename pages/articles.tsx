import React from "react";
import ContainerBlock from "../components/ContainerBlock";
import Articles from "../components/Articles";
import type { NextPage } from 'next';

const ArticlesPage: NextPage = () => {
  return (
    <ContainerBlock
      customMeta={{
        title: "Articles by Florian Wahl - Insights on Product Strategy & Fintech",
        description: "Read Florian Wahl's articles on product strategy, fintech innovation, digital transformation, and open finance. Expert insights from a product leader in the financial technology space.",
        type: "blog",
      }}
    >
      <Articles />
    </ContainerBlock>
  );
};

export default ArticlesPage;
