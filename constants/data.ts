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
    articles: Article[];
    conferenceTalks: ConferenceTalk[];
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
    articles: [
        {
            title: "The Expansion of Account Ownership Validation Methods",
            link: "https://akoya.com/blog/account-ownership-validation-methods",
            imgUrl: "https://akoya.com/hubfs/Blog%20posts%20-%20SVGs/The%20expansion%20of%20account%20ownership%20validation%20methods%20-%20Blog%20post.svg",
            date: "2023-09-19",
        },
        {
            title: "Instant account verification with Akoya",
            link: "https://akoya.com/blog/account-verification",
            imgUrl: "https://akoya.com/hubfs/Blog%20posts%20-%20SVGs/Blog_Instant%20account%20verification%20with%20Akoya.svg",
            date: "2023-08-09",
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
            title: "Reduce fraud risk with tokenized account numbers",
            link: "https://akoya.com/blog/reduce-fraud-risk-with-tokenized-account-numbers",
            imgUrl: "https://akoya.com/hubfs/MicrosoftTeams-image%20%2831%29.png",
            date: "2022-05-02",
        },
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
    experience: [
        {
            title: "Head of Product Strategy",
            company: "Akoya",
            startDate: "2022-11",
            endDate: null, // Current role
            companyLink: "https://akoya.com",
            desc: "Leading the Product Strategy team in charge of our multi-year strategy, roadmap, product ops, pricing, commercialization, competitive intelligence, and product management excellence processes.",
        },
        {
            title: "Product Manager",
            company: "Akoya",
            startDate: "2022-02",
            endDate: "2022-11",
            companyLink: "https://akoya.com",
            desc: "Managed Akoya's core API products. SME for various use cases: payments enablement, money movement, account number tokenization, and account ownership validation.",
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
            desc: "Program managed the delivery of a 6-week technology and operations readiness assessment for a leading transaction bank.",
        },
        {
            title: "Senior Consultant (and Previous Roles)",
            company: "Capgemini",
            startDate: "2017-08",
            endDate: "2020-03",
            companyLink: "https://capgemini.com",
            desc: "Various consulting positions in open banking, digital transformation, fintech, and blockchain.",
        },
        {
            title: "Co-Founder",
            company: "HubRoad",
            startDate: "2016-09",
            endDate: "2017-12",
            companyLink: "https://www.linkedin.com/company/17894778/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BW11mJDKSQ7aX0v%2Fu3u16pg%3D%3D",
            desc: "Defined business plan, business model, and marketing strategy for the product introduction and the startup.",
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