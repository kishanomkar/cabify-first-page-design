
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import SecondaryNav from "@/components/SecondaryNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, Shield, Car } from "lucide-react";

const RideOption = ({ type, basePrice, image, perKm, description, isPopular }) => {
  const cardRef = useRef(null);
  const [selected, setSelected] = useState(false);
  
  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: type === "Economy" ? 0.2 : type === "Premium" ? 0.4 : type === "Carpool" ? 0.6 : 0.8 }
    );
  }, [type]);
  
  const handleSelect = () => {
    setSelected(!selected);
    if (!selected) {
      toast({
        title: `${type} Selected`,
        description: `You've selected the ${type} option for your ride.`,
        duration: 3000,
      });
    }
  };
  
  return (
    <Card 
      ref={cardRef} 
      className={`relative overflow-hidden transition-all duration-300 transform hover:-translate-y-2 ${
        selected ? "border-2 border-[#004D00]" : ""
      }`}
    >
      {isPopular && (
        <div className="absolute top-0 right-0 bg-[#004D00] text-white px-4 py-1 text-sm">
          Popular
        </div>
      )}
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold">{type}</h3>
          <div className="text-xl font-bold text-[#004D00]">${basePrice}</div>
        </div>
        
        <div className="h-40 overflow-hidden rounded-lg bg-[#90EE9020] mb-4 flex items-center justify-center">
          <img src={image} alt={type} className="h-full object-contain" />
        </div>
        
        <div className="space-y-2 mb-6">
          <div className="flex items-center text-sm">
            <Car className="w-4 h-4 mr-2" />
            <span>{description}</span>
          </div>
          <div className="flex items-center text-sm">
            <Clock className="w-4 h-4 mr-2" />
            <span>Arrives in 3-5 min</span>
          </div>
          <div className="flex items-center text-sm">
            <span className="font-bold">${perKm}/km</span>
            <span className="mx-2">•</span>
            <span>Zero emissions</span>
          </div>
        </div>
        
        <Button 
          onClick={handleSelect}
          className={`w-full ${selected ? "bg-[#004D00]" : "bg-black"} hover:bg-[#003300] text-white`}
        >
          {selected ? "Selected" : "Select Ride"}
        </Button>
      </CardContent>
    </Card>
  );
};

