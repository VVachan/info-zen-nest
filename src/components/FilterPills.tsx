import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const filters = [
  { id: "all", label: "All" },
  { id: "breaking", label: "Breaking News" },
  { id: "sports", label: "Sports" },
  { id: "fitness", label: "Fitness & Health" },
  { id: "films", label: "Films" },
  { id: "music", label: "Music" },
  { id: "technology", label: "Technology" },
  { id: "education", label: "Education" },
  { id: "trading", label: "Trading" },
  { id: "business", label: "Business" },
  { id: "politics", label: "Politics" },
  { id: "science", label: "Science" },
];

interface FilterPillsProps {
  activeFilters: string[];
  onFilterChange: (filterId: string) => void;
}

const FilterPills = ({ activeFilters, onFilterChange }: FilterPillsProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative flex items-center gap-2 mb-4">
      {/* Left Arrow */}
      <button
        onClick={() => scroll("left")}
        className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full 
                   bg-card border border-border shadow-sm hover:bg-muted 
                   transition-colors flex-shrink-0"
      >
        <ChevronLeft size={18} className="text-foreground" />
      </button>

      {/* Scrollable Pills */}
      <div
        ref={scrollRef}
        className="flex items-center gap-2 overflow-x-auto scrollbar-hide scroll-smooth flex-1"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {filters.map((filter) => {
          const isActive = activeFilters.includes(filter.id);
          return (
            <button
              key={filter.id}
              onClick={() => onFilterChange(filter.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap 
                         transition-all duration-200 flex-shrink-0
                         ${
                           isActive
                             ? "bg-primary text-primary-foreground shadow-sm"
                             : "bg-card border border-border text-foreground hover:border-primary/50"
                         }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => scroll("right")}
        className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full 
                   bg-card border border-border shadow-sm hover:bg-muted 
                   transition-colors flex-shrink-0"
      >
        <ChevronRight size={18} className="text-foreground" />
      </button>
    </div>
  );
};

export default FilterPills;
