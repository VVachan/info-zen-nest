import Layout from "@/components/Layout";
import NewsCard from "@/components/NewsCard";
import { TrendingUp } from "lucide-react";

const viralItems = [
  {
    title: "Viral Video: Baby Elephant's Heartwarming Reunion With Mother",
    source: "Social Buzz",
    imageUrl: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=600&h=400&fit=crop",
    timeAgo: "2 hours ago",
    excerpt: "The touching moment captured at a wildlife sanctuary has garnered millions of views.",
  },
  {
    title: "Internet Reacts to Chef's Unique Fusion Recipe Creation",
    source: "Trending Now",
    imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
    timeAgo: "4 hours ago",
  },
  {
    title: "Street Artist's 3D Painting Leaves Viewers Stunned",
    source: "Viral Feed",
    imageUrl: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600&h=400&fit=crop",
    timeAgo: "5 hours ago",
  },
  {
    title: "Grandmother's Dance Performance Goes Viral on Social Media",
    source: "Feel Good",
    imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
    timeAgo: "6 hours ago",
  },
  {
    title: "Rescue Dog's Incredible Transformation Story Moves Millions",
    source: "Pet Lovers",
    imageUrl: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=400&fit=crop",
    timeAgo: "8 hours ago",
  },
  {
    title: "Teacher's Creative Math Lesson Becomes Internet Sensation",
    source: "Education Today",
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=400&fit=crop",
    timeAgo: "10 hours ago",
  },
];

const Viral = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6 flex items-center gap-3">
          <TrendingUp className="text-primary" size={28} />
          <div>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
              Viral
            </h1>
            <p className="text-muted-foreground mt-1">
              Trending stories everyone is talking about
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {viralItems.map((item, index) => (
            <NewsCard key={index} {...item} isLarge={index === 0} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <button className="px-8 py-3 border border-primary text-primary font-medium 
                           rounded-lg hover:bg-primary hover:text-primary-foreground 
                           transition-colors duration-200">
            Load More Viral Content
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Viral;
