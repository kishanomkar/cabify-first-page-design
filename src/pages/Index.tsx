
import Navbar from "@/components/Navbar";
import SecondaryNav from "@/components/SecondaryNav";
import BookingForm from "@/components/BookingForm";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#90EE90]">
      <Navbar />
      <SecondaryNav />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <BookingForm />
          
          <div className="relative">
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
