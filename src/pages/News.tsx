import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import NewsCard from "@/components/NewsCard";
import NewsCardSkeleton from "@/components/NewsCardSkeleton";
import { useLanguage } from "@/contexts/LanguageContext";

const newsItems = [
  {
    title: "Parliament Passes Historic Bill Amid Opposition Walkout",
    source: "NDTV",
    imageUrl: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=600&h=400&fit=crop",
    timeAgo: "1 hour ago",
    excerpt: "The bill was passed with a significant majority after hours of heated debate in the Lok Sabha.",
    url: "https://www.ndtv.com/",
  },
  {
    title: "Stock Markets Hit All-Time High on Strong GDP Data",
    source: "Economic Times",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop",
    timeAgo: "2 hours ago",
    url: "https://economictimes.indiatimes.com/",
  },
  {
    title: "Monsoon Update: Heavy Rains Expected in Western States",
    source: "Weather India",
    imageUrl: "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=600&h=400&fit=crop",
    timeAgo: "3 hours ago",
    url: "https://www.skymetweather.com/",
  },
  {
    title: "New Metro Line Inaugurated in Delhi-NCR Region",
    source: "Times of India",
    imageUrl: "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=600&h=400&fit=crop",
    timeAgo: "4 hours ago",
    url: "https://timesofindia.indiatimes.com/",
  },
  {
    title: "International Trade Agreements: What It Means for India",
    source: "Business Standard",
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop",
    timeAgo: "5 hours ago",
    url: "https://www.business-standard.com/",
  },
  {
    title: "Space Mission Success: ISRO Launches Communication Satellite",
    source: "India Today",
    imageUrl: "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=600&h=400&fit=crop",
    timeAgo: "6 hours ago",
    url: "https://www.indiatoday.in/",
  },
];

const News = () => {
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
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
            News
          </h1>
          <p className="text-muted-foreground mt-1">
            Showing news in {languageLabels[selectedLanguage]}
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <NewsCardSkeleton isLarge />
            {Array.from({ length: 5 }).map((_, i) => (
              <NewsCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {newsItems.map((item, index) => (
              <NewsCard key={index} {...item} isLarge={index === 0} />
            ))}
          </div>
        )}

        {!loading && (
          <div className="mt-8 text-center">
            <button className="px-8 py-3 border border-primary text-primary font-medium 
                             rounded-lg hover:bg-primary hover:text-primary-foreground 
                             transition-colors duration-200">
              Load More News
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default News;
