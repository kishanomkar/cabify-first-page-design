
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Award, RadioTower } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const RideOption = ({ title, price, time, selected, onSelect }) => {
  return (
    <div 
      className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-all ${
        selected ? "border-[#008000] bg-[#E7FFE7]" : "border-gray-200 bg-white"
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#90EE90] flex items-center justify-center">
          {title === "Go Electric" && <RadioTower size={20} />}
          {title === "Premium" && <Award size={20} />}
          {title === "Shared" && <Clock size={20} />}
        </div>
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-xs text-gray-500">{time}</p>
        </div>
      </div>
      <span className="font-semibold">₹{price}</span>
    </div>
  );
};

const BookingForm = () => {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const [location, setLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [activeTab, setActiveTab] = useState("ride");
  const [selectedRide, setSelectedRide] = useState("Go Electric");
  
  const rideOptions = [
    { id: 1, title: "Go Electric", price: "149", time: "2 min away" },
    { id: 2, title: "Premium", price: "249", time: "4 min away" },
    { id: 3, title: "Shared", price: "99", time: "5 min away" },
  ];
  
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
    .from(formRef.current.querySelectorAll(".form-element"), {
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
        description: "Please enter both pickup and destination",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Finding your ride",
      description: `Connecting you with the nearest ${selectedRide} vehicle`,
      duration: 3000,
    });
    
    setTimeout(() => {
      navigate("/services");
    }, 1500);
  };
  
  const handleScheduleRide = () => {
    if (!location || !destination) {
      toast({
        title: "Missing information",
        description: "Please enter both pickup and destination",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Scheduling ride",
      description: "Redirecting to schedule your ride",
      duration: 2000,
    });
    
    setTimeout(() => {
      navigate("/rewards");
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-4 max-w-md bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg" ref={formRef}>
      <h1 
        ref={headingRef}
        className="text-4xl font-bold text-black leading-tight"
      >
        Order a ride, make a <span className="text-[#008000]">green</span> choice
      </h1>
      <p 
        ref={descriptionRef}
        className="text-lg text-black/80 mb-2"
      >
        Request now or schedule for later
      </p>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="form-element">
        <TabsList className="grid w-full grid-cols-2 mb-2">
          <TabsTrigger value="ride">Ride</TabsTrigger>
          <TabsTrigger value="reserve">Reserve</TabsTrigger>
        </TabsList>
        <TabsContent value="ride" className="space-y-4">
          <div className="relative form-element">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Current location"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-black/20 bg-white/80 backdrop-blur-sm"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          
          <div className="relative form-element">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Enter destination"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-black/20 bg-white/80 backdrop-blur-sm"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
          
          {location && destination && (
            <div className="space-y-3 py-2 form-element">
              <h3 className="font-medium">Choose a ride</h3>
              {rideOptions.map(option => (
                <RideOption 
                  key={option.id}
                  title={option.title}
                  price={option.price}
                  time={option.time}
                  selected={selectedRide === option.title}
                  onSelect={() => setSelectedRide(option.title)}
                />
              ))}
            </div>
          )}
          
          <div className="flex gap-4 mt-2 form-element">
            <Button 
              onClick={handleRideElectric}
              className="bg-[#004D00] hover:bg-[#003300] text-white px-6 flex-1"
            >
              Request {selectedRide}
            </Button>
            <Button 
              onClick={handleSeePrices}
              variant="outline" 
              className="bg-white hover:bg-gray-100"
            >
              See prices
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="reserve" className="space-y-4">
          <div className="relative form-element">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Current location"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-black/20 bg-white/80 backdrop-blur-sm"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          
          <div className="relative form-element">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Enter destination"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-black/20 bg-white/80 backdrop-blur-sm"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
          
          <Button 
            onClick={handleScheduleRide}
            className="bg-[#004D00] hover:bg-[#003300] text-white px-6 w-full form-element"
          >
            Schedule a ride
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BookingForm;
