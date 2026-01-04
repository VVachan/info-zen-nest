import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import NewsCard from "@/components/NewsCard";
import NewsCardSkeleton from "@/components/NewsCardSkeleton";
import FilterPills from "@/components/FilterPills";
import EmptyState from "@/components/EmptyState";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from "@/lib/translations";

const filterLabels: Record<string, string> = {
  all: "All",
  breaking: "Breaking News",
  sports: "Sports",
  fitness: "Fitness & Health",
  films: "Films",
  music: "Music",
  technology: "Technology",
  education: "Education",
  trading: "Trading",
  business: "Business",
  politics: "Politics",
  science: "Science",
};

// Sample news data with URLs for external redirection
const allNewsItems = [
  {
    title: "Breaking: Major Political Development Rocks the Nation",
    source: "NDTV",
    imageUrl: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200&h=600&fit=crop",
    timeAgo: "10 mins ago",
    excerpt: "In a stunning turn of events, major political changes are underway that could reshape the political landscape.",
    url: "https://www.ndtv.com/",
    category: "breaking",
  },
  {
    title: "Emergency Alert: Severe Weather Warning Issued",
    source: "India Today",
    imageUrl: "https://images.unsplash.com/photo-1527482797697-8795b05a13fe?w=600&h=400&fit=crop",
    timeAgo: "25 mins ago",
    url: "https://www.indiatoday.in/",
    category: "breaking",
  },
  {
    title: "Cricket: India Secures Historic Victory in Test Series",
    source: "Sports Star",
    imageUrl: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&h=400&fit=crop",
    timeAgo: "1 hour ago",
    url: "https://sportstar.thehindu.com/",
    category: "sports",
  },
  {
    title: "IPL 2024: Top Players to Watch This Season",
    source: "ESPN Cricinfo",
    imageUrl: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&h=400&fit=crop",
    timeAgo: "2 hours ago",
    url: "https://www.espncricinfo.com/",
    category: "sports",
  },
  {
    title: "New Fitness Trends: HIIT Workouts Gain Popularity",
    source: "Health Wire",
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
    timeAgo: "3 hours ago",
    url: "https://www.healthwire.co/",
    category: "fitness",
  },
  {
    title: "Yoga and Mental Health: The Science Behind It",
    source: "Wellness Today",
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop",
    timeAgo: "4 hours ago",
    url: "https://www.wellnesstoday.com/",
    category: "fitness",
  },
  {
    title: "Bollywood Blockbuster Breaks Box Office Records",
    source: "Film Companion",
    imageUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&h=400&fit=crop",
    timeAgo: "5 hours ago",
    url: "https://www.filmcompanion.in/",
    category: "films",
  },
  {
    title: "Upcoming Movies: Most Anticipated Releases of 2024",
    source: "Bollywood Hungama",
    imageUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&h=400&fit=crop",
    timeAgo: "6 hours ago",
    url: "https://www.bollywoodhungama.com/",
    category: "films",
  },
  {
    title: "New Album Release Takes Music Charts by Storm",
    source: "Rolling Stone India",
    imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=400&fit=crop",
    timeAgo: "7 hours ago",
    url: "https://rollingstoneindia.com/",
    category: "music",
  },
  {
    title: "Classical Music Revival: Young Artists Lead the Way",
    source: "Music Today",
    imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
    timeAgo: "8 hours ago",
    url: "https://www.musictoday.com/",
    category: "music",
  },
  {
    title: "Tech Giants Report Record Quarterly Earnings",
    source: "Business Today",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop",
    timeAgo: "9 hours ago",
    url: "https://www.businesstoday.in/",
    category: "technology",
  },
  {
    title: "AI Revolution: How Machine Learning is Changing Industries",
    source: "TechCrunch",
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop",
    timeAgo: "10 hours ago",
    url: "https://techcrunch.com/",
    category: "technology",
  },
  {
    title: "New Education Policy: Schools to Adopt Revised Curriculum",
    source: "India Today",
    imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop",
    timeAgo: "11 hours ago",
    url: "https://www.indiatoday.in/",
    category: "education",
  },
  {
    title: "Online Learning Platforms See Massive Growth",
    source: "Education World",
    imageUrl: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&h=400&fit=crop",
    timeAgo: "12 hours ago",
    url: "https://www.educationworld.in/",
    category: "education",
  },
  {
    title: "Stock Market Hits All-Time High Amid Global Optimism",
    source: "Moneycontrol",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop",
    timeAgo: "1 hour ago",
    url: "https://www.moneycontrol.com/",
    category: "trading",
  },
  {
    title: "Cryptocurrency Markets Rally: Bitcoin Crosses $70K",
    source: "Economic Times",
    imageUrl: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=600&h=400&fit=crop",
    timeAgo: "2 hours ago",
    url: "https://economictimes.indiatimes.com/",
    category: "trading",
  },
  {
    title: "Startup Ecosystem Thrives: Record Funding in Q4",
    source: "Mint",
    imageUrl: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop",
    timeAgo: "3 hours ago",
    url: "https://www.livemint.com/",
    category: "business",
  },
  {
    title: "Major Companies Report Strong Quarterly Earnings",
    source: "Business Standard",
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop",
    timeAgo: "4 hours ago",
    url: "https://www.business-standard.com/",
    category: "business",
  },
  {
    title: "Parliament Passes Historic Digital Privacy Bill",
    source: "NDTV",
    imageUrl: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=600&h=400&fit=crop",
    timeAgo: "5 hours ago",
    url: "https://www.ndtv.com/",
    category: "politics",
  },
  {
    title: "Election 2024: Key Candidates Announce Campaigns",
    source: "The Hindu",
    imageUrl: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=600&h=400&fit=crop",
    timeAgo: "6 hours ago",
    url: "https://www.thehindu.com/",
    category: "politics",
  },
  {
    title: "Scientists Discover New Species in Deep Ocean",
    source: "Science Daily",
    imageUrl: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&h=400&fit=crop",
    timeAgo: "7 hours ago",
    url: "https://www.sciencedaily.com/",
    category: "science",
  },
  {
    title: "Space Telescope Captures Stunning Images of Distant Galaxy",
    source: "NASA",
    imageUrl: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=600&h=400&fit=crop",
    timeAgo: "8 hours ago",
    url: "https://www.nasa.gov/",
    category: "science",
  },
];

