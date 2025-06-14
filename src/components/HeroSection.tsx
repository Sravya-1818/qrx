
import React from 'react';
import { ArrowRight, QrCode, Heart, Shield } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 py-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-12 gap-4 h-full">
          {Array.from({ length: 48 }).map((_, i) => (
            <div key={i} className="bg-blue-200 rounded-full w-2 h-2 animate-pulse" 
                 style={{ animationDelay: `${i * 0.1}s` }} />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Emergency Health Info 
            <span className="block text-blue-600 animate-fade-in-up">at a Scan</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-700 mb-8 animate-fade-in-up animation-delay-200">
            A QR code that speaks when you can't
          </p>
          
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto animate-fade-in-up animation-delay-400">
            Simple QR code-based health IDs for vulnerable people. Essential medical info like blood group, 
            allergies, and emergency contacts—accessible without any app or login.
          </p>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animation-delay-600">
            <Link to="/generate">
              <Button size="lg" className="text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700 transform hover:scale-105 transition-all duration-200">
                <QrCode className="mr-2 h-5 w-5" />
                Get Your Free QR Badge
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-2 hover:bg-gray-50 transform hover:scale-105 transition-all duration-200">
              <Heart className="mr-2 h-5 w-5 text-red-500" />
              See How It Saves Lives
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600 animate-fade-in-up animation-delay-800">
            <div className="flex items-center">
              <Shield className="h-4 w-4 text-green-500 mr-2" />
              <span>100% Secure & Private</span>
            </div>
            <div className="flex items-center">
              <QrCode className="h-4 w-4 text-blue-500 mr-2" />
              <span>Works Offline</span>
            </div>
            <div className="flex items-center">
              <Heart className="h-4 w-4 text-red-500 mr-2" />
              <span>Saves Lives</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
