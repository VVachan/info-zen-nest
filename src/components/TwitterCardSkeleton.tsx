const TwitterCardSkeleton = () => {
  return (
    <div className="news-card">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-muted animate-pulse" />
          <div className="flex-1 space-y-1">
            <div className="h-4 w-28 bg-muted rounded animate-pulse" />
            <div className="h-3 w-20 bg-muted rounded animate-pulse" />
          </div>
          <div className="w-4 h-4 bg-muted rounded animate-pulse" />
        </div>

        {/* Text */}
        <div className="space-y-2 mb-3">
          <div className="h-4 bg-muted rounded animate-pulse w-full" />
          <div className="h-4 bg-muted rounded animate-pulse w-full" />
          <div className="h-4 bg-muted rounded animate-pulse w-2/3" />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <div className="h-4 w-14 bg-muted rounded animate-pulse" />
          <div className="h-4 w-14 bg-muted rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default TwitterCardSkeleton;
