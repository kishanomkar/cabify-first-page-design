
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Navbar from "@/components/Navbar";
import SecondaryNav from "@/components/SecondaryNav";
import BookingForm from "@/components/BookingForm";
import { Button } from "@/components/ui/button";
import { Shield, Car, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FeatureCard = ({ icon, title, description }) => {
  const cardRef = useRef(null);
  
  useEffect(() => {
    gsap.from(cardRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      delay: 0.5 + Math.random() * 0.5,
      ease: "power2.out"
    });
  }, []);
  
  return (
    <div ref={cardRef} className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md">
      <div className="w-12 h-12 bg-[#90EE90] rounded-full flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Index = () => {
  const navigate = useNavigate();
  const mainRef = useRef(null);
  const imageRef = useRef(null);
  const featuresSectionRef = useRef(null);
  const headingRef = useRef(null);
  
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
    
    // Features section
    gsap.from(featuresSectionRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      delay: 0.5,
      ease: "power2.out"
    });
    
    // Heading animation
    gsap.from(headingRef.current, {
      y: -30,
      opacity: 0,
      duration: 1,
      delay: 0.2,
      ease: "elastic.out(1, 0.5)"
    });
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col bg-[#90EE90]">
      <Navbar />
      <SecondaryNav />
      
      <main ref={mainRef} className="flex-1">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto w-full px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <BookingForm />
            
            <div ref={imageRef} className="relative order-first md:order-last">
              <img
                src="/lovable-uploads/a35d0c0d-6e1f-4f4b-aba7-e59438cda13c.png"
                alt="Electric Auto Rickshaw"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              <div className="absolute bottom-4 right-4 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-lg">
                <span className="font-bold text-[#004D00]">100% Electric</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="bg-[#E7FFE7] py-16">
          <div className="max-w-7xl mx-auto px-6" ref={featuresSectionRef}>
            <h2 ref={headingRef} className="text-4xl font-bold text-center mb-12">Why Choose Go Electric?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<Shield className="w-6 h-6" />}
                title="Safe & Reliable"
                description="Every ride is verified and tracked. Our drivers are trained professionals committed to your safety."
              />
              <FeatureCard 
                icon={<Car className="w-6 h-6" />}
                title="Eco-Friendly"
                description="100% electric fleet reduces carbon footprint. Choose green, choose the future."
              />
              <FeatureCard 
                icon={<Clock className="w-6 h-6" />}
                title="Fast & Affordable"
                description="Quick pickups and competitive rates starting at just ₹99. Pay less, go green."
              />
            </div>
            
            <div className="mt-12 text-center">
              <Button 
                className="bg-black text-white hover:bg-gray-800 text-lg px-8 py-6"
                onClick={() => navigate("/services")}
              >
                Explore Our Services
              </Button>
            </div>
          </div>
        </div>
        
        {/* Download App Section */}
        <div className="py-16 bg-gradient-to-br from-[#004D00] to-[#008800] text-white">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-4">Get the Go Electric App</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Download our app for a seamless booking experience, real-time tracking, and exclusive offers.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-black text-white hover:bg-gray-800">
                Download for iOS
              </Button>
              <Button className="bg-black text-white hover:bg-gray-800">
                Download for Android
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
