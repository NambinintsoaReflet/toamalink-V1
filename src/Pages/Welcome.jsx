import React from "react";
import { BsCalendarDate } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { MdOutlinePlace } from "react-icons/md";
import { Link } from "react-router-dom";

import logo from "../assets/logo-png.png";

const Welcome = () => {
  return (
    <section className="container mx-auto p-8 md:p-12">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="w-12 h-12 mt-1 flex justify-self-center p-1 border rounded-full border-[#a9a9a9] bg-white mx-auto shadow-xs">
          <img src={logo} alt="" />
        </div>
        <h2 className="text-xl md:text-3xl font-bold mb-4">
          Welcome to our expat community in Toamasina
        </h2>
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Join a vibrant expat network, discover local events, and access
          essential resources to make your life in Toamasina easier.
        </p>
        <Link
          to="/login"
          className="inline-block mt-4 text-white bg-amber-500 p-2 rounded-2xl w-50 hover:underline font-medium"
        >
          Login
        </Link>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Connexion avec expats */}
        <div className="bg-white dark:bg-gray-200 p-6 rounded-xl shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-full mb-4 mx-auto">
            <FiUsers className="text-xl" />
          </div>
          <h3 className="text-xl font-bold text-center mb-2">
            Meet other expats
          </h3>
          <p className="text-center text-gray-800 ">
            Connect with other expats in Toamasina, share your experiences, ask
            questions, and build a supportive network.
          </p>
        </div>

        {/* Événements locaux */}
        <div className="bg-white dark:bg-gray-200 p-6 rounded-xl shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-center w-12 h-12 bg-green-100 text-green-600 rounded-full mb-4 mx-auto">
            <BsCalendarDate className="text-xl" />
          </div>
          <h3 className="text-xl font-bold text-center mb-2">
            Discover local events
          </h3>
          <p className="text-center text-gray-800 ">
            Stay informed about activities in Toamasina: friendly gatherings,
            cultural events, and much more. There's always something to
            experience!
          </p>
        </div>

        {/* Ressources utiles */}
        <div className="bg-white dark:bg-gray-200 p-6 rounded-xl shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-center w-12 h-12 bg-orange-100 text-orange-600 rounded-full mb-4 mx-auto">
            <MdOutlinePlace className="text-xl" />
          </div>
          <h3 className="text-xl font-bold text-center mb-2">
            Access key resources
          </h3>
          <p className="text-center text-gray-800 ">
            Explore our guides, tips, and recommendations to help you settle in
            and fully enjoy your stay in Toamasina.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
