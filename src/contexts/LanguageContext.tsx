import { createContext, useContext, useState, ReactNode } from "react";

interface LanguageContextType {
  selectedLanguage: string;
  setSelectedLanguage: (code: string) => void;
  languageLabels: Record<string, string>;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const languageLabels: Record<string, string> = {
  hi: "हिंदी",
  te: "తెలుగు",
  ta: "தமிழ்",
  ml: "മലയാളം",
  kn: "ಕನ್ನಡ",
  en: "English",
  mr: "मराठी",
  bn: "বাংলা",
  gu: "ગુજરાતી",
  pa: "ਪੰਜਾਬੀ",
  or: "ଓଡ଼ିଆ",
  ur: "اردو",
  bh: "भोजपुरी",
  ne: "नेपाली",
  as: "অসমীয়া",
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [isLoading, setIsLoading] = useState(false);

  const handleSetLanguage = (code: string) => {
    setIsLoading(true);
    setSelectedLanguage(code);
    // Simulate loading
    setTimeout(() => setIsLoading(false), 800);
  };

  return (
    <LanguageContext.Provider
      value={{
        selectedLanguage,
        setSelectedLanguage: handleSetLanguage,
        languageLabels,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};
