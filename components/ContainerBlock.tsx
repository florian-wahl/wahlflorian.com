import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface MetaProps {
    title?: string;
    description?: string;
    image?: string;
    type?: string;
    date?: string;
}

interface ContainerBlockProps {
    children: React.ReactNode;
    customMeta?: MetaProps;
}

const ContainerBlock: React.FC<ContainerBlockProps> = ({ children, customMeta = {} }) => {
    const router = useRouter();

    const meta: MetaProps = {
        title: "Florian Wahl - Product Leader & Fintech Strategist",
        description: `Florian Wahl is a Product Leader and Strategist specializing in fintech, payments, and digital transformation. Currently leading Product Strategy at Akoya, with expertise in open finance and API development.`,
        image: "/headshot.jpg",
        type: "website",
        ...customMeta,
    };

    return (
        <div>
            <Head>
                <title>{meta.title}</title>
                <link rel="icon" href="/favicon.ico" />
                <link rel="icon" type="image/x-icon" href="/favicon.ico" />
                <meta name="robots" content="follow, index" />
                <meta content={meta.description} name="description" />
                <meta name="keywords" content="Florian Wahl, Product Leader, Product Strategy, Fintech, Digital Transformation, Akoya, Open Finance, Payments, API Development" />
                <meta name="author" content="Florian Wahl" />
                <meta name="news_keywords" content="Florian Wahl, Fintech, Product Strategy" />
                <meta name="revisit-after" content="7 days" />
                <meta name="rating" content="General" />
                <meta name="copyright" content="Florian Wahl" />
                <meta
                    property="og:url"
                    content={`https://wahlflorian.com${router.asPath}`}
                />
                <link
                    rel="canonical"
                    href={`https://wahlflorian.com${router.asPath}`}
                />
                <meta property="og:type" content={meta.type} />
                <meta property="og:site_name" content="Florian Wahl" />
                <meta property="og:description" content={meta.description} />
                <meta property="og:title" content={meta.title} />
                <meta property="og:image" content={meta.image} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@flwahl" />
                <meta name="twitter:title" content={meta.title} />
                <meta name="twitter:description" content={meta.description} />
                <meta name="twitter:image" content={meta.image} />
                {meta.date && (
                    <meta property="article:published_time" content={meta.date} />
                )}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Person",
                            name: "Florian Wahl",
                            jobTitle: "Product Leader",
                            description: meta.description,
                            image: meta.image,
                            url: `https://wahlflorian.com${router.asPath}`,
                            sameAs: [
                                "https://www.linkedin.com/in/wahlflorian/",
                                "https://twitter.com/flwahl",
                                "https://medium.com/@flwahl"
                            ],
                            worksFor: {
                                "@type": "Organization",
                                name: "Akoya",
                                url: "https://akoya.com"
                            },
                            alumniOf: {
                                "@type": "Organization",
                                name: "Capgemini"
                            },
                            knowsAbout: [
                                "Product Strategy",
                                "Fintech",
                                "Digital Transformation",
                                "Open Finance",
                                "Payments",
                                "Product Management"
                            ]
                        })
                    }}
                />
                {meta.type === "article" && (
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify({
                                "@context": "https://schema.org",
                                "@type": "BlogPosting",
                                headline: meta.title,
                                description: meta.description,
                                datePublished: meta.date,
                                image: meta.image
                                    ? `https://wahlflorian.com${meta.image}`
                                    : undefined,
                                author: {
                                    "@type": "Person",
                                    name: "Florian Wahl",
                                    url: "https://wahlflorian.com",
                                },
                                publisher: {
                                    "@type": "Person",
                                    name: "Florian Wahl",
                                    url: "https://wahlflorian.com",
                                },
                                url: `https://wahlflorian.com${router.asPath}`,
                            })
                        }}
                    />
                )}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Blog",
                            url: "https://wahlflorian.com/articles",
                            name: "Florian Wahl's Articles",
                            description: "Articles and insights about Product Strategy, Fintech, and Digital Transformation by Florian Wahl",
                            author: {
                                "@type": "Person",
                                name: "Florian Wahl"
                            }
                        })
                    }}
                />
            </Head>
            <main className="bg-white dark:bg-[#0a0a0a] w-full min-h-screen transition-colors duration-300">
                <Navbar />
                <div>{children}</div>
                <Footer />
            </main>
        </div>
    );
};

export default ContainerBlock; 
