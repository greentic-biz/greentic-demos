import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import DemoGrid from "@/components/DemoGrid";
import WaitingListPopup from "@/components/WaitingListPopup";
import Footer from "@/components/Footer";

const Index = () => {
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Navbar onGetAccess={() => setPopupOpen(true)} />
      <Hero onGetAccess={() => setPopupOpen(true)} />
      <DemoGrid onWaitingList={() => setPopupOpen(true)} />
      <Footer />
      <WaitingListPopup open={popupOpen} onClose={() => setPopupOpen(false)} />
    </div>
  );
};

export default Index;
