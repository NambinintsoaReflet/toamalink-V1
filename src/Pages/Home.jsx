import React from "react";
import { BsCalendarDate } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { MdOutlinePlace } from "react-icons/md";

const Home = () => {
  return (
    <>
      <div className="h-90 mt-1 w-full p-8 rounded-2xl bg-header bg-cover bg-center flex items-center justify-center">
        <div className="flex flex-col items-center p-4 bg-gray-600/30 rounded-2xl text-white text-center">
          <h1 className="text-xl">Connect, Share, and Thrive in Toamasina</h1>
          <p className="text-base mt-2 max-w-2xl">
            Join a vibrant community of expatriates in Toamasina. Discover local
            events, share experiences, and access valuable resources to make
            your transition smoother and more rewarding.
          </p>
          <div className="">
            {/* <Signin /> */}
            {/* <Login /> */}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center mt-10 ">
        <h2 className="text-xl">Explore the Benefits of joining</h2>
        <p className="text-center max-w-2xl mt-4">
          Out platform offers a range of features designed to help you connect
          with other expatriates, stay informed about local events, and navigate
          life in Toamasina with ease.
        </p>
        <div className="flex flex-co flex-wrap justify-center m-6 md:flex-row mb-10 gap-10 mt-10">
          <div className="border p-6 rounded-lg shadow-md flex-1">
            <div className="flex justify-between items-center gap-2 mb-4">
              <FiUsers className="flex flex-start" />
              <h3 className="font-medium">Connect with Expats</h3>
            </div>
            <p className="flex-1 text-center p-4">
              Find and connect with other expatriates in Toamasina, Share your
              experiences, ask questions, and build a supportive network.
            </p>
          </div>
          <div className="border p-6 rounded-lg shadow-md flex-1">
            <div className="flex justify-between gap-2 items-center mb-4">
              <BsCalendarDate className="flex flex-start"/>
              <h3 className="font-medium">Discover Local Events</h3>
            </div>

            <p className="flex-1 text-center p-4">
              Stay up-to-date on the lastest events and activities shappening in
              and around Toamasina. From social gatherings to cultural
              experiences, there's always something to do.
            </p>
          </div>
          <div className="border p-6 rounded-lg shadow-md flex-1">
            <div className="flex justify-between gap-2 items-center mb-4">
              <MdOutlinePlace />
              <h3 className="font-medium">Access Essential Resources</h3>
            </div>
            <p className="flex-1 text-center p-4">
              Access a curated collection of resources, including guides, tips,
              and recommendations to help you settle in and make the most fo
              your time in Toamasina.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
