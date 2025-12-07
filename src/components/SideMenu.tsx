import { Info, HelpCircle, Mail } from "lucide-react";
import { Link } from "react-router-dom";

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { icon: Info, label: "About", href: "/about" },
  { icon: HelpCircle, label: "Help", href: "/help" },
  { icon: Mail, label: "Contact", href: "/contact" },
];

const SideMenu = ({ isOpen, onClose }: SideMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[90]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Slide-out Panel */}
      <div className="absolute right-0 top-14 bottom-0 w-64 bg-card shadow-xl animate-slide-in">
        <div className="p-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
            Menu
          </h3>
          
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-3 rounded-lg 
                          text-card-foreground hover:bg-muted transition-colors"
              >
                <item.icon size={18} className="text-muted-foreground" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            © 2024 Newshunt. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
