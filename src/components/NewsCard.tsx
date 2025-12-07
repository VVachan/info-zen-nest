import { Clock } from "lucide-react";

interface NewsCardProps {
  title: string;
  source: string;
  imageUrl: string;
  timeAgo: string;
  excerpt?: string;
  isLarge?: boolean;
}

const NewsCard = ({ title, source, imageUrl, timeAgo, excerpt, isLarge = false }: NewsCardProps) => {
  return (
    <article className={`news-card group ${isLarge ? "col-span-full md:col-span-2" : ""}`}>
      {/* Image */}
      <div className={`relative overflow-hidden ${isLarge ? "aspect-[21/9]" : "aspect-video"}`}>
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Source Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 bg-card/90 backdrop-blur-sm rounded text-xs font-medium text-card-foreground">
            {source}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className={`font-serif font-semibold text-foreground leading-tight mb-2 
                       group-hover:text-primary transition-colors
                       ${isLarge ? "text-xl md:text-2xl" : "text-base"}`}>
          {title}
        </h3>
        
        {excerpt && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {excerpt}
          </p>
        )}

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock size={12} />
          <span>{timeAgo}</span>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;
