
import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const SecondaryNav = () => {
  const location = useLocation();
  const navRef = useRef(null);
  
  useEffect(() => {
    // Animation for the secondary nav
    gsap.from(navRef.current, {
      y: -20,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
      delay: 0.4
    });
    
    // Animate links
    gsap.from(".secondary-nav-link", {
      opacity: 0,
      y: -10,
      stagger: 0.07,
      delay: 0.6,
      duration: 0.4
    });
  }, []);
  
  const isActive = (path: string) => {
    return location.pathname === path ? "font-bold text-black" : "text-black/80";
  };

  return (
    <div ref={navRef} className="w-full px-6 py-3 bg-[#90EE90] border-t border-black/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-black">Ride</h2>
          <div className="flex gap-6 overflow-x-auto pb-1 hide-scrollbar">
            <Link 
              to="/" 
              className={`secondary-nav-link hover:text-black ${isActive("/")}`}
            >
              Request a ride
            </Link>
            <Link 
              to="/rewards" 
              className={`secondary-nav-link hover:text-black ${isActive("/rewards")}`}
            >
              Reserve a ride
            </Link>
            <Link 
              to="/prices" 
              className={`secondary-nav-link hover:text-black ${isActive("/prices")}`}
            >
              See Prices
            </Link>
            <Link 
              to="/services" 
              className={`secondary-nav-link hover:text-black ${isActive("/services")}`}
            >
              Explore ride options
            </Link>
            <Link 
              to="/airport" 
              className={`secondary-nav-link hover:text-black ${isActive("/airport")}`}
            >
              Airport rides
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondaryNav;
