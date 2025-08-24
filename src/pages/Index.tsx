import { useWallet } from "@/hooks/useWallet";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Technology } from "@/components/Technology";
import { Developers } from "@/components/Developers";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { PurchaseIP } from "@/components/PurchaseIP";
import PurchaseAndClaim from "@/components/PurchaseAndClaim";

const Index = () => {
  const { 
    isConnected, 
    account, 
    isConnecting, 
    isInstalled, 
    connectWallet, 
    disconnectWallet 
  } = useWallet();

  const handleGetStarted = () => {
    if (!isConnected) {
      connectWallet();
    } else {
      // Navigate to dashboard or next step
      const featuresSection = document.getElementById('features');
      if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLearnMore = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleConnectWallet = () => {
    if (isConnected) {
      disconnectWallet();
    } else {
      connectWallet();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onConnectWallet={handleConnectWallet}
        isWalletConnected={isConnected}
        walletAddress={account || undefined}
        isConnecting={isConnecting}
      />
      
      <main>
        <Hero 
          onGetStarted={handleGetStarted}
          onLearnMore={handleLearnMore}
        />
        <Features />
        <Technology />
        <Developers />
        <PurchaseAndClaim />
        <PurchaseIP />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
