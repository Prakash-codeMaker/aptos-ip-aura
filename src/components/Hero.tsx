import { ArrowRight, Shield, Zap, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  onGetStarted: () => void;
  onLearnMore: () => void;
}

export const Hero = ({ onGetStarted, onLearnMore }: HeroProps) => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-surface to-background" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full glass border border-brand/30 mb-8 fade-in">
            <Zap className="w-4 h-4 text-brand mr-2" />
            <span className="text-sm font-medium">Powered by Aptos Blockchain</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 fade-in">
            Protect Your
            <span className="block gradient-text">Intellectual Property</span>
            <span className="block">On-Chain</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto slide-up">
            Secure, transparent, and global IP management powered by the Aptos blockchain. 
            Register patents, manage licenses, and collect royalties with unmatched security.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 slide-up">
            <Button onClick={onGetStarted} className="btn-hero group">
              Get Started
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button onClick={onLearnMore} variant="outline" className="btn-outline">
              Learn More
            </Button>
          </div>

          {/* Key Features Icons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto slide-up">
            <div className="flex flex-col items-center p-6 glass rounded-2xl hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 bg-gradient-brand rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Secure Registration</h3>
              <p className="text-sm text-muted-foreground text-center">
                Immutable proof of creation and ownership on the blockchain
              </p>
            </div>

            <div className="flex flex-col items-center p-6 glass rounded-2xl hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 bg-gradient-brand rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Smart Licensing</h3>
              <p className="text-sm text-muted-foreground text-center">
                Automated license management with programmable terms
              </p>
            </div>

            <div className="flex flex-col items-center p-6 glass rounded-2xl hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 bg-gradient-brand rounded-xl flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Global Royalties</h3>
              <p className="text-sm text-muted-foreground text-center">
                Instant, transparent royalty distribution worldwide
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};