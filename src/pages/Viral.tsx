import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import NewsCard from "@/components/NewsCard";
import NewsCardSkeleton from "@/components/NewsCardSkeleton";
import { useLanguage } from "@/contexts/LanguageContext";

const viralItems = [
  {
    title: "Viral Video: Baby Elephant's Heartwarming Reunion With Mother",
    source: "Social Buzz",
    imageUrl: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=600&h=400&fit=crop",
    timeAgo: "2 hours ago",
    excerpt: "The touching moment captured at a wildlife sanctuary has garnered millions of views.",
    url: "https://twitter.com/trending",
  },
  {
    title: "Internet Reacts to Chef's Unique Fusion Recipe Creation",
    source: "Trending Now",
    imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
    timeAgo: "4 hours ago",
    url: "https://twitter.com/trending",
  },
  {
    title: "Street Artist's 3D Painting Leaves Viewers Stunned",
    source: "Viral Feed",
    imageUrl: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600&h=400&fit=crop",
    timeAgo: "5 hours ago",
    url: "https://twitter.com/trending",
  },
  {
    title: "Grandmother's Dance Performance Goes Viral on Social Media",
    source: "Feel Good",
    imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
    timeAgo: "6 hours ago",
    url: "https://twitter.com/trending",
  },
  {
    title: "Rescue Dog's Incredible Transformation Story Moves Millions",
    source: "Pet Lovers",
    imageUrl: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=400&fit=crop",
    timeAgo: "8 hours ago",
    url: "https://twitter.com/trending",
  },
  {
    title: "Teacher's Creative Math Lesson Becomes Internet Sensation",
    source: "Education Today",
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=400&fit=crop",
    timeAgo: "10 hours ago",
    url: "https://twitter.com/trending",
  },
];

const Viral = () => {
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
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
              Viral
            </h1>
            <div className="px-2.5 py-1 rounded-full bg-red-500/10 text-red-500 text-xs font-medium">
              🔥 Trending
            </div>
          </div>
          <p className="text-muted-foreground">
            Showing viral content in {languageLabels[selectedLanguage]}
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <NewsCardSkeleton isLarge />
            {Array.from({ length: 5 }).map((_, i) => (
              <NewsCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {viralItems.map((item, index) => (
              <NewsCard key={index} {...item} isLarge={index === 0} />
            ))}
          </div>
        )}

        {!loading && (
          <div className="mt-8 text-center">
            <button className="px-8 py-3 border border-primary text-primary font-medium 
                             rounded-lg hover:bg-primary hover:text-primary-foreground 
                             transition-colors duration-200">
              Load More Viral Content
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Viral;
