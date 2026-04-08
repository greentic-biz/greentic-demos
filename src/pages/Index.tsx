import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import DemoGrid from "@/components/DemoGrid";
import WebchatPopup from "@/components/WebchatPopup";
import Footer from "@/components/Footer";

const Index = () => {
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Navbar onGetAccess={() => setPopupOpen(true)} />
      <Hero onGetAccess={() => setPopupOpen(true)} />
      <DemoGrid onWaitingList={() => setPopupOpen(true)} />
      <Footer />
      <WebchatPopup
        open={popupOpen}
        onClose={() => setPopupOpen(false)}
        url="https://waitinglist.greentic.ai"
        title="Get Early Access to Greentic"
      />
    </div>
  );
};

export default Index;
