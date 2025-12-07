interface NewsCardSkeletonProps {
  isLarge?: boolean;
}

const NewsCardSkeleton = ({ isLarge = false }: NewsCardSkeletonProps) => {
  return (
    <div className={`news-card ${isLarge ? "col-span-full md:col-span-2" : ""}`}>
      {/* Image Skeleton */}
      <div className={`relative overflow-hidden bg-muted animate-pulse ${isLarge ? "aspect-[21/9]" : "aspect-video"}`}>
        <div className="absolute top-3 left-3">
          <div className="w-16 h-6 bg-muted-foreground/20 rounded" />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        <div className="space-y-2">
          <div className={`h-5 bg-muted rounded ${isLarge ? "w-3/4" : "w-full"}`} />
          <div className={`h-5 bg-muted rounded ${isLarge ? "w-1/2" : "w-2/3"}`} />
        </div>
        
        {isLarge && (
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded w-full" />
            <div className="h-4 bg-muted rounded w-4/5" />
          </div>
        )}

        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-muted rounded-full" />
          <div className="w-16 h-3 bg-muted rounded" />
        </div>
      </div>
    </div>
  );
};

export default NewsCardSkeleton;
