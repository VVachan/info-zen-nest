import { useState } from "react";
import { User, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import LanguageSelector from "./LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from "@/lib/translations";

const navTabs = [
  { id: "for-you", label: "home", path: "/" },
  { id: "news", label: "news", path: "/news" },
  { id: "viral", label: "viral", path: "/viral" },
  { id: "reddit", label: "Reddit", path: "/reddit" },
  { id: "twitter", label: "Twitter (X)", path: "/twitter" },
];

const Navbar = () => {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { selectedLanguage, setSelectedLanguage, languageLabels } = useLanguage();
  const location = useLocation();

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-navbar h-14 shadow-md">
        <div className="container h-full mx-auto px-4 flex items-center justify-between">
          {/* Left - Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center">
              <svg
                width="28"
                height="28"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-navbar-foreground"
              >
                <rect x="4" y="4" width="24" height="24" rx="4" stroke="currentColor" strokeWidth="2" />
                <line x1="8" y1="10" x2="24" y2="10" stroke="currentColor" strokeWidth="2" />
                <line x1="8" y1="16" x2="20" y2="16" stroke="currentColor" strokeWidth="1.5" />
                <line x1="8" y1="21" x2="18" y2="21" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="22" cy="21" r="3" fill="hsl(var(--primary))" />
              </svg>
              <span className="ml-2 text-lg font-semibold text-navbar-foreground tracking-tight">
                Newshunt
              </span>
            </div>
          </Link>

          {/* Center - Navigation Tabs (Desktop) */}
          <div className="hidden md:flex items-center gap-1">
            {navTabs.map((tab) => {
              const isActive = location.pathname === tab.path;
              const translatedLabel = tab.label === "Reddit" || tab.label === "Twitter (X)" 
                ? tab.label 
                : getTranslation(tab.label, selectedLanguage);
              return (
                <Link
                  key={tab.id}
                  to={tab.path}
                  className={`nav-tab ${isActive ? "nav-tab-active" : ""}`}
                >
                  {translatedLabel}
                </Link>
              );
            })}
          </div>

          {/* Right - Language & Profile */}
          <div className="flex items-center gap-3">
            {/* Language Selector Button */}
            <button
              onClick={() => setIsLanguageOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full 
                         bg-navbar-foreground/10 hover:bg-navbar-foreground/20 
                         text-navbar-foreground text-sm font-medium transition-colors"
            >
              <span className="text-xs font-bold uppercase">{selectedLanguage}</span>
              <span className="text-navbar-foreground/70">|</span>
              <span className="text-sm">{languageLabels[selectedLanguage]}</span>
            </button>

            {/* Mobile Language Button */}
            <button
              onClick={() => setIsLanguageOpen(true)}
              className="sm:hidden flex items-center justify-center w-9 h-9 rounded-full 
                         bg-navbar-foreground/10 hover:bg-navbar-foreground/20 
                         text-navbar-foreground transition-colors"
            >
              <span className="text-xs font-bold">अ</span>
            </button>

            {/* Profile/Login */}
            <Link
              to="/auth"
              className="flex items-center justify-center w-9 h-9 rounded-full 
                         bg-navbar-foreground/10 hover:bg-navbar-foreground/20 
                         text-navbar-foreground transition-colors"
            >
              <User size={18} />
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-full 
                         bg-navbar-foreground/10 hover:bg-navbar-foreground/20 
                         text-navbar-foreground transition-colors"
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-14 left-0 right-0 bg-navbar border-t border-navbar-foreground/10 animate-fade-in">
            <div className="container mx-auto px-4 py-2">
              {navTabs.map((tab) => {
                const isActive = location.pathname === tab.path;
                const translatedLabel = tab.label === "Reddit" || tab.label === "Twitter (X)" 
                  ? tab.label 
                  : getTranslation(tab.label, selectedLanguage);
                return (
                  <Link
                    key={tab.id}
                    to={tab.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block py-3 text-navbar-foreground/80 hover:text-navbar-foreground 
                               border-b border-navbar-foreground/10 last:border-0
                               ${isActive ? "text-primary font-medium" : ""}`}
                  >
                    {translatedLabel}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      {/* Language Selector Modal */}
      <LanguageSelector
        isOpen={isLanguageOpen}
        onClose={() => setIsLanguageOpen(false)}
        selectedLanguage={selectedLanguage}
        onSelectLanguage={setSelectedLanguage}
      />
    </>
  );
};

export default Navbar;