// Additional news for load more
const moreNewsItems = [
  {
    title: "Breaking: Stock Markets React to Global Events",
    source: "Moneycontrol",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop",
    timeAgo: "13 hours ago",
    url: "https://www.moneycontrol.com/",
    category: "breaking",
  },
  {
    title: "Football: Premier League Weekend Highlights",
    source: "Goal",
    imageUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=400&fit=crop",
    timeAgo: "14 hours ago",
    url: "https://www.goal.com/",
    category: "sports",
  },
  {
    title: "Diet Trends: What Nutritionists Recommend",
    source: "Health Today",
    imageUrl: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=400&fit=crop",
    timeAgo: "15 hours ago",
    url: "https://www.healthtoday.com/",
    category: "fitness",
  },
  {
    title: "OTT Platforms: New Releases This Week",
    source: "Film Companion",
    imageUrl: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=600&h=400&fit=crop",
    timeAgo: "16 hours ago",
    url: "https://www.filmcompanion.in/",
    category: "films",
  },
  {
    title: "Indie Music Scene: Rising Artists to Follow",
    source: "Rolling Stone",
    imageUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&h=400&fit=crop",
    timeAgo: "17 hours ago",
    url: "https://rollingstoneindia.com/",
    category: "music",
  },
  {
    title: "Smartphone Wars: Latest Flagship Comparisons",
    source: "Gadgets 360",
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=400&fit=crop",
    timeAgo: "18 hours ago",
    url: "https://www.gadgets360.com/",
    category: "technology",
  },
  {
    title: "University Rankings: Top Colleges in India 2024",
    source: "Education Times",
    imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?w=600&h=400&fit=crop",
    timeAgo: "19 hours ago",
    url: "https://www.educationtimes.com/",
    category: "education",
  },
  {
    title: "Breaking: International Summit Concludes with Major Agreements",
    source: "The Hindu",
    imageUrl: "https://images.unsplash.com/photo-1569163139599-0f4517e36f51?w=600&h=400&fit=crop",
    timeAgo: "20 hours ago",
    url: "https://www.thehindu.com/",
    category: "breaking",
  },
];