const Prices = () => {
  const mainRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const locationInputRef = useRef(null);
  const destinationInputRef = useRef(null);
  const estimateRef = useRef(null);
  
  const [estimatedDistance, setEstimatedDistance] = useState(5.2);
  const [estimatedTime, setEstimatedTime] = useState(15);
  
  useEffect(() => {
    // Page entrance animation
    const tl = gsap.timeline();
    
    tl.from(titleRef.current, {
      y: -50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    })
    .from(descriptionRef.current, {
      y: -20,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out"
    }, "-=0.4")
    .from([locationInputRef.current, destinationInputRef.current], {
      y: 20,
      opacity: 0,
      stagger: 0.2,
      duration: 0.6,
      ease: "power3.out"
    }, "-=0.3")
    .from(estimateRef.current, {
      scale: 0.9,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out"
    }, "-=0.2");
    
    // Special animation for the cards will be handled in the RideOption component
    
    // Scroll to top
    window.scrollTo(0, 0);
  }, []);
  
  const calculateRide = () => {
    const location = locationInputRef.current.value;
    const destination = destinationInputRef.current.value;
    
    if (!location || !destination) {
      toast({
        title: "Missing information",
        description: "Please enter both pickup location and destination",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate calculating a new estimate
    const newDistance = parseFloat((Math.random() * 10 + 2).toFixed(1));
    const newTime = Math.floor(Math.random() * 20 + 10);
    
    // Animate the changes
    gsap.to(estimateRef.current, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out",
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        setEstimatedDistance(newDistance);
        setEstimatedTime(newTime);
      }
    });
    
    toast({
      title: "Estimate updated",
      description: `New route calculated for your journey`,
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#90EE90]">
      <Navbar />
      <SecondaryNav />
      
      <main ref={mainRef} className="flex-1 max-w-7xl mx-auto w-full px-6 py-12">
        <h1 
          ref={titleRef} 
          className="text-5xl font-bold text-black mb-4 text-center"
        >
          Electric Ride Prices
        </h1>
        <p 
          ref={descriptionRef} 
          className="text-lg text-black/80 mb-8 text-center max-w-2xl mx-auto"
        >
          Choose the perfect ride option that fits your needs. All electric, zero emissions,
          and competitively priced.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="space-y-4">
            <div className="relative">
              <input
                ref={locationInputRef}
                type="text"
                placeholder="Enter pickup location"
                className="w-full pl-4 pr-4 py-3 rounded-lg border border-black/20 bg-white/80 backdrop-blur-sm"
                defaultValue="Current Location"
              />
            </div>
            
            <div className="relative">
              <input
                ref={destinationInputRef}
                type="text"
                placeholder="Enter destination"
                className="w-full pl-4 pr-4 py-3 rounded-lg border border-black/20 bg-white/80 backdrop-blur-sm"
              />
            </div>
            
            <Button 
              onClick={calculateRide}
              className="bg-[#004D00] hover:bg-[#003300] text-white w-full"
            >
              Calculate Ride
            </Button>
          </div>
          
          <div 
            ref={estimateRef} 
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold mb-4">Ride Estimate</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Estimated Distance:</span>
                <span className="font-bold">{estimatedDistance} km</span>
              </div>
              
              <div className="flex justify-between">
                <span>Estimated Time:</span>
                <span className="font-bold">{estimatedTime} minutes</span>
              </div>
              
              <div className="flex justify-between">
                <span>Pickup Window:</span>
                <span className="font-bold">3-5 minutes</span>
              </div>
              
              <div className="border-t pt-4 mt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-[#004D00]" />
                    <span className="text-sm">Electric rides save ~{Math.round(estimatedDistance * 150)}g of CO₂</span>
                  </div>
                  <span className="text-[#004D00] font-bold">Eco-friendly</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-black mb-8 text-center">Available Ride Options</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <RideOption 
            type="Economy" 
            basePrice={5.99} 
            image="/lovable-uploads/a35d0c0d-6e1f-4f4b-aba7-e59438cda13c.png"
            description="Standard electric ride for up to 3 people" 
            perKm={1.20}
            isPopular={true}
          />
          
          <RideOption 
            type="Premium" 
            basePrice={9.99} 
            image="/lovable-uploads/d0744fa4-e27e-4112-ae2f-503ba7fc0fa5.png"
            description="Luxury electric ride with extra comfort" 
            perKm={1.80}
          />
          
          <RideOption 
            type="Carpool" 
            basePrice={3.99} 
            image="/lovable-uploads/27425374-f7f1-4b5e-b682-a0e11feed857.png"
            description="Share your ride and save money" 
            perKm={0.90}
          />
          
          <RideOption 
            type="SUV" 
            basePrice={12.99} 
            image="/lovable-uploads/b3a457bb-4ffb-4512-a05a-1f5ca55d0135.png"
            description="Spacious ride for up to 6 people" 
            perKm={2.10}
          />
        </div>
        
        <div className="mt-16 bg-white rounded-lg p-6 shadow-lg">
          <h3 className="text-2xl font-bold mb-4">How We Calculate Your Fare</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-[#004D00]" />
                <h4 className="font-semibold">Base Fare</h4>
              </div>
              <p className="text-sm text-gray-600">
                Every ride starts with a base fare that covers the initial pickup
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-[#004D00]" />
                <h4 className="font-semibold">Time & Distance</h4>
              </div>
              <p className="text-sm text-gray-600">
                We add time and distance traveled to calculate the final fare
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-[#004D00]" />
                <h4 className="font-semibold">Green Discount</h4>
              </div>
              <p className="text-sm text-gray-600">
                Electric rides earn reward points that can reduce future fares
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Prices;
