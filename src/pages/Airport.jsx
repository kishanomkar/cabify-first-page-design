
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import SecondaryNav from "@/components/SecondaryNav";
import { Button } from "@/components/ui/button";
import { Car, Plane, Calendar, Clock, MapPin } from "lucide-react";

const AirportCard = ({ airport, distance, price, image, isPopular }) => {
  const cardRef = useRef(null);
  
  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );
  }, []);
  
  const handleBookNow = () => {
    toast({
      title: "Airport Ride Requested",
      description: `Your ride to ${airport} has been scheduled!`,
      duration: 3000,
    });
  };
  
  return (
    <div 
      ref={cardRef} 
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all"
    >
      {isPopular && (
        <div className="bg-[#004D00] text-white px-3 py-1 text-sm absolute right-0">
          Popular
        </div>
      )}
      <div className="h-40 overflow-hidden">
        <img 
          src={image} 
          alt={airport} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{airport}</h3>
        <div className="flex items-center text-sm mb-1">
          <MapPin className="w-4 h-4 mr-2 text-gray-500" />
          <span>{distance} km from city center</span>
        </div>
        <div className="flex items-center text-sm mb-4">
          <Clock className="w-4 h-4 mr-2 text-gray-500" />
          <span>~{Math.floor(distance * 2)} min ride time</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-lg font-bold text-[#004D00]">
            ${price}
          </div>
          <Button
            onClick={handleBookNow}
            className="bg-[#004D00] hover:bg-[#003300]"
          >
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
};

const Airport = () => {
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const formRef = useRef(null);
  const pickupRef = useRef(null);
  const dateRef = useRef(null);
  const timeRef = useRef(null);
  
  const [selectedAirport, setSelectedAirport] = useState("International Airport");
  
  useEffect(() => {
    // Animated entrance
    const tl = gsap.timeline();
    
    tl.from(titleRef.current, {
      y: -30,
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
    .from(formRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.2")
    .from([pickupRef.current, dateRef.current, timeRef.current], {
      y: 20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: "power3.out"
    }, "-=0.6");
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Animate the plane icon
    const planeAnimation = () => {
      gsap.to(".plane-icon", {
        x: 10,
        y: -10,
        rotation: 5,
        duration: 2,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1
      });
    };
    
    planeAnimation();
    
  }, []);
  
  const handleAirportSelect = (airport) => {
    setSelectedAirport(airport);
    
    toast({
      title: "Airport Selected",
      description: `Selected ${airport} for your ride`,
      duration: 2000,
    });
  };
  
  const handleScheduleRide = () => {
    const pickup = pickupRef.current.value;
    const date = dateRef.current.value;
    const time = timeRef.current.value;
    
    if (!pickup || !date || !time) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields to schedule your airport ride",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Airport Ride Scheduled",
      description: `Your ride to ${selectedAirport} has been scheduled for ${date} at ${time}`,
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#90EE90]">
      <Navbar />
      <SecondaryNav />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12">
        <div className="flex items-center justify-center mb-8">
          <h1 
            ref={titleRef} 
            className="text-4xl md:text-5xl font-bold text-black text-center"
          >
            Airport Rides
          </h1>
          <Plane className="w-10 h-10 ml-4 text-black plane-icon" />
        </div>
        
        <p 
          ref={descriptionRef} 
          className="text-lg text-black/80 mb-12 text-center max-w-2xl mx-auto"
        >
          Reliable electric rides to and from all major airports. 
          Schedule in advance for a stress-free journey.
        </p>
        
        <div 
          ref={formRef} 
          className="bg-white p-8 rounded-lg shadow-lg mb-16 max-w-3xl mx-auto"
        >
          <h2 className="text-2xl font-bold mb-6">Schedule Your Airport Ride</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium mb-1">Pickup Location</label>
              <input
                ref={pickupRef}
                type="text"
                placeholder="Your address"
                className="w-full pl-4 pr-4 py-3 rounded-lg border border-gray-300"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Airport</label>
              <select 
                className="w-full pl-4 pr-4 py-3 rounded-lg border border-gray-300"
                value={selectedAirport}
                onChange={(e) => handleAirportSelect(e.target.value)}
              >
                <option value="International Airport">International Airport</option>
                <option value="Regional Airport">Regional Airport</option>
                <option value="Downtown Heliport">Downtown Heliport</option>
                <option value="Private Airfield">Private Airfield</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <input
                ref={dateRef}
                type="date"
                className="w-full pl-4 pr-4 py-3 rounded-lg border border-gray-300"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Time</label>
              <input
                ref={timeRef}
                type="time"
                className="w-full pl-4 pr-4 py-3 rounded-lg border border-gray-300"
              />
            </div>
          </div>
          
          <div className="flex items-center mb-6">
            <div className="w-4 h-4 rounded-full bg-[#004D00] mr-2"></div>
            <p className="text-sm">
              We'll arrive 15 minutes before your scheduled pickup time
            </p>
          </div>
          
          <Button 
            onClick={handleScheduleRide}
            className="w-full bg-[#004D00] hover:bg-[#003300] py-6 text-lg"
          >
            Schedule Airport Ride
          </Button>
        </div>
        
        <h2 className="text-3xl font-bold mb-8">Popular Airport Destinations</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AirportCard
            airport="International Airport"
            distance={28}
            price={34.99}
            image="https://images.unsplash.com/photo-1586952205260-7a87ad349d45?w=800&auto=format&fit=crop"
            isPopular={true}
          />
          
          <AirportCard
            airport="Regional Airport"
            distance={15}
            price={24.99}
            image="https://images.unsplash.com/photo-1558322441-ce2f8ccd18f6?w=800&auto=format&fit=crop"
          />
          
          <AirportCard
            airport="Downtown Heliport"
            distance={5}
            price={19.99}
            image="https://images.unsplash.com/photo-1608322368735-b1a2ac0f544f?w=800&auto=format&fit=crop"
          />
        </div>
        
        <div className="bg-white mt-16 p-8 rounded-lg">
          <h3 className="text-2xl font-bold mb-4">Why Choose Our Airport Service</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#90EE9040] flex items-center justify-center mb-4">
                <Clock className="w-8 h-8 text-[#004D00]" />
              </div>
              <h4 className="font-bold mb-2">Always On Time</h4>
              <p className="text-sm text-gray-600">
                We track your flight and adjust pickup times based on early or delayed arrivals
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#90EE9040] flex items-center justify-center mb-4">
                <Car className="w-8 h-8 text-[#004D00]" />
              </div>
              <h4 className="font-bold mb-2">Spacious Vehicles</h4>
              <p className="text-sm text-gray-600">
                Extra room for luggage and comfortable seating for tired travelers
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#90EE9040] flex items-center justify-center mb-4">
                <Calendar className="w-8 h-8 text-[#004D00]" />
              </div>
              <h4 className="font-bold mb-2">Easy Scheduling</h4>
              <p className="text-sm text-gray-600">
                Book in advance to ensure a stress-free journey to or from the airport
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Airport;
