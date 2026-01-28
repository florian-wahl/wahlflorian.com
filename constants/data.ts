interface Article {
    title: string;
    link: string;
    imgUrl: string;
    date?: string; // Format: "YYYY-MM-DD" or "YYYY-MM" for sorting
}

interface ConferenceTalk {
    title: string;
    venue: string;
    date: string; // Format: "YYYY-MM-DD" or "YYYY-MM" for sorting
}

interface About {
    title: string;
    description: string[];
    certifications: string[];
}

interface Experience {
    title: string;
    company: string;
    startDate: string; // Format: "YYYY-MM" or "YYYY-MM-DD"
    endDate?: string | null; // Format: "YYYY-MM" or "YYYY-MM-DD", null for current role
    companyLink: string;
    desc: string;
}

interface SocialLinks {
    instagram: string;
    twitter: string;
    linkedin: string;
    mastodon: string;
    github: string;
}

interface UpcomingEngagement {
    title: string;
    description?: string;
    date: string; // ISO date for sorting/display (e.g. "YYYY-MM-DD" or "YYYY-MM")
    conference: string;
    location?: string;
    link?: string;
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
    conferenceTalks: ConferenceTalk[];
    about: About;
    experience: Experience[];
    resumeUrl: string;
    socialLinks: SocialLinks;
    rainbowContent: string[];
    upcomingEngagements: UpcomingEngagement[];
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
            date: "2023-09-19",
        },
        {
            title: "Reduce fraud risk with tokenized account numbers",
            link: "https://akoya.com/blog/reduce-fraud-risk-with-tokenized-account-numbers",
            imgUrl: "https://akoya.com/hubfs/MicrosoftTeams-image%20%2831%29.png",
            date: "2022-05-02",
        },
        {
            title: "The future of payments is instant",
            link: "https://akoya.com/blog/futureofpaymentswhitepaper",
            imgUrl: "https://akoya.com/hubfs/Blog%20Library-May-05-2023-06-48-40-2286-PM.png",
            date: "2023-05-01",
        },
        {
            title: "A consumer-first approach to account linking",
            link: "https://akoya.com/blog/account-linking",
            imgUrl: "https://akoya.com/hubfs/Blog%20posts%20-%20SVGs/Blog_A%20consumer-first%20approach%20to%20account%20linking.svg",
            date: "2023-03-01",
        },
        {
            title: "Instant account verification with Akoya",
            link: "https://akoya.com/blog/account-verification",
            imgUrl: "https://akoya.com/hubfs/Blog%20posts%20-%20SVGs/Blog_Instant%20account%20verification%20with%20Akoya.svg",
            date: "2023-08-09",
        },
        {
            title: "Reduce Fraud Risk With Tokenized Account Numbers",
            link: "https://akoya.com/news/reduce-fraud-risk-with-tokenized-account-numbers",
            imgUrl: "https://akoya.com/hubfs/MicrosoftTeams-image%20%2831%29.png",
            date: "2022-05-02",
        },
    ],
    personalArticles: [
        {
            title: "A Framework For Product Strategy",
            link: "https://medium.com/@flwahl/a-framework-for-product-strategy-68ddabe8cb6",
            imgUrl: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*ywYLQMzS1NLVWYHB3B7sZA.jpeg",
            date: "2022-10-30",
        },
        {
            title: "A Process For Product Management",
            link: "https://medium.com/design-bootcamp/a-process-for-product-management-9e12af274fa",
            imgUrl: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*yg7tmTyUqldSMY6ITNfsLQ.png",
            date: "2022-11-19",
        },
        {
            title: "Porter's Five Forces to Product Strategy",
            link: "https://medium.com/managing-digital-products/applying-porters-five-forces-to-product-strategy-free-template-4412429b7338",
            imgUrl: "https://miro.medium.com/v2/resize:fit:1400/format:webp/0*ZROay747swCHKK3M",
            date: "2023-01-14",
        },
        {
            title: "Four Methodologies That Can Help Your Product Team's Prioritization Efforts",
            link: "https://medium.com/managing-digital-products/4-helpful-prioritization-methodologies-f3ee0017e6d1",
            imgUrl: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*v2zCAUyCDFj8ATBesBHW6g.png",
            date: "2022-12-05",
        },
        {
            title: "4 Collaboration Models between Fintechs & Incumbent Financial Institutions",
            link: "https://medium.com/fintech-product-thoughts/4-collaboration-models-between-fintechs-incumbent-financial-institutions-178cc386db97",
            imgUrl: "https://miro.medium.com/v2/resize:fit:1400/format:webp/0*37aDlWhUyABDaZjE",
            date: "2022-12-26",
        },
        {
            title: "Digital Product Levels and Layers: Two Component Frameworks Product Managers Need To Know",
            link: "https://medium.productcoalition.com/breaking-down-the-digital-product-layers-70d7590a6dcb",
            imgUrl: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*iO0ixU8AcImt58QbPe9fNQ.png",
            date: "2022-11-08",
        },
        {
            title: "How To Estimate The Cost Of Processing An API Call?",
            link: "https://medium.com/@flwahl/how-to-estimate-the-cost-of-processing-an-api-call-75b90197f2ad",
            imgUrl: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*fgx9pN1KV6jzRtwUaD29OQ.jpeg",
            date: "2022-07-31",
        }
    ],
    conferenceTalks: [
        {
            title: "Open Banking in the US: Navigating Compliance Under the CFPB's 1033 Rule",
            venue: "OpenFinity EXPO",
            date: "2024-11",
        },
        {
            title: "Industry Collaboration on DDA Payment Tokens",
            venue: "Nacha's Smarter Faster Payments 2024",
            date: "2024-05",
        },
        {
            title: "Driving Adoption of Open Finance in the Commercial Banking sector",
            venue: "FDX Global Summit",
            date: "2024-03",
        },
        {
            title: "Revolutionizing Payments: Improving Consumer Adoption of A2A",
            venue: "Link Money's Payments Innovation Summit",
            date: "2023-09",
        },
        {
            title: "Taking Faster Payments to the Bank - or CU",
            venue: "Glen Sarvady's BIGcast (Podcast)",
            date: "2023-05",
        },
        {
            title: "Pay by Bank Powered by Real-Time Payments",
            venue: "Nacha's Smarter Faster Payments 2023",
            date: "2023-04",
        },
        {
            title: "Industry Collaboration on DDA Payment Tokens in Support of a Safer Data Sharing & Payments Ecosystem",
            venue: "Financial Data Exchange Global Summit",
            date: "2023-04",
        },
    ],
    upcomingEngagements: [
        {
            title: "Can data aggregators power the next wave of smarter credit?",
            date: "2026-04-01",
            conference: "Fintech Meetup",
            location: "Las Vegas",
            link: "https://fintechmeetup.com/agendas/2026-agenda/can-data-aggregators-power-the-next-wave-of-s",
        },
        {
            title: "Beyond APIs: The Strategic Value of Data Out in Open Finance",
            date: "2026-04-27",
            conference: "Nacha Payments 2026",
            location: "San Diego",
            link: "https://payments.nacha.org/session/beyond-apis-strategic-value-data-out-open-finance",
        },
        {
            title: "How DDA Tokenization Protects FIs and Empowers Consumers in the Era of Open Banking",
            date: "2026-04-28",
            conference: "Nacha Payments 2026",
            location: "San Diego",
            link: "https://payments.nacha.org/session/how-dda-tokenization-protects-fis-and-empowers-consumers-era-open-banking",
        },
    ],
    about: {
        title:
            "Engineer by trade and fintech geek by passion, Florian Wahl currently leads the Product Strategy team at Akoya",
        description: [
            `At Akoya, I investigate the opportunities that open finance can bring to a wide array of use cases with particular attention to the payments space.`,
            `I am a certified digital product manager and strategist with 7+ years of experience. I am an active voice in the industry, talking and writing about fintech, data sharing, payments, and tokenization.`,
            `Before joining Akoya in 2021, I held various roles as a consultant in financial services, focusing on digital transformation and open finance.`,
        ],
        certifications: [
            "I am a Certified Digital Product Manager, credentialed by the Association of International Product Marketing and Management (AIPMM). This certification, issued in September 2023 (Credential ID: 82693844), validates my expertise in driving product strategy, lifecycle management, and innovation in digital products."
        ]
    },
    experience: [
        {
            title: "Head of Product Strategy",
            company: "Akoya",
            startDate: "2022-11",
            endDate: null, // Current role
            companyLink: "https://akoya.com",
            desc: "Leading the Product Strategy team in charge of our multi-year strategy, roadmap, product ops, competitive intelligence, and product management excellence processes.",
        },
        {
            title: "Product Manager",
            company: "Akoya",
            startDate: "2022-02",
            endDate: "2022-11",
            companyLink: "https://akoya.com",
            desc: "Managed Akoya's core APIs, Payments & Customers products. SME for various use cases: payments enablement, money movement, account number tokenization, and account ownership validation.",
        },
        {
            title: "Business Strategy & Execution Manager",
            company: "Akoya",
            startDate: "2021-10",
            endDate: "2022-02",
            companyLink: "https://akoya.com",
            desc: "Conducted market research, competitive analysis, and client interviews. Standardized pricing models. Gathered functional and technical requirements for the development of Akoya's core data access products.",
        },
        {
            title: "Global AWS Alliance Lead, Financial Services",
            company: "Capgemini",
            startDate: "2020-06",
            endDate: "2021-10",
            companyLink: "https://capgemini.com",
            desc: "Managed global partnership between AWS and Capgemini Financial Services across 80+ accounts through all geographies.",
        },
        {
            title: "Manager",
            company: "Capgemini",
            startDate: "2020-03",
            endDate: "2020-06",
            companyLink: "https://capgemini.com",
            desc: "Program managed the delivery of a 6-week technology and operations readiness assessment for a transaction bank.",
        },
        {
            title: "Senior Consultant (and Previous Roles)",
            company: "Capgemini",
            startDate: "2017-08",
            endDate: "2020-03",
            companyLink: "https://capgemini.com",
            desc: "Various consulting positions in open banking, digital transformation, fintech, and blockchain.",
        },
    ],
    resumeUrl:
        "https://docs.google.com/document/d/1vzJ5S7rM71Baq3uHHT6jgi3MhZf83h_gKi5vUh76aKY/edit?usp=sharing",
    socialLinks: {
        instagram: "https://www.instagram.com/florian.wahl",
        twitter: "https://twitter.com/flwahl",
        linkedin: "https://www.linkedin.com/in/wahlflorian/",
        mastodon: "https://theforkiverse.com/@florian31",
        github: "https://github.com/florian-wahl",
    },
    rainbowContent: [
        "Product Manager.",
        "Photographer.",
        "Engineer by Trade.",
        "Strategist."
    ]
};

export default userData; 