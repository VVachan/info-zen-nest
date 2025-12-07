const RedditCardSkeleton = () => {
  return (
    <div className="news-card">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
          <div className="flex-1">
            <div className="h-4 w-24 bg-muted rounded animate-pulse" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2 mb-3">
          <div className="h-5 bg-muted rounded animate-pulse w-full" />
          <div className="h-5 bg-muted rounded animate-pulse w-3/4" />
        </div>

        {/* Preview */}
        <div className="space-y-2 mb-3">
          <div className="h-4 bg-muted rounded animate-pulse w-full" />
          <div className="h-4 bg-muted rounded animate-pulse w-2/3" />
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4">
          <div className="h-4 w-12 bg-muted rounded animate-pulse" />
          <div className="h-4 w-12 bg-muted rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default RedditCardSkeleton;
