import React from "react";
import MainContent from "../../Components/Judge/MainContent";
import Navbar from "../../Components/Judge/Navbar";
import UpcomingEvent from "../../Components/Home/UpcomingEvent";

function Judge_Home() {
  return (
    <>
      <Navbar />
      <main class="flex-1">
        <MainContent />
        {/* <UpcomingEvent /> */}
      </main>
    </>
  );
}

export default Judge_Home;
