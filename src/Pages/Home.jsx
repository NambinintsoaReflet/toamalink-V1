import React from "react";
import { BsCalendarDate } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { MdOutlinePlace } from "react-icons/md";
import EventList from "../Components/Events/EventList";
import { CiSearch } from "react-icons/ci";

const Home = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center bg-gray-100">
        <div className="flex items-center w-full mb-2 mt-4  px-1 py-2 shadow-sm bg-white justify-end">
          <div className="flex items-center space-x-2 rounded-sm p-2 max-w-sm border border-gray-300 w-full">
            <input
              type="search"
              placeholder="Rechercher..."
              className="px-4 w-full focus:outline-none"
            />
            <button className="flex items-center justify-center rounded-md hover:text-blue-600 cursor-pointer transition-colors">
              <CiSearch className="text-gray-500 text-xl" />
            </button>
          </div>
        </div>

        <EventList />
      </div>
    </>
  );
};

export default Home;
