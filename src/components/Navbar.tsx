
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { toast } from "@/hooks/use-toast";

const Navbar = () => {
  const location = useLocation();
  const navRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  useEffect(() => {
    // Animate navbar on mount
    gsap.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    });
    
    // Animate links
    gsap.from(".nav-link", {
      opacity: 0,
      y: -20,
      stagger: 0.1,
      delay: 0.3,
      duration: 0.5
    });
  }, []);
  
  const isActive = (path: string) => {
    return location.pathname === path ? "border-b-2 border-black" : "";
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast({
        title: "Search Initiated",
        description: `Searching for "${searchQuery}"`,
        duration: 3000,
      });
    }
  };

  const handleLogin = () => {
    toast({
      title: "Login Coming Soon",
      description: "User login functionality will be available soon!",
      duration: 3000,
    });
  };

  const handleSignup = () => {
    toast({
      title: "Sign Up Coming Soon",
      description: "User registration functionality will be available soon!",
      duration: 3000,
    });
  };

  const handleLanguage = () => {
    toast({
      title: "Language Options",
      description: "Additional languages will be available soon!",
      duration: 2000,
    });
  };

  const handleHelp = () => {
    toast({
      title: "Help & Support",
      description: "Our support team is available 24/7. Contact us for assistance.",
      duration: 3000,
    });
  };

  return (
    <nav ref={navRef} className="w-full px-6 py-4 bg-[#90EE90] flex items-center justify-between">
      <div className="flex items-center gap-8">
        <Link to="/" className="text-2xl font-bold text-black flex items-center">
          Go Electric ⚡
        </Link>
        
        <div className="hidden md:flex gap-6">
          <Link 
            to="/" 
            className={`text-black hover:text-gray-700 transition-colors nav-link ${isActive("/")}`}
          >
            Home
          </Link>
          <Link 
            to="/services" 
            className={`text-black hover:text-gray-700 transition-colors nav-link ${isActive("/services")}`}
          >
            Services
          </Link>
          <Link 
            to="/rewards" 
            className={`text-black hover:text-gray-700 transition-colors nav-link ${isActive("/rewards")}`}
          >
            Rewards
          </Link>
          <Link 
            to="/business" 
            className="text-black hover:text-gray-700 transition-colors nav-link"
          >
            Business
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <form 
          onSubmit={handleSearch}
          className="relative hidden md:flex items-center"
        >
          <Search className="absolute left-3 h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search Go Electric"
            className="pl-10 pr-4 py-2 rounded-full bg-[#FFFFFF40] border-none focus:outline-none focus:ring-2 focus:ring-black/20 w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
        
        <Button 
          variant="ghost" 
          className="text-black hover:bg-[#FFFFFF40]"
          onClick={handleLanguage}
        >
          EN
        </Button>
        <Button 
          variant="ghost" 
          className="text-black hover:bg-[#FFFFFF40]"
          onClick={handleHelp}
        >
          Help
        </Button>
        <Button 
          variant="outline" 
          className="bg-white hover:bg-gray-100"
          onClick={handleSignup}
        >
          Sign up
        </Button>
        <Button 
          variant="outline" 
          className="bg-white hover:bg-gray-100"
          onClick={handleLogin}
        >
          Log in
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
