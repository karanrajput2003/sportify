import React from "react";
import MainContent from "../../Components/Admin/MainContent";
import Navbar from "../../Components/Admin/Navbar";
import UpcomingEvent from "../../Components/Home/UpcomingEvent";
import Service from "../../Components/Home/Service";
import CustomerFeedback from "../../Components/Home/CustomerFeedback";
import ContactUs from "../../Components/Home/ContactUs";

function Admin_Home() {
  return (
    <>
      <Navbar />
      <main class="flex-1">
        <MainContent />
        <UpcomingEvent />
        {/* <Service />
        <CustomerFeedback />
        <ContactUs /> */}
      </main>
    </>
  );
}

export default Admin_Home;
