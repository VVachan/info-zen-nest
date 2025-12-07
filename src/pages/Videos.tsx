import Layout from "@/components/Layout";
import { Play } from "lucide-react";

interface VideoCardProps {
  title: string;
  source: string;
  thumbnail: string;
  duration: string;
  views: string;
}

const VideoCard = ({ title, source, thumbnail, duration, views }: VideoCardProps) => {
  return (
    <article className="news-card group cursor-pointer">
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-foreground/20 
                       group-hover:bg-foreground/30 transition-colors">
          <div className="w-14 h-14 flex items-center justify-center rounded-full 
                         bg-primary text-primary-foreground shadow-lg 
                         group-hover:scale-110 transition-transform">
            <Play size={24} fill="currentColor" />
          </div>
        </div>

        {/* Duration Badge */}
        <div className="absolute bottom-2 right-2">
          <span className="px-2 py-0.5 bg-foreground/80 text-card rounded text-xs font-medium">
            {duration}
          </span>
        </div>

        {/* Source Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 bg-card/90 backdrop-blur-sm rounded text-xs font-medium text-card-foreground">
            {source}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-serif font-semibold text-foreground leading-tight 
                      group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="text-xs text-muted-foreground mt-2">
          {views} views
        </p>
      </div>
    </article>
  );
};

const videoItems = [
  {
    title: "Breaking: Prime Minister Addresses the Nation on Economic Growth",
    source: "News18",
    thumbnail: "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=600&h=400&fit=crop",
    duration: "12:34",
    views: "1.2M",
  },
  {
    title: "Inside India's Biggest Tech Park: A Visual Tour",
    source: "Tech Today",
    thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop",
    duration: "8:45",
    views: "856K",
  },
  {
    title: "Wildlife Documentary: Tigers of Ranthambore",
    source: "Nature Watch",
    thumbnail: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=600&h=400&fit=crop",
    duration: "24:15",
    views: "2.1M",
  },
  {
    title: "Cricket Highlights: India vs Australia Final",
    source: "Sports Star",
    thumbnail: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&h=400&fit=crop",
    duration: "15:20",
    views: "4.5M",
  },
  {
    title: "Street Food Journey: Best of Mumbai's Flavors",
    source: "Food Nation",
    thumbnail: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&h=400&fit=crop",
    duration: "18:30",
    views: "1.8M",
  },
  {
    title: "Heritage Walk: Exploring Ancient Temples of South India",
    source: "Travel India",
    thumbnail: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&h=400&fit=crop",
    duration: "22:10",
    views: "920K",
  },
];

const Videos = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
            Videos
          </h1>
          <p className="text-muted-foreground mt-1">
            Watch the latest video news and stories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {videoItems.map((item, index) => (
            <VideoCard key={index} {...item} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <button className="px-8 py-3 border border-primary text-primary font-medium 
                           rounded-lg hover:bg-primary hover:text-primary-foreground 
                           transition-colors duration-200">
            Load More Videos
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Videos;
