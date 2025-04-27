
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Navbar from "@/components/Navbar";
import SecondaryNav from "@/components/SecondaryNav";
import BookingForm from "@/components/BookingForm";

const Index = () => {
  const mainRef = useRef(null);
  const imageRef = useRef(null);
  
  useEffect(() => {
    // Main content animation
    gsap.from(mainRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    });
    
    // Image animation
    gsap.from(imageRef.current, {
      opacity: 0,
      x: 50,
      duration: 1,
      delay: 0.3,
      ease: "power3.out"
    });
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col bg-[#90EE90]">
      <Navbar />
      <SecondaryNav />
      
      <main ref={mainRef} className="flex-1 max-w-7xl mx-auto w-full px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <BookingForm />
          
          <div ref={imageRef} className="relative">
            <img
              src="/lovable-uploads/a35d0c0d-6e1f-4f4b-aba7-e59438cda13c.png"
              alt="Electric Auto Rickshaw"
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