const Index = () => {
  const [activeFilters, setActiveFilters] = useState<string[]>(["all"]);
  const [isLoading, setIsLoading] = useState(false);
  const [displayedNews, setDisplayedNews] = useState(allNewsItems);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const { selectedLanguage, languageLabels, isLoading: langLoading, languageVersion } = useLanguage();

  const handleFilterChange = (filterId: string) => {
    setIsLoading(true);
    setHasMore(true);
    
    let newFilters: string[];
    
    if (filterId === "all") {
      // If "All" is clicked, select only "All"
      newFilters = ["all"];
    } else {
      // Remove "all" if it was selected
      const withoutAll = activeFilters.filter(f => f !== "all");
      
      if (withoutAll.includes(filterId)) {
        // If already selected, remove it
        newFilters = withoutAll.filter(f => f !== filterId);
        // If nothing left, default to "all"
        if (newFilters.length === 0) {
          newFilters = ["all"];
        }
      } else {
        // Add the new filter
        newFilters = [...withoutAll, filterId];
      }
    }
    
    setActiveFilters(newFilters);
    
    // Filter news based on selected filters
    const filtered = newFilters.includes("all")
      ? allNewsItems
      : allNewsItems.filter(item => newFilters.includes(item.category));
    
    setTimeout(() => {
      setDisplayedNews(filtered);
      setIsLoading(false);
    }, 600);
  };

  const handleLoadMore = () => {
    setLoadingMore(true);
    
    // Simulate loading more news
    setTimeout(() => {
      const moreFiltered = activeFilters.includes("all")
        ? moreNewsItems
        : moreNewsItems.filter(item => activeFilters.includes(item.category));
      
      setDisplayedNews(prev => [...prev, ...moreFiltered]);
      setHasMore(false); // No more items after this
      setLoadingMore(false);
    }, 800);
  };

  useEffect(() => {
    if (langLoading) {
      setIsLoading(true);
    } else {
      const timer = setTimeout(() => setIsLoading(false), 400);
      return () => clearTimeout(timer);
    }
  }, [langLoading]);

  // Reset news when language changes
  useEffect(() => {
    setIsLoading(true);
    const filtered = activeFilters.includes("all")
      ? allNewsItems
      : allNewsItems.filter(item => activeFilters.includes(item.category));
    setDisplayedNews(filtered);
    setHasMore(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [languageVersion]);

  // Get selected filter labels for display
  const selectedFilterLabels = activeFilters.includes("all")
    ? null
    : activeFilters.map(f => getTranslation(f, selectedLanguage)).join(", ");

  const loading = isLoading || langLoading;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="mb-4">
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
              {getTranslation("home", selectedLanguage)}
            </h1>
            <div className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
              {getTranslation("home", selectedLanguage)}
            </div>
          </div>
          <p className="text-muted-foreground">
            {getTranslation("showingNewsIn", selectedLanguage)} {languageLabels[selectedLanguage]}
            {selectedFilterLabels && (
              <span className="ml-2 text-primary font-medium">
                • {selectedFilterLabels}
              </span>
            )}
          </p>
        </div>

        {/* Filter Pills */}
        <FilterPills activeFilters={activeFilters} onFilterChange={handleFilterChange} />

        {/* News Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <NewsCardSkeleton isLarge />
            {Array.from({ length: 5 }).map((_, i) => (
              <NewsCardSkeleton key={i} />
            ))}
          </div>
        ) : displayedNews.length === 0 ? (
          <EmptyState 
            title="No news available for this category" 
            description="Try selecting a different category or check back later"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Featured News - Large Card */}
            <NewsCard {...displayedNews[0]} isLarge />

            {/* Regular News Cards */}
            {displayedNews.slice(1).map((item, index) => (
              <NewsCard key={index} {...item} />
            ))}
          </div>
        )}

        {/* Load More */}
        {!loading && displayedNews.length > 0 && hasMore && (
          <div className="mt-8 text-center">
            <button 
              onClick={handleLoadMore}
              disabled={loadingMore}
              className="px-8 py-3 border border-primary text-primary font-medium 
                       rounded-lg hover:bg-primary hover:text-primary-foreground 
                       transition-colors duration-200 disabled:opacity-50"
            >
              {loadingMore ? "Loading..." : "Load More News"}
            </button>
          </div>
        )}

        {/* Loading More Skeleton */}
        {loadingMore && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <NewsCardSkeleton key={i} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Index;
