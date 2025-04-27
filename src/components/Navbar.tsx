
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full px-6 py-4 bg-[#90EE90] flex items-center justify-between">
      <div className="flex items-center gap-8">
        <Link to="/" className="text-2xl font-bold text-black flex items-center">
          Go Electric ⚡
        </Link>
        
        <div className="hidden md:flex gap-6">
          <Link to="/ride" className="text-black hover:text-gray-700">Ride</Link>
          <Link to="/drive" className="text-black hover:text-gray-700">Drive</Link>
          <Link to="/business" className="text-black hover:text-gray-700">Business</Link>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:flex items-center">
          <Search className="absolute left-3 h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search Go Electric"
            className="pl-10 pr-4 py-2 rounded-full bg-[#FFFFFF40] border-none focus:outline-none focus:ring-2 focus:ring-black/20 w-64"
          />
        </div>
        
        <Button variant="ghost" className="text-black hover:bg-[#FFFFFF40]">
          EN
        </Button>
        <Button variant="ghost" className="text-black hover:bg-[#FFFFFF40]">
          Help
        </Button>
        <Button variant="outline" className="bg-white hover:bg-gray-100">
          Sign up
        </Button>
        <Button variant="outline" className="bg-white hover:bg-gray-100">
          Log in
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
