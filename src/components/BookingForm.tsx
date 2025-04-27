
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { toast } from "@/hooks/use-toast";

const BookingForm = () => {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const [location, setLocation] = useState("");
  const [destination, setDestination] = useState("");
  
  useEffect(() => {
    // Animation for the form elements
    const tl = gsap.timeline();
    
    tl.from(headingRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    })
    .from(descriptionRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.4")
    .from(formRef.current.querySelectorAll("input, button"), {
      y: 20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: "power2.out"
    }, "-=0.3");
  }, []);
  
  const handleSeePrices = () => {
    toast({
      title: "Checking prices",
      description: "Looking for the best rates for your journey",
      duration: 3000,
    });
    
    setTimeout(() => {
      navigate("/prices");
    }, 1500);
  };
  
  const handleRideElectric = () => {
    if (!location || !destination) {
      toast({
        title: "Missing information",
        description: "Please enter both location and destination",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Finding your ride",
      description: "Connecting you with the nearest electric vehicle",
      duration: 3000,
    });
    
    setTimeout(() => {
      navigate("/services");
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-4 max-w-md" ref={formRef}>
      <h1 
        ref={headingRef}
        className="text-5xl font-bold text-black leading-tight"
      >
        Sustainable Rides,
        <br />
        On Your Schedule.
      </h1>
      <p 
        ref={descriptionRef}
        className="text-lg text-black/80 mb-4"
      >
        Add your trip details, hop in, and go.
      </p>
      
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Enter Location"
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-black/20 bg-white/80 backdrop-blur-sm"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Enter destination"
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-black/20 bg-white/80 backdrop-blur-sm"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>
      
      <div className="flex gap-4 mt-4">
        <Button 
          onClick={handleSeePrices}
          className="bg-[#004D00] hover:bg-[#003300] text-white px-6"
        >
          See prices
        </Button>
        <Button 
          onClick={handleRideElectric}
          variant="outline" 
          className="bg-white hover:bg-gray-100"
        >
          Ride Electric
        </Button>
      </div>
    </div>
  );
};

export default BookingForm;
