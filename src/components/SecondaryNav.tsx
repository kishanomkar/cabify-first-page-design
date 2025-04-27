
import { Link } from "react-router-dom";

const SecondaryNav = () => {
  return (
    <div className="w-full px-6 py-3 bg-[#90EE90] border-t border-black/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-black">Ride</h2>
          <div className="flex gap-6">
            <Link to="/request" className="text-black/80 hover:text-black">Request a ride</Link>
            <Link to="/reserve" className="text-black/80 hover:text-black">Reserve a ride</Link>
            <Link to="/prices" className="text-black/80 hover:text-black">See Prices</Link>
            <Link to="/explore" className="text-black/80 hover:text-black">Explore ride options</Link>
            <Link to="/airport" className="text-black/80 hover:text-black">Airport rides</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondaryNav;
