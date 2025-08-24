import { Cpu, Database, Shield, Globe, Zap, Code } from "lucide-react";

export const Technology = () => {
  const techSpecs = [
    {
      icon: Cpu,
      title: "Aptos Blockchain",
      description: "Built on the fastest, most secure blockchain with Move smart contracts",
      specs: ["100k+ TPS", "Sub-second finality", "Parallel execution"]
    },
    {
      icon: Database,
      title: "IPFS Storage",
      description: "Decentralized file storage ensuring permanence and global accessibility",
      specs: ["Immutable storage", "Global CDN", "Content addressing"]
    },
    {
      icon: Shield,
      title: "Zero-Knowledge Proofs",
      description: "Privacy-preserving technology for sensitive IP information",
      specs: ["Selective disclosure", "Privacy by design", "Compliance ready"]
    },
    {
      icon: Globe,
      title: "Global Infrastructure",
      description: "Worldwide node network ensuring 99.9% uptime and accessibility",
      specs: ["Multi-region", "Auto-scaling", "Load balancing"]
    }
  ];

  const architecture = [
    {
      layer: "Application Layer",
      description: "User interfaces and developer APIs",
      components: ["Web Dashboard", "Mobile Apps", "REST APIs", "GraphQL"]
    },
    {
      layer: "Smart Contract Layer",
      description: "Move-based smart contracts on Aptos",
      components: ["IP Registry", "Licensing Engine", "Royalty Distribution", "Governance"]
    },
    {
      layer: "Storage Layer",
      description: "Decentralized and traditional storage solutions",
      components: ["IPFS", "Arweave", "PostgreSQL", "Redis Cache"]
    },
    {
      layer: "Infrastructure Layer",
      description: "Blockchain and networking infrastructure",
      components: ["Aptos Nodes", "Load Balancers", "CDN", "Monitoring"]
    }
  ];

  return (
    <section id="technology" className="py-24 relative">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Built on
            <span className="block gradient-text">Cutting-Edge Technology</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Enterprise-grade infrastructure designed for scale, security, and performance 
            that meets the demands of global IP management.
          </p>
        </div>

        {/* Technology Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {techSpecs.map((tech, index) => (
            <div key={tech.title} className="p-8 glass rounded-2xl group hover:scale-105 transition-all duration-300">
              <div className="flex items-start space-x-6">
                <div className="w-14 h-14 bg-gradient-brand rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <tech.icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3">{tech.title}</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {tech.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {tech.specs.map((spec, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 bg-muted/50 rounded-full text-xs font-medium"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Architecture Diagram */}
        <div className="glass rounded-3xl p-8 md:p-12">
          <h3 className="text-2xl font-bold text-center mb-12">System Architecture</h3>
          
          <div className="space-y-6">
            {architecture.map((layer, index) => (
              <div 
                key={layer.layer}
                className="relative"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Layer Header */}
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-gradient-brand rounded-lg flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-sm">{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{layer.layer}</h4>
                    <p className="text-sm text-muted-foreground">{layer.description}</p>
                  </div>
                </div>

                {/* Components */}
                <div className="ml-12 grid grid-cols-2 md:grid-cols-4 gap-3">
                  {layer.components.map((component, idx) => (
                    <div 
                      key={idx}
                      className="px-4 py-2 bg-surface/50 rounded-lg border border-border/30 text-center text-sm font-medium hover:bg-brand/10 hover:border-brand/30 transition-all duration-300"
                    >
                      {component}
                    </div>
                  ))}
                </div>

                {/* Connector Line */}
                {index < architecture.length - 1 && (
                  <div className="flex justify-center my-6">
                    <div className="w-px h-8 bg-gradient-to-b from-brand to-transparent"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Performance Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-20">
          {[
            { value: "100k+", label: "TPS", sublabel: "Transactions per second" },
            { value: "<1s", label: "Finality", sublabel: "Transaction confirmation" },
            { value: "99.9%", label: "Uptime", sublabel: "System availability" },
            { value: "$0.001", label: "Gas Fees", sublabel: "Average transaction cost" }
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 glass rounded-xl">
              <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
              <div className="font-semibold mb-1">{stat.label}</div>
              <div className="text-sm text-muted-foreground">{stat.sublabel}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};