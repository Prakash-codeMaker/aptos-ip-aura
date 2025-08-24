import { Code, Book, Terminal, Puzzle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Developers = () => {
  const resources = [
    {
      icon: Code,
      title: "Smart Contract SDKs",
      description: "Comprehensive SDKs for Move smart contract development and integration",
      links: ["TypeScript SDK", "Python SDK", "Rust SDK", "REST API"]
    },
    {
      icon: Book,
      title: "Documentation",
      description: "Complete guides, tutorials, and API references for developers",
      links: ["Quick Start", "API Reference", "Tutorials", "Best Practices"]
    },
    {
      icon: Terminal,
      title: "Developer Tools",
      description: "CLI tools, testing frameworks, and development environments",
      links: ["IPChain CLI", "Test Suite", "Sandbox", "VS Code Extension"]
    },
    {
      icon: Puzzle,
      title: "Integration Examples",
      description: "Ready-to-use code examples and implementation patterns",
      links: ["React Apps", "Node.js APIs", "Mobile SDKs", "Webhook Examples"]
    }
  ];

  const codeExample = `// Register IP on IPChain
import { IPChainClient } from '@ipchain/sdk';

const client = new IPChainClient({
  network: 'mainnet',
  privateKey: process.env.PRIVATE_KEY
});

// Register a new IP asset
const ipAsset = await client.registerIP({
  title: "Revolutionary AI Algorithm",
  description: "Novel machine learning approach",
  category: "software",
  files: ["algorithm.py", "documentation.pdf"],
  metadata: {
    authors: ["Alice Developer"],
    created: new Date().toISOString()
  }
});

console.log(\`IP registered with ID: \${ipAsset.id}\`);

// Create a license template
const license = await client.createLicense({
  ipAssetId: ipAsset.id,
  type: "commercial",
  royaltyRate: 0.05, // 5%
  terms: {
    usage: "unlimited",
    territory: "worldwide",
    duration: "perpetual"
  }
});`;

  return (
    <section id="developers" className="py-24 relative">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Built for
            <span className="block gradient-text">Developers</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Powerful APIs, comprehensive SDKs, and extensive documentation to integrate 
            IP management into any application or workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Developer Resources */}
          <div className="space-y-8">
            {resources.map((resource, index) => (
              <div 
                key={resource.title}
                className="p-6 glass rounded-2xl hover:scale-105 transition-all duration-300 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-brand rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <resource.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2">{resource.title}</h3>
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                      {resource.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {resource.links.map((link, idx) => (
                        <button
                          key={idx}
                          className="text-brand hover:text-brand-light text-sm font-medium transition-colors"
                        >
                          {link} →
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Code Example */}
          <div className="glass rounded-2xl p-6 lg:p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">Quick Start Example</h3>
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
            
            <div className="bg-surface/50 rounded-xl p-4 overflow-x-auto">
              <pre className="text-sm leading-relaxed">
                <code className="text-muted-foreground">
                  {codeExample}
                </code>
              </pre>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Button className="btn-hero flex-1">
                View Full Documentation
              </Button>
              <Button variant="outline" className="btn-outline flex-1">
                Try in Sandbox
              </Button>
            </div>
          </div>
        </div>

        {/* Integration Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
          {[
            { value: "50+", label: "API Endpoints", description: "Comprehensive REST and GraphQL APIs" },
            { value: "5", label: "SDK Languages", description: "Native support for popular languages" },
            { value: "99.9%", label: "API Uptime", description: "Enterprise-grade reliability" }
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 glass rounded-xl">
              <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
              <div className="font-semibold mb-2">{stat.label}</div>
              <div className="text-sm text-muted-foreground">{stat.description}</div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <div className="glass rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Start Building Today
            </h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of developers building the future of intellectual property 
              with our comprehensive platform and tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="btn-hero"
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Get API Access
              </Button>
              <Button 
                variant="outline" 
                className="btn-outline"
                onClick={() => window.open('https://discord.gg/ipchain', '_blank')}
              >
                Join Developer Discord
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};