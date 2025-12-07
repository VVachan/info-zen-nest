import { Clock, ExternalLink } from "lucide-react";

interface NewsCardProps {
  title: string;
  source: string;
  imageUrl: string;
  timeAgo: string;
  excerpt?: string;
  isLarge?: boolean;
  url?: string;
}

const NewsCard = ({ title, source, imageUrl, timeAgo, excerpt, isLarge = false, url }: NewsCardProps) => {
  const CardWrapper = url ? "a" : "div";
  const wrapperProps = url ? { 
    href: url, 
    target: "_blank", 
    rel: "noopener noreferrer" 
  } : {};

  return (
    <CardWrapper
      {...wrapperProps}
      className={`news-card group cursor-pointer block ${isLarge ? "col-span-full md:col-span-2" : ""}`}
    >
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
        {/* External Link Icon */}
        {url && (
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="p-1.5 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center">
              <ExternalLink size={12} className="text-card-foreground" />
            </span>
          </div>
        )}
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
    </CardWrapper>
  );
};

export default NewsCard;
