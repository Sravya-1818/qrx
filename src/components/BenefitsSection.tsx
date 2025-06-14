
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const BenefitsSection = () => {
  const benefits = [
    {
      title: "Fast & Immediate",
      description: "Access critical health information in seconds during emergencies",
      icon: "⚡",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Works Offline",
      description: "No internet required - works on any smartphone camera",
      icon: "📶",
      color: "from-green-500 to-green-600"
    },
    {
      title: "Life-Saving",
      description: "Provides vital information when patients cannot communicate",
      icon: "💚",
      color: "from-red-500 to-red-600"
    },
    {
      title: "No App Needed",
      description: "Anyone can scan - no special apps or downloads required",
      icon: "📲",
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Private & Secure",
      description: "Your data is encrypted and only essential info is shown",
      icon: "🔒",
      color: "from-gray-500 to-gray-600"
    },
    {
      title: "Rural Friendly",
      description: "Affordable and accessible for rural India and developing areas",
      icon: "🌾",
      color: "from-yellow-500 to-yellow-600"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Why Choose QRx?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Designed for everyone, especially those who need it most
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="hover-scale bg-card/80 backdrop-blur border-border">
              <CardContent className="p-8 text-center">
                <div className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-r ${benefit.color} rounded-full flex items-center justify-center text-2xl`}>
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
