import Layout from "@/components/Layout";
import NewsCard from "@/components/NewsCard";

// Sample news data
const featuredNews = {
  title: "Major Economic Reforms Announced: Government Unveils New Policies to Boost Growth",
  source: "Economic Times",
  imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&h=600&fit=crop",
  timeAgo: "2 hours ago",
  excerpt: "The government has announced a comprehensive package of economic reforms aimed at accelerating growth and creating employment opportunities across various sectors.",
};

const newsItems = [
  {
    title: "Tech Giants Report Record Quarterly Earnings",
    source: "Business Today",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop",
    timeAgo: "3 hours ago",
  },
  {
    title: "New Education Policy: Schools to Adopt Revised Curriculum",
    source: "India Today",
    imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop",
    timeAgo: "4 hours ago",
  },
  {
    title: "Cricket: India Secures Historic Victory in Test Series",
    source: "Sports Star",
    imageUrl: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&h=400&fit=crop",
    timeAgo: "5 hours ago",
  },
  {
    title: "Climate Summit: Leaders Pledge Ambitious Carbon Targets",
    source: "The Hindu",
    imageUrl: "https://images.unsplash.com/photo-1569163139599-0f4517e36f51?w=600&h=400&fit=crop",
    timeAgo: "6 hours ago",
  },
  {
    title: "Healthcare Revolution: AI-Powered Diagnostics Launch Nationwide",
    source: "Health Wire",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop",
    timeAgo: "7 hours ago",
  },
  {
    title: "Startup Ecosystem Thrives: Record Funding in Q4",
    source: "Mint",
    imageUrl: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop",
    timeAgo: "8 hours ago",
  },
];

const Index = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
            For You
          </h1>
          <p className="text-muted-foreground mt-1">
            Personalized news based on your interests
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Featured News - Large Card */}
          <NewsCard {...featuredNews} isLarge />

          {/* Regular News Cards */}
          {newsItems.map((item, index) => (
            <NewsCard key={index} {...item} />
          ))}
        </div>

        {/* Load More */}
        <div className="mt-8 text-center">
          <button className="px-8 py-3 border border-primary text-primary font-medium 
                           rounded-lg hover:bg-primary hover:text-primary-foreground 
                           transition-colors duration-200">
            Load More News
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
