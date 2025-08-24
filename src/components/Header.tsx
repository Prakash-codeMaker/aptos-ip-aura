import { useState, useEffect } from "react";
import { Menu, X, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onConnectWallet: () => void;
  isWalletConnected: boolean;
  walletAddress?: string;
  isConnecting: boolean;
}

export const Header = ({ onConnectWallet, isWalletConnected, walletAddress, isConnecting }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navItems = [
    { id: "home", label: "Home" },
    { id: "features", label: "Features" },
    { id: "technology", label: "Technology" },
    { id: "developers", label: "Developers" },
    { id: "contact", label: "Contact" }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-brand rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">IPChain</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`nav-link ${activeSection === item.id ? "active" : ""}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Wallet Connection */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              onClick={onConnectWallet}
              disabled={isConnecting}
              className={isWalletConnected ? "btn-outline" : "btn-hero"}
            >
              {isConnecting ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                  Connecting...
                </>
              ) : isWalletConnected ? (
                <>
                  <div className="w-2 h-2 bg-brand rounded-full mr-2" />
                  {formatAddress(walletAddress || "")}
                </>
              ) : (
                "Connect Wallet"
              )}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/30">
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`nav-link text-left ${activeSection === item.id ? "active" : ""}`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-3 border-t border-border/30">
                <Button
                  onClick={onConnectWallet}
                  disabled={isConnecting}
                  className={`w-full ${isWalletConnected ? "btn-outline" : "btn-hero"}`}
                >
                  {isConnecting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                      Connecting...
                    </>
                  ) : isWalletConnected ? (
                    <>
                      <div className="w-2 h-2 bg-brand rounded-full mr-2" />
                      {formatAddress(walletAddress || "")}
                    </>
                  ) : (
                    "Connect Wallet"
                  )}
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};