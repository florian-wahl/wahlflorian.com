interface Article {
    title: string;
    link: string;
    imgUrl: string;
}

interface About {
    title: string;
    description: string[];
    publicSpeaking: [string, string][];
    certifications: string[];
}

interface Experience {
    title: string;
    company: string;
    year: string;
    companyLink: string;
    desc: string;
}

interface SocialLinks {
    instagram: string;
    twitter: string;
    linkedin: string;
}

interface UserData {
    githubUsername: string;
    name: string;
    designation: string;
    avatarUrl: string;
    email: string;
    phone: string;
    address: string;
    workArticles: Article[];
    personalArticles: Article[];
    about: About;
    experience: Experience[];
    resumeUrl: string;
    socialLinks: SocialLinks;
    rainbowContent: string[];
}

const userData: UserData = {
    githubUsername: "N/A",
    name: "Florian Wahl",
    designation: "Product Leader",
    avatarUrl: "/headshot.jpg",
    email: "florian.wahl.31@gmail.com",
    phone: "+",
    address: "New York, NY",
    workArticles: [
        {
            title: "The Expansion of Account Ownership Validation Methods",
            link: "https://akoya.com/blog/account-ownership-validation-methods",
            imgUrl: "https://akoya.com/hubfs/Blog%20posts%20-%20SVGs/The%20expansion%20of%20account%20ownership%20validation%20methods%20-%20Blog%20post.svg",
        },
        {
            title: "Reduce fraud risk with tokenized account numbers",
            link: "https://akoya.com/blog/reduce-fraud-risk-with-tokenized-account-numbers",
            imgUrl: "https://akoya.com/hubfs/MicrosoftTeams-image%20%2831%29.png",
        },
        {
            title: "The future of payments is instant",
            link: "https://akoya.com/blog/futureofpaymentswhitepaper",
            imgUrl: "https://akoya.com/hubfs/Blog%20Library-May-05-2023-06-48-40-2286-PM.png",
        },
        {
            title: "A consumer-first approach to account linking",
            link: "https://akoya.com/blog/account-linking",
            imgUrl: "https://akoya.com/hubfs/Blog%20posts%20-%20SVGs/Blog_A%20consumer-first%20approach%20to%20account%20linking.svg",
        },
        {
            title: "Instant account verification with Akoya",
            link: "https://akoya.com/blog/account-verification",
            imgUrl: "https://akoya.com/hubfs/Blog%20posts%20-%20SVGs/Blog_Instant%20account%20verification%20with%20Akoya.svg",
        },
    ],
    personalArticles: [
        {
            title: "A Framework For Product Strategy",
            link: "https://medium.com/@flwahl/a-framework-for-product-strategy-68ddabe8cb6",
            imgUrl: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*ywYLQMzS1NLVWYHB3B7sZA.jpeg",
        },
        {
            title: "A Process For Product Management",
            link: "https://medium.com/design-bootcamp/a-process-for-product-management-9e12af274fa",
            imgUrl: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*yg7tmTyUqldSMY6ITNfsLQ.png",
        },
        {
            title: "Porter's Five Forces to Product Strategy",
            link: "https://productcoalition.com/applying-porters-five-forces-to-product-strategy-free-template-4412429b7338",
            imgUrl: "https://miro.medium.com/v2/resize:fit:1400/format:webp/0*ZROay747swCHKK3M",
        },
        {
            title: "Four Methodologies That Can Help Your Product Team's Prioritization Efforts",
            link: "https://productcoalition.com/4-helpful-prioritization-methodologies-f3ee0017e6d1",
            imgUrl: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*v2zCAUyCDFj8ATBesBHW6g.png",
        },
        {
            title: "Reduce Fraud Risk With Tokenized Account Numbers",
            link: "https://akoya.com/news/reduce-fraud-risk-with-tokenized-account-numbers",
            imgUrl: "https://akoya.com/hubfs/MicrosoftTeams-image%20%2831%29.png",
        },
        {
            title: "4 Collaboration Models between Fintechs & Incumbent Financial Institutions",
            link: "https://medium.com/fintech-product-thoughts/4-collaboration-models-between-fintechs-incumbent-financial-institutions-178cc386db97",
            imgUrl: "https://miro.medium.com/v2/resize:fit:1400/format:webp/0*37aDlWhUyABDaZjE",
        },
        {
            title: "Digital Product Levels and Layers: Two Component Frameworks Product Managers Need To Know",
            link: "https://productcoalition.com/breaking-down-the-digital-product-layers-70d7590a6dcb",
            imgUrl: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*iO0ixU8AcImt58QbPe9fNQ.png",
        },
        {
            title: "How To Estimate The Cost Of Processing An API Call?",
            link: "https://medium.com/@flwahl/how-to-estimate-the-cost-of-processing-an-api-call-75b90197f2ad",
            imgUrl: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*fgx9pN1KV6jzRtwUaD29OQ.jpeg",
        }
    ],
    about: {
        title:
            "Engineer by trade and fintech geek by passion, Florian Wahl currently leads the Product Strategy team at Akoya",
        description: [
            `At Akoya, I investigate the opportunities that open finance can bring to a wide array of use cases with particular attention to the payments space.`,
            `I am a certified digital product manager and strategist with 7+ years of experience. I am an active voice in the industry, talking and writing about fintech, data sharing, payments, and tokenization.`,
            `Before joining Akoya in 2021, I held various roles as a consultant in financial services, focusing on digital transformation and open finance.`,
        ],
        publicSpeaking: [
            [`Open Banking in the US: Navigating Compliance Under the CFPB's 1033 Rule`, `OpenFinity EXPO, November 2024`],
            [`Industry Collaboration on DDA Payment Tokens`, `Nacha's Smarter Faster Payments 2024, May 2024`],
            [`Driving Adoption of Open Finance in the Commercial Banking sector`, `FDX Global Summit, March 2024`],
            [`Revolutionizing Payments: Improving Consumer Adoption of A2A`, `Link Money's Payments Innovation Summit, September 2023`],
            [`Taking Faster Payments to the Bank - or CU`, `Glen Sarvady's BIGcast (podcast), May 2023`],
            [`Pay by Bank Powered by Real-Time Payments`, `Nacha's Smarter Faster Payments 2023, April 2023`],
            [`Industry Collaboration on DDA Payment Tokens in Support of a Safer Data Sharing & Payments Ecosystem`, `Financial Data Exchange Global Summit, April 2023`]
        ],
        certifications: [
            "I am a Certified Digital Product Manager, credentialed by the Association of International Product Marketing and Management (AIPMM). This certification, issued in September 2023 (Credential ID: 82693844), validates my expertise in driving product strategy, lifecycle management, and innovation in digital products."
        ]
    },
    experience: [
        {
            title: "Product Strategy Lead",
            company: "Akoya",
            year: "Current",
            companyLink: "https://akoya.com",
            desc: "Leading the Product Strategy team in charge of our multi-year strategy, roadmap, product ops, competitive intelligence, and product management excellence processes.",
        },
        {
            title: "Product Manager",
            company: "Akoya",
            year: "February 2022",
            companyLink: "https://akoya.com",
            desc: "Managed Akoya's core APIs, Payments & Customers products. SME for various use cases: payments enablement, money movement, account number tokenization, and account ownership validation.",
        },
        {
            title: "Business Strategy & Execution Manager",
            company: "Akoya",
            year: "October 2021",
            companyLink: "https://akoya.com",
            desc: "Conducted market research, competitive analysis, and client interviews. Standardized pricing models. Gathered functional and technical requirements for the development of Akoya's core data access products.",
        },
        {
            title: "Global AWS Alliance Lead, Financial Services",
            company: "Capgemini",
            year: "June 2020",
            companyLink: "https://capgemini.com",
            desc: "Managed global partnership between AWS and Capgemini Financial Services across 80+ accounts through all geographies.",
        },
        {
            title: "Manager",
            company: "Capgemini",
            year: "March 2020",
            companyLink: "https://capgemini.com",
            desc: "Program managed the delivery of a 6-week technology and operations readiness assessment for a transaction bank.",
        },
        {
            title: "Senior Consultant (and Previous Roles)",
            company: "Capgemini",
            year: "August 2017",
            companyLink: "https://capgemini.com",
            desc: "Various consulting positions in open banking, digital transformation, fintech, and blockchain.",
        },
    ],
    resumeUrl:
        "https://docs.google.com/document/d/1q8A1WskIRjXZHOqxrV36INzCy4Ys7TqiocZG6DjimN0/edit?usp=sharing",
    socialLinks: {
        instagram: "https://www.instagram.com/florian.wahl",
        twitter: "https://twitter.com/flwahl",
        linkedin: "https://www.linkedin.com/in/wahlflorian/",
    },
    rainbowContent: [
        "Product Manager.",
        "Photographer.",
        "Engineer.",
        "Strategist."
    ]
};

export default userData; 