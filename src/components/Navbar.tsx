
import { Button } from "@/components/ui/button";
import { Search, Menu, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { toast } from "@/hooks/use-toast";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const location = useLocation();
  const navRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
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
  
  useEffect(() => {
    // Close mobile menu when route changes
    setMobileMenuOpen(false);
  }, [location.pathname]);
  
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

  return (
    <nav ref={navRef} className="w-full px-6 py-4 bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-2xl font-bold text-black flex items-center">
            Go Electric <span className="text-[#008000] ml-1">⚡</span>
          </Link>
          
          <div className="hidden md:flex gap-6">
            <Link 
              to="/" 
              className={`text-black hover:text-[#008000] transition-colors nav-link ${isActive("/")}`}
            >
              Home
            </Link>
            <Link 
              to="/services" 
              className={`text-black hover:text-[#008000] transition-colors nav-link ${isActive("/services")}`}
            >
              Services
            </Link>
            <Link 
              to="/rewards" 
              className={`text-black hover:text-[#008000] transition-colors nav-link ${isActive("/rewards")}`}
            >
              Rewards
            </Link>
            <Link 
              to="/prices" 
              className={`text-black hover:text-[#008000] transition-colors nav-link ${isActive("/prices")}`}
            >
              Pricing
            </Link>
            <Link 
              to="/airport" 
              className={`text-black hover:text-[#008000] transition-colors nav-link ${isActive("/airport")}`}
            >
              Airport
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
              placeholder="Where to?"
              className="pl-10 pr-4 py-2 rounded-full bg-gray-100 border-none focus:outline-none focus:ring-2 focus:ring-[#008000] w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogin}>Login</DropdownMenuItem>
              <DropdownMenuItem onClick={handleSignup}>Sign up</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Help</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button 
            variant="outline" 
            className="hidden md:flex bg-white hover:bg-gray-100 border-[#008000] text-[#008000]"
            onClick={handleLogin}
          >
            Log in
          </Button>
          <Button 
            className="hidden md:flex bg-[#008000] hover:bg-[#006400] text-white"
            onClick={handleSignup}
          >
            Sign up
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white mt-2 py-4 px-6 rounded-lg shadow-lg">
          <div className="flex flex-col space-y-3">
            <Link to="/" className="px-2 py-1 hover:bg-gray-100 rounded">Home</Link>
            <Link to="/services" className="px-2 py-1 hover:bg-gray-100 rounded">Services</Link>
            <Link to="/rewards" className="px-2 py-1 hover:bg-gray-100 rounded">Rewards</Link>
            <Link to="/prices" className="px-2 py-1 hover:bg-gray-100 rounded">Pricing</Link>
            <Link to="/airport" className="px-2 py-1 hover:bg-gray-100 rounded">Airport</Link>
            <div className="pt-2 border-t border-gray-200">
              <Button 
                className="w-full bg-[#008000] hover:bg-[#006400] text-white mb-2"
                onClick={handleSignup}
              >
                Sign up
              </Button>
              <Button 
                variant="outline" 
                className="w-full border-[#008000] text-[#008000]"
                onClick={handleLogin}
              >
                Log in
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
