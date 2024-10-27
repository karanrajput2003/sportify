import React from "react";
import MainContent from "../../Components/Home/MainContent";
import Navbar from "../../Components/Home/Navbar";
import UpcomingEvent from "../../Components/Home/UpcomingEvent";
import Service from "../../Components/Home/Service";
import CustomerFeedback from "../../Components/Home/CustomerFeedback";
import ContactUs from "../../Components/Home/ContactUs";

function Home() {
  return (
    <>
      <Navbar />
      <main class="flex-1">
        <MainContent />
        <UpcomingEvent />
        <Service />
        <CustomerFeedback />
        <ContactUs />
      </main>
    </>
  );
}

export default Home;
