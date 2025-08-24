import { FileText, Key, Coins, Users, Lock, Zap } from "lucide-react";

export const Features = () => {
  const features = [
    {
      icon: FileText,
      title: "IP Registration",
      description: "Register patents, trademarks, copyrights, and trade secrets with cryptographic proof of creation and ownership.",
      benefits: ["Immutable timestamps", "Global recognition", "Fraud protection"]
    },
    {
      icon: Key,
      title: "Smart Licensing",
      description: "Create programmable licenses with automated enforcement, usage tracking, and compliance monitoring.",
      benefits: ["Automated terms", "Usage analytics", "Compliance alerts"]
    },
    {
      icon: Coins,
      title: "Royalty Distribution",
      description: "Instant, transparent royalty payments to creators and stakeholders based on smart contract rules.",
      benefits: ["Real-time payments", "Multi-party splits", "Tax compliance"]
    },
    {
      icon: Users,
      title: "Collaboration Tools",
      description: "Secure sharing and collaboration on IP projects with granular access controls and audit trails.",
      benefits: ["Team management", "Version control", "Access logs"]
    },
    {
      icon: Lock,
      title: "Privacy Protection",
      description: "Keep sensitive IP details private while maintaining public proof of ownership and creation dates.",
      benefits: ["Zero-knowledge proofs", "Selective disclosure", "Privacy by design"]
    },
    {
      icon: Zap,
      title: "Fast Settlement",
      description: "Lightning-fast transactions on Aptos blockchain with minimal fees and maximum security.",
      benefits: ["Sub-second finality", "Low gas fees", "High throughput"]
    }
  ];

  return (
    <section id="features" className="py-24 relative">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Everything You Need for
            <span className="block gradient-text">IP Management</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive suite of tools designed for creators, enterprises, and innovators 
            to protect and monetize their intellectual property.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="group p-8 glass rounded-2xl hover:scale-105 transition-all duration-300 hover:glow"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-gradient-brand rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {feature.description}
              </p>

              {/* Benefits */}
              <ul className="space-y-2">
                {feature.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-center text-sm">
                    <div className="w-1.5 h-1.5 bg-brand rounded-full mr-3" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center px-6 py-3 glass rounded-full border border-brand/30">
            <span className="text-sm font-medium mr-3">Ready to protect your IP?</span>
            <button className="text-brand hover:text-brand-light transition-colors font-semibold">
              Start Now →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};