import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import RedditCard from "@/components/RedditCard";
import RedditCardSkeleton from "@/components/RedditCardSkeleton";
import EmptyState from "@/components/EmptyState";
import { useLanguage } from "@/contexts/LanguageContext";

const redditPosts = [
  {
    title: "India's Mars Orbiter Mission completes 10 years in space, still operational",
    subreddit: "r/india",
    upvotes: 15234,
    comments: 842,
    preview: "ISRO's Mangalyaan continues to send valuable data about Mars atmosphere and surface features.",
    url: "https://reddit.com/r/india",
    timeAgo: "3h",
  },
  {
    title: "Breaking: Major breakthrough in quantum computing achieved by research team",
    subreddit: "r/technology",
    upvotes: 28491,
    comments: 1203,
    preview: "Scientists have successfully demonstrated quantum supremacy in a new experiment.",
    url: "https://reddit.com/r/technology",
    timeAgo: "5h",
  },
  {
    title: "Global markets rally as inflation fears ease",
    subreddit: "r/finance",
    upvotes: 8762,
    comments: 456,
    preview: "Stock markets around the world saw significant gains following positive economic indicators.",
    url: "https://reddit.com/r/finance",
    timeAgo: "2h",
  },
  {
    title: "UN Climate Summit: Nations agree on historic carbon reduction targets",
    subreddit: "r/worldnews",
    upvotes: 42156,
    comments: 3421,
    preview: "In a landmark decision, world leaders have committed to reducing emissions by 50% by 2030.",
    url: "https://reddit.com/r/worldnews",
    timeAgo: "1h",
  },
  {
    title: "New AI model can predict weather patterns with unprecedented accuracy",
    subreddit: "r/technology",
    upvotes: 12893,
    comments: 567,
    preview: "The machine learning model outperforms traditional forecasting methods by 40%.",
    url: "https://reddit.com/r/technology",
    timeAgo: "4h",
  },
  {
    title: "Supreme Court delivers landmark ruling on digital privacy rights",
    subreddit: "r/news",
    upvotes: 19847,
    comments: 2134,
    preview: "The ruling establishes new precedents for data protection and user consent.",
    url: "https://reddit.com/r/news",
    timeAgo: "6h",
  },
  {
    title: "Electric vehicle sales surge 300% in developing markets",
    subreddit: "r/worldnews",
    upvotes: 7623,
    comments: 389,
    url: "https://reddit.com/r/worldnews",
    timeAgo: "8h",
  },
  {
    title: "Scientists discover high potential high-temperature superconductor",
    subreddit: "r/technology",
    upvotes: 34521,
    comments: 1876,
    preview: "The new material could revolutionize power transmission and electronics.",
    url: "https://reddit.com/r/technology",
    timeAgo: "7h",
  },
];

const Reddit = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { selectedLanguage, languageLabels, isLoading: langLoading } = useLanguage();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [selectedLanguage]);

  const loading = isLoading || langLoading;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
              Reddit
            </h1>
            <div className="px-2.5 py-1 rounded-full bg-[#FF4500]/10 text-[#FF4500] text-xs font-medium">
              Trending on Reddit
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
              <RedditCardSkeleton key={i} />
            ))}
          </div>
        ) : redditPosts.length === 0 ? (
          <EmptyState 
            title="No Reddit posts right now" 
            description="Check back later for trending discussions"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {redditPosts.map((post, index) => (
              <RedditCard key={index} {...post} />
            ))}
          </div>
        )}

        {/* Load More */}
        {!loading && redditPosts.length > 0 && (
          <div className="mt-8 text-center">
            <button className="px-8 py-3 border border-primary text-primary font-medium 
                             rounded-lg hover:bg-primary hover:text-primary-foreground 
                             transition-colors duration-200">
              Load More Posts
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Reddit;
