import React from "react";
import ContainerBlock from "../components/ContainerBlock";
import Contact from "../components/Contact";

export default function contact() {
  return (
    <ContainerBlock
      customMeta={{
        title: "Contact Florian Wahl - Get in Touch",
        description:
          "Reach out to Florian Wahl for collaboration, product inquiries, or networking opportunities.",
        type: "profile",
      }}
    >
      <Contact />
    </ContainerBlock>
  );
}
