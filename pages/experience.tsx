import React from "react";
import ContainerBlock from "../components/ContainerBlock";
import Experience from "../components/Experience";

export default function experience() {
  return (
    <ContainerBlock
      customMeta={{
        title: "Florian Wahl's Professional Experience",
        description:
          "Discover Florian Wahl's career in product management, fintech, and leadership roles.",
        type: "profile",
      }}
    >
      <Experience />
    </ContainerBlock>
  );
}
