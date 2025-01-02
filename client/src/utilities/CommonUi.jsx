

export const features = [
    {
        icon: "H",
        title: "Diverse Opportunities",
        description:
            "Access thousands of job listings across various industries and experience levels.",
        benefits: [
            "100,000+ active job listings",
            "50+ job categories",
            "Remote and on-site options",
        ],
        cta: "Explore Jobs",
        ctaLink: "/findwork",
    },
    {
        icon: "M",
        title: "Top Companies",
        description:
            "Connect with leading companies, from innovative startups to Fortune 500 corporations.",
        benefits: [
            "500+ verified employers",
            "Exclusive partnerships",
            "Direct application process",
        ],
        cta: "View Companies",
        ctaLink: "/findwork",
    },
    {
        icon: "G",
        title: "Talent Pool",
        description:
            "Employers can access a diverse pool of qualified candidates for their open positions.",
        benefits: [
            "1M+ registered job seekers",
            "Advanced search filters",
            "AI-powered matching",
        ],
        cta: "Post a Job",
        ctaLink: "/post",
    },
];

  const WhyChooseUs = () => {
    return (
        <div className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                    Why Choose JobFindr
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-lg p-6 border border-gray-200"
                        >
                            <div className="flex items-center justify-center h-16 w-16 mx-auto mb-4 bg-gray-100 rounded-full">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-medium text-gray-800 mb-2 text-center">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 text-center mb-4">
                                {feature.description}
                            </p>
                            <ul className="list-disc pl-6 text-gray-600 mb-6">
                                {feature.benefits.map((benefit, i) => (
                                    <li key={i} className="mb-1">
                                        {benefit}
                                    </li>
                                ))}
                            </ul>
                            <div className="text-center">
                                <a
                                    href={feature.ctaLink}
                                    className="bg-gray-800 hover:bg-gray-900 text-white font-medium py-2 px-6 rounded-md inline-block"
                                >
                                    {feature.cta}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
                <p className="mt-8 text-center text-gray-500">
                    Trusted by 10,000+ companies worldwide
                </p>
            </div>
        </div>
    );
};

export default WhyChooseUs;