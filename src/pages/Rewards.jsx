
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import SecondaryNav from "@/components/SecondaryNav";
import { toast } from "@/hooks/use-toast";
import { CalendarIcon, Clock } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

const Benefits = () => {
  const benefitsRef = useRef(null);
  
  useEffect(() => {
    gsap.from(benefitsRef.current.children, {
      opacity: 0,
      y: 20,
      stagger: 0.2,
      duration: 0.8,
      delay: 0.5
    });
  }, []);
  
  return (
    <div className="bg-transparent p-6 rounded-lg">
      <h2 className="text-3xl font-bold mb-6">Benefits</h2>
      <div ref={benefitsRef} className="space-y-4">
        <div className="flex items-center gap-3">
          <CalendarIcon className="h-6 w-6" />
          <span className="text-lg">Fresh Food, Fast Delivery</span>
        </div>
        <div className="flex items-center gap-3">
          <Clock className="h-6 w-6" />
          <span className="text-lg">Always On Time</span>
        </div>
        <div className="flex items-center gap-3">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
            />
          </svg>
          <span className="text-lg">Secure & Safe Rides</span>
        </div>
      </div>
    </div>
  );
};

const GroupRide = () => {
  const [friends, setFriends] = useState([
    { id: 1, name: "Brian", selected: true },
    { id: 2, name: "Sarah", selected: true },
    { id: 3, name: "Michael", selected: false },
    { id: 4, name: "Emma", selected: false },
  ]);
  
  const groupRideRef = useRef(null);
  const phoneRef = useRef(null);
  
  useEffect(() => {
    gsap.from(groupRideRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 0.8
    });
    
    gsap.from(phoneRef.current, {
      opacity: 0,
      x: -50,
      rotation: -5,
      duration: 1,
      delay: 1.2
    });
  }, []);
  
  const toggleFriend = (id) => {
    setFriends(friends.map(friend => 
      friend.id === id ? { ...friend, selected: !friend.selected } : friend
    ));
    
    toast({
      title: "Friend selection updated",
      description: "Your group ride settings have been updated",
      duration: 2000,
    });
  };
  
  return (
    <div className="mt-16">
      <div ref={groupRideRef} className="mb-6">
        <h2 className="text-4xl font-bold mb-3">Ride with friends seamlessly</h2>
        <p className="text-lg">
          Riding with friends just got easier: set up a group ride in the 
          Go Electric app, invite your friends, and arrive at your destination.
          Friends who ride together save together.
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div 
          ref={phoneRef} 
          className="bg-white rounded-2xl shadow-xl p-6 w-full md:w-auto"
        >
          <h3 className="text-xl font-semibold mb-4">Set pickup order</h3>
          <div className="space-y-4">
            {friends.map((friend) => (
              <div 
                key={friend.id} 
                className="flex items-center justify-between border-b pb-2"
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs">
                    {friend.id}
                  </div>
                  <span className="font-medium">{friend.name}</span>
                </div>
                <Checkbox 
                  checked={friend.selected} 
                  onCheckedChange={() => toggleFriend(friend.id)} 
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Rewards = () => {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState("");
  
  const containerRef = useRef(null);
  const formRef = useRef(null);
  
  useEffect(() => {
    // Page entrance animation
    const tl = gsap.timeline();
    
    tl.from(containerRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    }).from(formRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: "back.out(1.7)"
    }, "-=0.3");
    
    // Scroll to top
    window.scrollTo(0, 0);
  }, []);
  
  const handleNextClick = () => {
    if (!date || !time) {
      toast({
        title: "Missing information",
        description: "Please select both date and time for your ride",
        variant: "destructive",
      });
      return;
    }
    
    // Format the selected date for display
    const formattedDate = date ? format(date, "MMMM d, yyyy") : "";
    
    toast({
      title: "Ride Reserved!",
      description: `Your ride is scheduled for ${formattedDate} at ${time}`,
      duration: 3000,
    });
  };
  
  const timeOptions = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", 
    "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
    "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM",
    "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM"
  ];
  
  return (
    <div className="min-h-screen flex flex-col bg-[#90EE90]" ref={containerRef}>
      <Navbar />
      <SecondaryNav />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div 
            ref={formRef} 
            className="bg-[#FFD6BA] rounded-lg p-8 shadow-lg"
          >
            <h1 className="text-4xl font-bold mb-2">
              Get your ride right
              <br />with Go Electric Reserve
            </h1>
            <p className="text-lg mb-6">Choose date and time</p>
            
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full bg-white justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "MMM dd, yyyy") : "dd-mm-yyyy"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 pointer-events-auto">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="flex-1">
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full p-2 rounded-md border border-gray-300 bg-white"
                >
                  <option value="">Select time</option>
                  {timeOptions.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <Button 
              onClick={handleNextClick}
              className="w-full bg-black text-white hover:bg-gray-900"
            >
              Next
            </Button>
          </div>
          
          <Benefits />
        </div>
        
        <GroupRide />
      </main>
    </div>
  );
};

export default Rewards;
