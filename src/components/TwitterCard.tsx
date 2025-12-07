import { Heart, Repeat2, ExternalLink, BadgeCheck } from "lucide-react";

interface TwitterCardProps {
  name: string;
  handle: string;
  text: string;
  likes: number;
  retweets: number;
  imageUrl?: string;
  verified?: boolean;
  url: string;
  timeAgo: string;
}

const TwitterCard = ({ name, handle, text, likes, retweets, imageUrl, verified, url, timeAgo }: TwitterCardProps) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="news-card group cursor-pointer block"
    >
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-bold text-primary">{name.charAt(0)}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <span className="font-semibold text-foreground text-sm truncate">{name}</span>
              {verified && <BadgeCheck size={14} className="text-primary flex-shrink-0" />}
            </div>
            <span className="text-sm text-muted-foreground">{handle}</span>
          </div>
          {/* X Logo */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">{timeAgo}</span>
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-foreground" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </div>
        </div>

        {/* Tweet Text */}
        <p className="text-foreground leading-relaxed mb-3 group-hover:text-foreground/90 transition-colors">
          {text}
        </p>

        {/* Image */}
        {imageUrl && (
          <div className="relative rounded-xl overflow-hidden mb-3 aspect-video">
            <img
              src={imageUrl}
              alt="Tweet media"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5 hover:text-[#F91880] transition-colors">
            <Heart size={16} />
            <span>{likes.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1.5 hover:text-[#00BA7C] transition-colors">
            <Repeat2 size={16} />
            <span>{retweets.toLocaleString()}</span>
          </div>
          <ExternalLink size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </a>
  );
};

export default TwitterCard;
