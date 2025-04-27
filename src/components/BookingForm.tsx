
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

const BookingForm = () => {
  return (
    <div className="flex flex-col gap-4 max-w-md">
      <h1 className="text-5xl font-bold text-black leading-tight">
        Sustainable Rides,
        <br />
        On Your Schedule.
      </h1>
      <p className="text-lg text-black/80 mb-4">
        Add your trip details, hop in, and go.
      </p>
      
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Enter Location"
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-black/20 bg-white/80 backdrop-blur-sm"
        />
      </div>
      
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Enter destination"
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-black/20 bg-white/80 backdrop-blur-sm"
        />
      </div>
      
      <div className="flex gap-4 mt-4">
        <Button className="bg-[#004D00] hover:bg-[#003300] text-white px-6">
          See prices
        </Button>
        <Button variant="outline" className="bg-white hover:bg-gray-100">
          Ride Electric
        </Button>
      </div>
    </div>
  );
};

export default BookingForm;
