import { Mail, MessageSquare, Calendar, MapPin, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const Contact = () => {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Get help from our technical team",
      contact: "support@ipchain.dev",
      action: "Send Email"
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Real-time support for urgent issues",
      contact: "Available 24/7",
      action: "Start Chat"
    },
    {
      icon: Calendar,
      title: "Schedule Call",
      description: "Book a consultation with our experts",
      contact: "Enterprise clients",
      action: "Book Meeting"
    }
  ];

  const offices = [
    {
      city: "San Francisco",
      address: "123 Innovation Drive, SF, CA 94105",
      phone: "+1 (555) 123-4567"
    },
    {
      city: "Singapore",
      address: "456 Blockchain Street, Singapore 018956",
      phone: "+65 1234 5678"
    },
    {
      city: "London",
      address: "789 Tech Hub Lane, London EC2A 4BX",
      phone: "+44 20 1234 5678"
    }
  ];

  return (
    <section id="contact" className="py-24 relative bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Get in
            <span className="block gradient-text">Touch</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Have questions about IPChain? Our team is here to help you get started 
            with protecting and monetizing your intellectual property.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="glass rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input 
                  placeholder="First Name"
                  className="bg-surface/50 border-border/50 focus:border-brand"
                />
                <Input 
                  placeholder="Last Name"
                  className="bg-surface/50 border-border/50 focus:border-brand"
                />
              </div>
              
              <Input 
                type="email"
                placeholder="Email Address"
                className="bg-surface/50 border-border/50 focus:border-brand"
              />
              
              <Input 
                placeholder="Company (Optional)"
                className="bg-surface/50 border-border/50 focus:border-brand"
              />
              
              <Textarea 
                placeholder="Tell us about your project and how we can help..."
                rows={5}
                className="bg-surface/50 border-border/50 focus:border-brand resize-none"
              />
              
              <Button className="btn-hero w-full group">
                Send Message
                <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Methods */}
            <div className="space-y-6">
              {contactMethods.map((method, index) => (
                <div 
                  key={method.title}
                  className="p-6 glass rounded-xl hover:scale-105 transition-all duration-300 group cursor-pointer"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-brand rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <method.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold mb-2">{method.title}</h4>
                      <p className="text-muted-foreground text-sm mb-2">
                        {method.description}
                      </p>
                      <p className="text-brand font-medium text-sm mb-3">
                        {method.contact}
                      </p>
                      <button className="text-brand hover:text-brand-light text-sm font-semibold transition-colors">
                        {method.action} →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Office Locations */}
            <div className="glass rounded-xl p-6">
              <h4 className="font-bold mb-6 flex items-center">
                <MapPin className="w-5 h-5 text-brand mr-2" />
                Global Offices
              </h4>
              
              <div className="space-y-4">
                {offices.map((office, index) => (
                  <div key={office.city} className="pb-4 border-b border-border/30 last:border-b-0 last:pb-0">
                    <h5 className="font-semibold mb-2">{office.city}</h5>
                    <p className="text-muted-foreground text-sm mb-1">{office.address}</p>
                    <p className="text-brand text-sm font-medium">{office.phone}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center mb-12">Frequently Asked Questions</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                question: "How secure is IPChain?",
                answer: "IPChain uses military-grade encryption and blockchain immutability to ensure your IP is protected with the highest security standards."
              },
              {
                question: "What types of IP can I register?",
                answer: "You can register patents, trademarks, copyrights, trade secrets, and any form of intellectual property on our platform."
              },
              {
                question: "How much does it cost?",
                answer: "We offer flexible pricing from $29/month for individuals to custom enterprise plans. Gas fees are minimal on Aptos blockchain."
              },
              {
                question: "Is it legally binding?",
                answer: "Yes, IPChain provides legally recognized proof of creation and ownership that's accepted in courts worldwide."
              }
            ].map((faq, index) => (
              <div key={index} className="p-6 glass rounded-xl">
                <h5 className="font-semibold mb-3">{faq.question}</h5>
                <p className="text-muted-foreground text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};