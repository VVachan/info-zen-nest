import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import NewsCard from "@/components/NewsCard";
import NewsCardSkeleton from "@/components/NewsCardSkeleton";
import FilterPills from "@/components/FilterPills";
import EmptyState from "@/components/EmptyState";
import { useLanguage } from "@/contexts/LanguageContext";

const filterLabels: Record<string, string> = {
  all: "All",
  breaking: "Breaking News",
  sports: "Sports",
  fitness: "Fitness & Health",
  entertainment: "Films & Entertainment",
  music: "Music & Songs",
  technology: "Technology",
  education: "Education",
  trading: "Trading & Stock Market",
  banking: "Banking & Finance",
  business: "Business",
  politics: "Politics",
  science: "Science",
  startups: "Startups",
};

// Sample news data with URLs for external redirection
const allNewsItems = [
  {
    title: "Major Economic Reforms Announced: Government Unveils New Policies to Boost Growth",
    source: "Economic Times",
    imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&h=600&fit=crop",
    timeAgo: "2 hours ago",
    excerpt: "The government has announced a comprehensive package of economic reforms aimed at accelerating growth and creating employment opportunities across various sectors.",
    url: "https://economictimes.indiatimes.com/",
    category: "business",
  },
  {
    title: "Tech Giants Report Record Quarterly Earnings",
    source: "Business Today",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop",
    timeAgo: "3 hours ago",
    url: "https://www.businesstoday.in/",
    category: "technology",
  },
  {
    title: "New Education Policy: Schools to Adopt Revised Curriculum",
    source: "India Today",
    imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop",
    timeAgo: "4 hours ago",
    url: "https://www.indiatoday.in/",
    category: "education",
  },
  {
    title: "Cricket: India Secures Historic Victory in Test Series",
    source: "Sports Star",
    imageUrl: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&h=400&fit=crop",
    timeAgo: "5 hours ago",
    url: "https://sportstar.thehindu.com/",
    category: "sports",
  },
  {
    title: "Climate Summit: Leaders Pledge Ambitious Carbon Targets",
    source: "The Hindu",
    imageUrl: "https://images.unsplash.com/photo-1569163139599-0f4517e36f51?w=600&h=400&fit=crop",
    timeAgo: "6 hours ago",
    url: "https://www.thehindu.com/",
    category: "science",
  },
  {
    title: "Healthcare Revolution: AI-Powered Diagnostics Launch Nationwide",
    source: "Health Wire",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop",
    timeAgo: "7 hours ago",
    url: "https://www.healthwire.co/",
    category: "fitness",
  },
  {
    title: "Startup Ecosystem Thrives: Record Funding in Q4",
    source: "Mint",
    imageUrl: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop",
    timeAgo: "8 hours ago",
    url: "https://www.livemint.com/",
    category: "startups",
  },
  {
    title: "RBI Announces New Banking Regulations for Digital Payments",
    source: "Financial Express",
    imageUrl: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=600&h=400&fit=crop",
    timeAgo: "9 hours ago",
    url: "https://www.financialexpress.com/",
    category: "banking",
  },
  {
    title: "Stock Market Hits All-Time High Amid Global Optimism",
    source: "Moneycontrol",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop",
    timeAgo: "10 hours ago",
    url: "https://www.moneycontrol.com/",
    category: "trading",
  },
  {
    title: "Parliament Passes Historic Digital Privacy Bill",
    source: "NDTV",
    imageUrl: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=600&h=400&fit=crop",
    timeAgo: "11 hours ago",
    url: "https://www.ndtv.com/",
    category: "politics",
  },
  {
    title: "Bollywood Blockbuster Breaks Box Office Records",
    source: "Film Companion",
    imageUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&h=400&fit=crop",
    timeAgo: "12 hours ago",
    url: "https://www.filmcompanion.in/",
    category: "entertainment",
  },
  {
    title: "New Album Release Takes Music Charts by Storm",
    source: "Rolling Stone India",
    imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=400&fit=crop",
    timeAgo: "13 hours ago",
    url: "https://rollingstoneindia.com/",
    category: "music",
  },
];

const Index = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const { selectedLanguage, languageLabels, isLoading: langLoading } = useLanguage();

  const handleFilterChange = (filterId: string) => {
    setIsLoading(true);
    setActiveFilter(filterId);
    setTimeout(() => setIsLoading(false), 600);
  };

  useEffect(() => {
    if (langLoading) {
      setIsLoading(true);
    } else {
      const timer = setTimeout(() => setIsLoading(false), 400);
      return () => clearTimeout(timer);
    }
  }, [langLoading]);

  const filteredNews = activeFilter === "all" 
    ? allNewsItems 
    : allNewsItems.filter(item => item.category === activeFilter);

  const loading = isLoading || langLoading;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="mb-4">
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
              For You
            </h1>
            <div className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
              Recommended for you
            </div>
          </div>
          <p className="text-muted-foreground">
            Showing content in {languageLabels[selectedLanguage]}
            {activeFilter !== "all" && (
              <span className="ml-2 text-primary font-medium">
                • Filtered by {filterLabels[activeFilter]}
              </span>
            )}
          </p>
        </div>

        {/* Filter Pills */}
        <FilterPills activeFilter={activeFilter} onFilterChange={handleFilterChange} />

        {/* News Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <NewsCardSkeleton isLarge />
            {Array.from({ length: 5 }).map((_, i) => (
              <NewsCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredNews.length === 0 ? (
          <EmptyState 
            title="No news available for this category" 
            description="Try selecting a different category or check back later"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Featured News - Large Card */}
            <NewsCard {...filteredNews[0]} isLarge />

            {/* Regular News Cards */}
            {filteredNews.slice(1).map((item, index) => (
              <NewsCard key={index} {...item} />
            ))}
          </div>
        )}

        {/* Load More */}
        {!loading && filteredNews.length > 0 && (
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

export default Index;
