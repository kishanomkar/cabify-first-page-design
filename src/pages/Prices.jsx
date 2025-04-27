
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Navbar from "@/components/Navbar";
import SecondaryNav from "@/components/SecondaryNav";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Shield, Car } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Prices = () => {
  const navigate = useNavigate();
  const mainRef = useRef(null);
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [distance, setDistance] = useState(0);
  const [selectedRide, setSelectedRide] = useState("go_electric");
  
  const rideTypes = [
    { id: "go_electric", name: "Go Electric", basePrice: 35, perKm: 8, icon: <Car className="h-5 w-5" /> },
    { id: "go_premium", name: "Premium", basePrice: 75, perKm: 15, icon: <Shield className="h-5 w-5" /> },
    { id: "go_shared", name: "Shared", basePrice: 25, perKm: 6, icon: <Clock className="h-5 w-5" /> },
  ];
  
  useEffect(() => {
    // Set a random sample distance when component mounts
    setDistance(Math.floor(Math.random() * 15) + 3);
    
    // Page animations
    gsap.from(mainRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: "power2.out"
    });
    
    gsap.from(".pricing-card", {
      opacity: 0,
      y: 30,
      duration: 0.6,
      stagger: 0.1,
      delay: 0.3,
      ease: "back.out(1.2)"
    });
    
    // Scroll to top
    window.scrollTo(0, 0);
  }, []);
  
  // Calculate fare based on ride type and distance
  const calculateFare = (rideType) => {
    const ride = rideTypes.find(r => r.id === rideType);
    return ride.basePrice + (ride.perKm * distance);
  };
  
  const handleEstimateFare = () => {
    if (!pickup || !destination) {
      toast({
        title: "Missing information",
        description: "Please enter both pickup and destination",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate fare calculation with new random distance
    const newDistance = Math.floor(Math.random() * 15) + 3;
    setDistance(newDistance);
    
    toast({
      title: "Fare Estimated",
      description: `Distance: ${newDistance} km`,
      duration: 2000,
    });
  };
  
  const handleBookNow = () => {
    if (!pickup || !destination) {
      toast({
        title: "Missing information",
        description: "Please enter pickup and destination",
        variant: "destructive",
      });
      return;
    }
    
    const selectedRideData = rideTypes.find(r => r.id === selectedRide);
    
    toast({
      title: "Booking Ride",
      description: `${selectedRideData.name} for ₹${calculateFare(selectedRide)}`,
      duration: 3000,
    });
    
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#90EE90]">
      <Navbar />
      <SecondaryNav />
      
      <main className="flex-1" ref={mainRef}>
        <div className="max-w-7xl mx-auto w-full px-6 py-12">
          <h1 className="text-4xl font-bold mb-8 text-center">Fare Estimator</h1>
          
          <div className="bg-white rounded-xl p-6 shadow-lg max-w-3xl mx-auto mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <Input
                  placeholder="Pickup location"
                  className="pl-10"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <Input
                  placeholder="Destination"
                  className="pl-10"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
            </div>
            
            <Button 
              className="w-full bg-black text-white hover:bg-gray-800"
              onClick={handleEstimateFare}
            >
              Estimate Fare
            </Button>
          </div>
          
          {distance > 0 && (
            <div className="space-y-4 max-w-3xl mx-auto">
              <h2 className="text-2xl font-semibold mb-6">Estimated Prices for {distance} km</h2>
              
              {rideTypes.map((rideType) => {
                const fare = calculateFare(rideType.id);
                const isSelected = selectedRide === rideType.id;
                
                return (
                  <div 
                    key={rideType.id}
                    className={`pricing-card flex justify-between items-center p-4 rounded-lg transition-all cursor-pointer ${
                      isSelected 
                        ? "bg-[#E7FFE7] border-2 border-[#008000]" 
                        : "bg-white border border-gray-200"
                    }`}
                    onClick={() => setSelectedRide(rideType.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isSelected ? "bg-[#008000] text-white" : "bg-[#90EE90]"
                      }`}>
                        {rideType.icon}
                      </div>
                      <div>
                        <h3 className="font-medium">{rideType.name}</h3>
                        <p className="text-sm text-gray-500">Estimated arrival: {Math.floor(Math.random() * 5) + 2} min</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">₹{fare}</p>
                      <p className="text-sm text-gray-500">Base fare: ₹{rideType.basePrice}</p>
                    </div>
                  </div>
                );
              })}
              
              <Button 
                className="w-full bg-[#004D00] hover:bg-[#003300] text-white mt-6"
                onClick={handleBookNow}
              >
                Book Now
              </Button>
            </div>
          )}
          
          <div className="mt-16 bg-white rounded-xl p-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">How our pricing works</h2>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[#90EE90] flex items-center justify-center flex-shrink-0">1</div>
                <div>
                  <h3 className="font-semibold">Base Fare</h3>
                  <p className="text-gray-600">Standard charge that is applied to every ride</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[#90EE90] flex items-center justify-center flex-shrink-0">2</div>
                <div>
                  <h3 className="font-semibold">Per Kilometer Rate</h3>
                  <p className="text-gray-600">Additional cost based on the distance traveled</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[#90EE90] flex items-center justify-center flex-shrink-0">3</div>
                <div>
                  <h3 className="font-semibold">Demand Pricing</h3>
                  <p className="text-gray-600">Prices may vary based on demand and availability</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Prices;
