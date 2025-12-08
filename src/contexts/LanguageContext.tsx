import { createContext, useContext, useState, ReactNode, useCallback } from "react";

interface LanguageContextType {
  selectedLanguage: string;
  setSelectedLanguage: (code: string) => void;
  languageLabels: Record<string, string>;
  isLoading: boolean;
  languageVersion: number;
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

const LANGUAGE_STORAGE_KEY = "newshunt_language";

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [selectedLanguage, setSelectedLanguageState] = useState(() => {
    try {
      const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      return saved || "en";
    } catch {
      return "en";
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [languageVersion, setLanguageVersion] = useState(0);

  const setSelectedLanguage = useCallback((code: string) => {
    if (code === selectedLanguage) return;
    
    setIsLoading(true);
    setSelectedLanguageState(code);
    setLanguageVersion(v => v + 1);
    
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, code);
    } catch (e) {
      console.warn("Could not save language preference");
    }
    
    // Simulate loading for content refresh
    setTimeout(() => setIsLoading(false), 800);
  }, [selectedLanguage]);

  return (
    <LanguageContext.Provider
      value={{
        selectedLanguage,
        setSelectedLanguage,
        languageLabels,
        isLoading,
        languageVersion,
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
