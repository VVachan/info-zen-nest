import { ArrowUp, MessageSquare, ExternalLink } from "lucide-react";

interface RedditCardProps {
  title: string;
  subreddit: string;
  upvotes: number;
  comments: number;
  preview?: string;
  url: string;
  timeAgo: string;
}

const RedditCard = ({ title, subreddit, upvotes, comments, preview, url, timeAgo }: RedditCardProps) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="news-card group cursor-pointer block"
    >
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          {/* Reddit Icon */}
          <div className="w-8 h-8 rounded-full bg-[#FF4500] flex items-center justify-center flex-shrink-0">
            <svg viewBox="0 0 20 20" className="w-5 h-5 text-white" fill="currentColor">
              <path d="M16.5 8.5a2 2 0 1 0-3.9.8c-1.4-.4-2.7-.9-3.6-1.6.3-.5.4-1.1.4-1.7 0-1.5-1-2.5-2.4-2.5S4.6 4.5 4.6 6c0 .6.2 1.2.5 1.6C4 8.5 3 9.6 3 11c0 2.8 3.6 5 8 5s8-2.2 8-5c0-1.4-1-2.5-2.5-2.5zm-9 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm-.5 2c-.8.8-2 1-3 1s-2.2-.2-3-1c-.2-.2-.2-.5 0-.7.2-.2.5-.2.7 0 .5.5 1.4.7 2.3.7s1.8-.2 2.3-.7c.2-.2.5-.2.7 0 .2.2.2.5 0 .7z"/>
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-sm font-medium text-foreground">{subreddit}</span>
            <span className="text-xs text-muted-foreground ml-2">• {timeAgo}</span>
          </div>
          <ExternalLink size={14} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Title */}
        <h3 className="text-base font-semibold text-foreground leading-snug mb-2 
                       group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>

        {/* Preview */}
        {preview && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {preview}
          </p>
        )}

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <ArrowUp size={14} className="text-[#FF4500]" />
            <span>{upvotes.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare size={14} />
            <span>{comments}</span>
          </div>
        </div>
      </div>
    </a>
  );
};

export default RedditCard;
