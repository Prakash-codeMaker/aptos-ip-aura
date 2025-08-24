import { Shield, Github, Twitter, Linkedin, Mail } from "lucide-react";

export const Footer = () => {
  const footerLinks = {
    product: [
      { name: "Features", href: "#features" },
      { name: "Pricing", href: "#pricing" },
      { name: "Security", href: "#security" },
      { name: "Roadmap", href: "#roadmap" }
    ],
    developers: [
      { name: "Documentation", href: "#docs" },
      { name: "API Reference", href: "#api" },
      { name: "SDKs", href: "#sdks" },
      { name: "GitHub", href: "https://github.com/ipchain" }
    ],
    company: [
      { name: "About", href: "#about" },
      { name: "Blog", href: "#blog" },
      { name: "Careers", href: "#careers" },
      { name: "Contact", href: "#contact" }
    ],
    legal: [
      { name: "Privacy Policy", href: "#privacy" },
      { name: "Terms of Service", href: "#terms" },
      { name: "Cookie Policy", href: "#cookies" },
      { name: "Legal Notice", href: "#legal" }
    ]
  };

  const socialLinks = [
    { icon: Twitter, href: "https://twitter.com/ipchain", label: "Twitter" },
    { icon: Github, href: "https://github.com/ipchain", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/company/ipchain", label: "LinkedIn" },
    { icon: Mail, href: "mailto:hello@ipchain.dev", label: "Email" }
  ];

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.getElementById(href.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.open(href, '_blank');
    }
  };

  return (
    <footer className="border-t border-border/30 bg-surface/50">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-brand rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">IPChain</span>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              The world's most advanced intellectual property management platform, 
              powered by blockchain technology and built for creators, innovators, 
              and enterprises.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <button
                  key={social.label}
                  onClick={() => scrollToSection(social.href)}
                  className="w-10 h-10 bg-muted/30 hover:bg-brand/20 rounded-lg flex items-center justify-center transition-colors duration-300 group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-brand transition-colors" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold mb-6 text-foreground">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Developers Links */}
          <div>
            <h4 className="font-semibold mb-6 text-foreground">Developers</h4>
            <ul className="space-y-3">
              {footerLinks.developers.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-6 text-foreground">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold mb-6 text-foreground">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 pt-8 border-t border-border/30">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
            <div>
              <h4 className="font-semibold mb-2">Stay Updated</h4>
              <p className="text-muted-foreground text-sm">
                Get the latest updates on IP management and blockchain technology.
              </p>
            </div>
            <div className="flex w-full md:w-auto max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-surface/50 border border-border/50 rounded-l-lg focus:outline-none focus:border-brand text-sm"
              />
              <button className="px-6 py-2 bg-brand hover:bg-brand-muted text-white rounded-r-lg transition-colors font-medium text-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/30 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <p className="text-muted-foreground text-sm">
            © 2024 IPChain. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 text-sm">
            <span className="text-muted-foreground">Powered by</span>
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-gradient-brand rounded"></div>
              <span className="font-medium">Aptos</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};