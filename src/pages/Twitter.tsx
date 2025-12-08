import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import TwitterCard from "@/components/TwitterCard";
import TwitterCardSkeleton from "@/components/TwitterCardSkeleton";
import EmptyState from "@/components/EmptyState";
import { useLanguage } from "@/contexts/LanguageContext";

const tweets = [
  {
    name: "Reuters",
    handle: "@Reuters",
    text: "BREAKING: Global leaders reach historic agreement on climate action at UN Summit, pledging to achieve net-zero emissions by 2050.",
    likes: 12453,
    retweets: 8234,
    verified: true,
    url: "https://twitter.com/Reuters",
    timeAgo: "15m",
  },
  {
    name: "Economic Times",
    handle: "@EconomicTimes",
    text: "Indian stock markets hit all-time high as FII inflows surge. Sensex crosses 75,000 mark for the first time. #Markets #India",
    likes: 5621,
    retweets: 2134,
    verified: true,
    url: "https://twitter.com/EconomicTimes",
    timeAgo: "32m",
  },
  {
    name: "BBC Breaking News",
    handle: "@BBCBreaking",
    text: "Scientists announce major breakthrough in cancer treatment using AI-powered drug discovery. Clinical trials show promising results.",
    likes: 28934,
    retweets: 15623,
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop",
    verified: true,
    url: "https://twitter.com/BBCBreaking",
    timeAgo: "1h",
  },
  {
    name: "NDTV",
    handle: "@ndtv",
    text: "Parliament passes landmark Digital India Bill with focus on data privacy and cybersecurity. The bill introduces new regulations for tech companies.",
    likes: 3421,
    retweets: 1256,
    verified: true,
    url: "https://twitter.com/ndtv",
    timeAgo: "2h",
  },
  {
    name: "TechCrunch",
    handle: "@TechCrunch",
    text: "🚀 SpaceX successfully launches Starship on its fifth test flight, achieving full orbital insertion. A major milestone for space exploration.",
    likes: 45123,
    retweets: 21456,
    imageUrl: "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=600&h=400&fit=crop",
    verified: true,
    url: "https://twitter.com/TechCrunch",
    timeAgo: "3h",
  },
  {
    name: "The Hindu",
    handle: "@the_hindu",
    text: "Monsoon update: IMD predicts above-normal rainfall in southern states this week. Farmers advised to prepare for heavy showers.",
    likes: 2134,
    retweets: 876,
    verified: true,
    url: "https://twitter.com/the_hindu",
    timeAgo: "4h",
  },
  {
    name: "ANI",
    handle: "@ANI",
    text: "ISRO announces dates for Chandrayaan-4 mission. The ambitious project aims to bring lunar samples back to Earth for the first time.",
    likes: 18934,
    retweets: 9234,
    verified: true,
    url: "https://twitter.com/ANI",
    timeAgo: "5h",
  },
  {
    name: "Bloomberg",
    handle: "@business",
    text: "Oil prices drop as OPEC+ signals potential increase in production. Brent crude falls below $70 per barrel.",
    likes: 6234,
    retweets: 2876,
    verified: true,
    url: "https://twitter.com/business",
    timeAgo: "6h",
  },
];

const Twitter = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { selectedLanguage, languageLabels, isLoading: langLoading, languageVersion } = useLanguage();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [languageVersion]);

  const loading = isLoading || langLoading;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
              Twitter (X)
            </h1>
            <div className="px-2.5 py-1 rounded-full bg-foreground/10 text-foreground text-xs font-medium">
              Latest from Twitter (X)
            </div>
          </div>
          <p className="text-muted-foreground">
            Showing content in {languageLabels[selectedLanguage]}
          </p>
        </div>

        {/* Content */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <TwitterCardSkeleton key={i} />
            ))}
          </div>
        ) : tweets.length === 0 ? (
          <EmptyState 
            title="No tweets available" 
            description="Check back later for the latest updates"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {tweets.map((tweet, index) => (
              <TwitterCard key={index} {...tweet} />
            ))}
          </div>
        )}

        {/* Load More */}
        {!loading && tweets.length > 0 && (
          <div className="mt-8 text-center">
            <button className="px-8 py-3 border border-primary text-primary font-medium 
                             rounded-lg hover:bg-primary hover:text-primary-foreground 
                             transition-colors duration-200">
              Load More Tweets
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Twitter;
