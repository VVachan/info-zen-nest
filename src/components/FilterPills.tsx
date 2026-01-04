import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from "@/lib/translations";

const filters = [
  { id: "all", label: "all" },
  { id: "breaking", label: "breaking" },
  { id: "sports", label: "sports" },
  { id: "fitness", label: "fitness" },
  { id: "films", label: "films" },
  { id: "music", label: "music" },
  { id: "technology", label: "technology" },
  { id: "education", label: "education" },
  { id: "trading", label: "trading" },
  { id: "business", label: "business" },
  { id: "politics", label: "politics" },
  { id: "science", label: "science" },
];

interface FilterPillsProps {
  activeFilters: string[];
  onFilterChange: (filterId: string) => void;
}

const FilterPills = ({ activeFilters, onFilterChange }: FilterPillsProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { selectedLanguage } = useLanguage();

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
          const translatedLabel = getTranslation(filter.label, selectedLanguage);
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
              {translatedLabel}
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
