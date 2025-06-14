
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const HowItWorks = () => {
  const steps = [
    {
      number: "1",
      title: "Register Basic Info",
      description: "Fill in essential medical details like blood group, allergies, and emergency contacts",
      icon: "📝"
    },
    {
      number: "2", 
      title: "Receive QR Badge",
      description: "Get your personalized QR code badge to wear or carry with you",
      icon: "🏷️"
    },
    {
      number: "3",
      title: "Scan in Emergency", 
      description: "Anyone can scan your QR code with any smartphone to access your info",
      icon: "📱"
    },
    {
      number: "4",
      title: "Save Lives",
      description: "Quick access to critical information helps first responders act fast",
      icon: "❤️"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Simple steps to protect yourself and your loved ones
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="relative hover-scale bg-card border-border">
              <CardContent className="p-8 text-center">
                <div className="text-5xl mb-4">{step.icon}</div>
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Arrow connections for desktop */}
        <div className="hidden lg:block relative -mt-32 mb-16">
          <div className="flex justify-between items-center max-w-6xl mx-auto px-20">
            {[1, 2, 3].map((i) => (
              <ArrowRight key={i} className="text-blue-300 h-8 w-8" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ArrowRight = ({ className }: { className: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

export default HowItWorks;
