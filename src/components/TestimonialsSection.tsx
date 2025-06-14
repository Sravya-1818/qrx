
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "My father collapsed on a bus, and a stranger scanned the QR to call us. The doctors knew about his diabetes immediately.",
      name: "Priya Sharma",
      location: "Mumbai, Maharashtra",
      avatar: "👩"
    },
    {
      quote: "As a daily wage worker, I can't afford expensive medical apps. This simple QR badge gives me peace of mind.",
      name: "Ravi Kumar", 
      location: "Rural Rajasthan",
      avatar: "👨"
    },
    {
      quote: "My mother doesn't speak Hindi well. When she had an emergency, the QR code helped doctors understand her allergies.",
      name: "Maria Joseph",
      location: "Kerala",
      avatar: "👩"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Real Stories, Real Impact
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See how QRx is making a difference in people's lives
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover-scale bg-card border-border">
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className="flex text-yellow-400 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>⭐</span>
                    ))}
                  </div>
                  <p className="text-muted-foreground italic mb-6">
                    "{testimonial.quote}"
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-xl mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
