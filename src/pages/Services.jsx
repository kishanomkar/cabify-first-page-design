
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import SecondaryNav from "@/components/SecondaryNav";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const ServiceCard = ({ title, description, imagePath, onDetailsClick }) => {
  const cardRef = useRef(null);
  
  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  return (
    <div ref={cardRef} className="bg-white rounded-lg p-6 shadow-lg">
      <h2 className="text-3xl font-bold mb-3">{title}</h2>
      <p className="text-black/80 mb-6">{description}</p>
      
      <Button 
        onClick={onDetailsClick}
        className="bg-black hover:bg-gray-900 text-white"
      >
        Details
      </Button>
      
      <div className="mt-6 bg-[#90EE90] rounded-lg overflow-hidden">
        <img 
          src={imagePath} 
          alt={title} 
          className="w-full h-[220px] object-contain"
        />
      </div>
    </div>
  );
};

const Services = () => {
  const navigate = useNavigate();
  const titleRef = useRef(null);
  
  useEffect(() => {
    // Page entrance animation
    const tl = gsap.timeline();
    
    tl.from(titleRef.current, {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: "elastic.out(1, 0.5)"
    });
    
    // Scroll to top
    window.scrollTo(0, 0);
  }, []);
  
  const handleCourierDetails = () => {
    toast({
      title: "Courier Service",
      description: "Our same-day delivery service details will be available soon!",
      duration: 3000,
    });
  };
  
  const handleRentalDetails = () => {
    toast({
      title: "Rental Service",
      description: "Electric vehicle rental details and subscription plans coming soon!",
      duration: 3000,
    });
  };
  
  const handleRewardsDetails = () => {
    navigate("/rewards");
    toast({
      title: "Rewards Program",
      description: "Going to our rewards program page",
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#90EE90]">
      <Navbar />
      <SecondaryNav />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12">
        <h1 
          ref={titleRef} 
          className="text-5xl font-bold text-black mb-12 text-center"
        >
          Other Services
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ServiceCard 
            title="Courier" 
            description="Go Electric makes same-day delivery easier and at a cheap price."
            imagePath="/lovable-uploads/749a1402-da6c-4081-9014-965c35267836.png"
            onDetailsClick={handleCourierDetails}
          />
          
          <ServiceCard 
            title="Rental" 
            description="Get electric rickshaws and vehicles on easy subscription — affordable, flexible, and eco-friendly."
            imagePath="/lovable-uploads/8ffe1d9b-dcfc-4021-9362-fc6685a846af.png"
            onDetailsClick={handleRentalDetails}
          />
          
          <ServiceCard 
            title="Reward Points" 
            description="Earn reward points for every CO₂-saving ride and enjoy discounts on your next trip!"
            imagePath="https://cdn3d.iconscout.com/3d/premium/thumb/crypto-coin-5113359-4270544.png"
            onDetailsClick={handleRewardsDetails}
          />
        </div>
      </main>
    </div>
  );
};

export default Services;
