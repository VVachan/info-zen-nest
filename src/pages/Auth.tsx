import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Auth = () => {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Brand */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12">
        <div className="text-center max-w-md animate-fade-in">
          {/* Logo */}
          <div className="flex items-center justify-center mb-6">
            <svg
              width="64"
              height="64"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-foreground"
            >
              <rect x="4" y="4" width="24" height="24" rx="4" stroke="currentColor" strokeWidth="2" />
              <line x1="8" y1="10" x2="24" y2="10" stroke="currentColor" strokeWidth="2" />
              <line x1="8" y1="16" x2="20" y2="16" stroke="currentColor" strokeWidth="1.5" />
              <line x1="8" y1="21" x2="18" y2="21" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="22" cy="21" r="3" fill="hsl(var(--primary))" />
            </svg>
          </div>
          
          <h1 className="text-4xl font-serif font-bold text-foreground mb-4">
            Newshunt
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Personalized News Aggregator Website
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Stay informed with news that matters to you, in your language.
          </p>
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md animate-fade-in" style={{ animationDelay: "0.1s" }}>
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2">
              <svg
                width="40"
                height="40"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-foreground"
              >
                <rect x="4" y="4" width="24" height="24" rx="4" stroke="currentColor" strokeWidth="2" />
                <line x1="8" y1="10" x2="24" y2="10" stroke="currentColor" strokeWidth="2" />
                <line x1="8" y1="16" x2="20" y2="16" stroke="currentColor" strokeWidth="1.5" />
                <line x1="8" y1="21" x2="18" y2="21" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="22" cy="21" r="3" fill="hsl(var(--primary))" />
              </svg>
              <span className="text-xl font-serif font-bold text-foreground">Newshunt</span>
            </Link>
          </div>

          {/* Auth Card */}
          <div className="auth-card">
            {/* Tab Toggle */}
            <div className="flex bg-muted rounded-full p-1 mb-8">
              <button
                onClick={() => setActiveTab("login")}
                className={`tab-pill flex-1 ${
                  activeTab === "login" ? "tab-pill-active" : "tab-pill-inactive"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setActiveTab("signup")}
                className={`tab-pill flex-1 ${
                  activeTab === "signup" ? "tab-pill-active" : "tab-pill-inactive"
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Login Form */}
            {activeTab === "login" && (
              <form className="space-y-5 animate-fade-in">
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="input-field pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground 
                                hover:text-card-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-border text-primary 
                                focus:ring-primary focus:ring-offset-0"
                    />
                    <span className="text-sm text-muted-foreground">Remember me</span>
                  </label>
                  <a href="#" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </a>
                </div>

                <button type="submit" className="btn-primary">
                  Login
                </button>
              </form>
            )}

            {/* Sign Up Form */}
            {activeTab === "signup" && (
              <form className="space-y-5 animate-fade-in">
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      className="input-field pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground 
                                hover:text-card-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      className="input-field pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground 
                                hover:text-card-foreground transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 mt-0.5 rounded border-border text-primary 
                              focus:ring-primary focus:ring-offset-0"
                  />
                  <span className="text-sm text-muted-foreground">
                    I agree to the{" "}
                    <a href="#" className="text-primary hover:underline">
                      Terms & Conditions
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-primary hover:underline">
                      Privacy Policy
                    </a>
                  </span>
                </label>

                <button type="submit" className="btn-primary">
                  Create Account
                </button>
              </form>
            )}
          </div>

          {/* Back to Home */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            <Link to="/" className="text-primary hover:underline">
              ← Back to Newshunt
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
