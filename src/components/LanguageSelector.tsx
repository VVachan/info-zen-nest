import { X, Check } from "lucide-react";

interface Language {
  code: string;
  name: string;
  nativeName: string;
}

const languages: Language[] = [
  { code: "hi", name: "Hindi", nativeName: "हिंदी" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ" },
  { code: "en", name: "English", nativeName: "English" },
  { code: "mr", name: "Marathi", nativeName: "मराठी" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી" },
  { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ" },
  { code: "or", name: "Odia", nativeName: "ଓଡ଼ିଆ" },
  { code: "ur", name: "Urdu", nativeName: "اردو" },
  { code: "bh", name: "Bhojpuri", nativeName: "भोजपुरी" },
  { code: "ne", name: "Nepali", nativeName: "नेपाली" },
  { code: "as", name: "Assamese", nativeName: "অসমীয়া" },
];

const badgeColors: Record<string, string> = {
  hi: "bg-lang-hi",
  te: "bg-lang-te",
  ta: "bg-lang-ta",
  ml: "bg-lang-ml",
  kn: "bg-lang-kn",
  en: "bg-lang-en",
  mr: "bg-lang-mr",
  bn: "bg-lang-bn",
  gu: "bg-lang-gu",
  pa: "bg-lang-pa",
  or: "bg-lang-or",
  ur: "bg-lang-ur",
  bh: "bg-lang-bh",
  ne: "bg-lang-ne",
  as: "bg-lang-as",
};

interface LanguageSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLanguage: string;
  onSelectLanguage: (code: string) => void;
}

const LanguageSelector = ({
  isOpen,
  onClose,
  selectedLanguage,
  onSelectLanguage,
}: LanguageSelectorProps) => {
  if (!isOpen) return null;

  const handleSelect = (code: string) => {
    onSelectLanguage(code);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-card rounded-xl shadow-2xl w-full max-w-md mx-4 animate-scale-in overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">
            Select preferred languages
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full 
                       hover:bg-muted text-muted-foreground hover:text-foreground 
                       transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Languages Grid */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-3">
            {languages.map((lang) => {
              const isSelected = selectedLanguage === lang.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => handleSelect(lang.code)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-full border 
                             transition-all duration-200 text-left
                             ${
                               isSelected
                                 ? "bg-primary border-primary text-primary-foreground"
                                 : "bg-card border-border hover:border-primary/50 text-card-foreground"
                             }`}
                >
                  {/* Language Code Badge */}
                  <span
                    className={`w-8 h-8 flex items-center justify-center rounded-full 
                               text-xs font-bold text-primary-foreground
                               ${isSelected ? "bg-primary-foreground/20" : badgeColors[lang.code]}`}
                  >
                    {lang.code}
                  </span>
                  
                  {/* Language Name */}
                  <span className="flex-1 font-medium text-sm">
                    {lang.nativeName}
                  </span>

                  {/* Check mark for selected */}
                  {isSelected && (
                    <Check size={18} className="text-primary-foreground" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border bg-muted/30">
          <button
            onClick={onClose}
            className="btn-primary"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;
