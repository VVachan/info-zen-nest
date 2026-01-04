import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Auth = () => {
  const navigate = useNavigate();
  const { user, loading, signIn, signUp, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    const { error } = await signIn(loginEmail, loginPassword);
    setIsSubmitting(false);

    if (error) {
      setErrorMessage(error);
      return;
    }

    setSuccessMessage("Logged in successfully");
    navigate("/");
  };

  const handleSignup = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (signupPassword !== signupConfirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    setIsSubmitting(true);
    const { error } = await signUp(signupEmail, signupPassword, fullName);
    setIsSubmitting(false);

    if (error) {
      setErrorMessage(error);
      return;
    }

    setSuccessMessage("Account created. Check your email to confirm.");
    setActiveTab("login");
  };

  const handleSignOut = async () => {
    setErrorMessage(null);
    setSuccessMessage(null);
    const { error } = await signOut();
    if (error) setErrorMessage(error);
  };

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
          
          <h1 className="text-4xl font-serif font-bold text-foreground mb-4">Newshunt</h1>
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
            <div className="flex bg-muted rounded-full p-1 mb-6">
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

            {(errorMessage || successMessage) && (
              <div
                className={`mb-4 rounded-lg border px-4 py-3 text-sm ${
                  errorMessage
                    ? "border-destructive/60 bg-destructive/10 text-destructive"
                    : "border-emerald-500/50 bg-emerald-500/10 text-emerald-700"
                }`}
              >
                {errorMessage || successMessage}
              </div>
            )}

            {user ? (
              <div className="space-y-4">
                <p className="text-card-foreground">
                  Logged in as <span className="font-semibold">{user.email}</span>
                </p>
                <div className="flex gap-3">
                  <button onClick={() => navigate("/")} className="btn-primary flex-1">
                    Go to home
                  </button>
                  <button onClick={handleSignOut} className="btn-primary flex-1">
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Login Form */}
                {activeTab === "login" && (
                  <form className="space-y-5 animate-fade-in" onSubmit={handleLogin}>
                    <div>
                      <label className="block text-sm font-medium text-card-foreground mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="input-field"
                        required
                        disabled={isSubmitting || loading}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-card-foreground mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          placeholder="Enter your password"
                          className="input-field pr-12"
                          required
                          disabled={isSubmitting || loading}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-card-foreground transition-colors"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-border text-primary focus:ring-primary focus:ring-offset-0"
                          disabled
                        />
                        <span className="text-sm text-muted-foreground">Remember me</span>
                      </label>
                      <a href="https://supabase.com/docs/guides/auth" className="text-sm text-primary hover:underline" target="_blank" rel="noreferrer">
                        Forgot password?
                      </a>
                    </div>

                    <button type="submit" className="btn-primary" disabled={isSubmitting || loading}>
                      {isSubmitting ? "Working..." : "Login"}
                    </button>
                  </form>
                )}

                {/* Sign Up Form */}
                {activeTab === "signup" && (
                  <form className="space-y-5 animate-fade-in" onSubmit={handleSignup}>
                    <div>
                      <label className="block text-sm font-medium text-card-foreground mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter your full name"
                        className="input-field"
                        disabled={isSubmitting || loading}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-card-foreground mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="input-field"
                        required
                        disabled={isSubmitting || loading}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-card-foreground mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={signupPassword}
                          onChange={(e) => setSignupPassword(e.target.value)}
                          placeholder="Create a password"
                          className="input-field pr-12"
                          required
                          disabled={isSubmitting || loading}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-card-foreground transition-colors"
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
                          value={signupConfirmPassword}
                          onChange={(e) => setSignupConfirmPassword(e.target.value)}
                          placeholder="Confirm your password"
                          className="input-field pr-12"
                          required
                          disabled={isSubmitting || loading}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-card-foreground transition-colors"
                        >
                          {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>

                    <label className="flex items-start gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 mt-0.5 rounded border-border text-primary focus:ring-primary focus:ring-offset-0"
                        required
                        disabled={isSubmitting || loading}
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

                    <button type="submit" className="btn-primary" disabled={isSubmitting || loading}>
                      {isSubmitting ? "Working..." : "Create Account"}
                    </button>
                  </form>
                )}
              </>
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
