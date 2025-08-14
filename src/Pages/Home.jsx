import React from "react";
import { BsCalendarDate } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { MdOutlinePlace } from "react-icons/md";
import EventList from "../Components/Events/EventList";

const Home = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center bg-gray-100">
        <EventList />
         <EventList />
      </div>
    </>
  );
};

export default Home;
