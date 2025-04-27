
import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Car, Clock, MapPin, CreditCard, Shield } from "lucide-react";

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
    return location.pathname === path ? "font-bold text-[#008000]" : "text-black/80";
  };

  const navItems = [
    { path: "/", label: "Request a ride", icon: <Car className="w-4 h-4" /> },
    { path: "/rewards", label: "Reserve a ride", icon: <Clock className="w-4 h-4" /> },
    { path: "/prices", label: "See Prices", icon: <CreditCard className="w-4 h-4" /> },
    { path: "/services", label: "Explore ride options", icon: <Shield className="w-4 h-4" /> },
    { path: "/airport", label: "Airport rides", icon: <MapPin className="w-4 h-4" /> }
  ];

  return (
    <div ref={navRef} className="w-full px-6 py-3 bg-[#F2FCE2] border-t border-black/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#008000]">Ride</h2>
          <div className="flex gap-6 overflow-x-auto pb-1 hide-scrollbar">
            {navItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path} 
                className={`secondary-nav-link hover:text-[#008000] flex items-center gap-1 ${isActive(item.path)}`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondaryNav;
