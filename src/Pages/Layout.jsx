import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import PersonList from "../Components/PersonList";

import { NavMobile, NavWeb } from "../Data/Menu";

const Layout = () => {
  const location = useLocation(); // On utilise useLocation
  const pathname = location.pathname; // On accède à la propriété pathname

  return (
    <>
      <Navbar />
      <div class="h-[76vh] overflow-hidden mt-14 lg:min-h-screen">
        <div className="h-full flex">
          <aside
            className={`bg-white mt-1 overflow-hidden hidden transition-all duration-200 h-screen w-80 p-4 ${
              open ? "block" : "hidden"
            } lg:block fixed lg:p-4`}
          >
            <ul>
              {NavWeb.map(({ href, label, icon, nb }) => (
                <li
                  key={href}
                  className={`flex items-center p-2 px-3 rounded-sm transition-colors ${
                    pathname === href
                      ? "bg-blue-200 text-blue-600"
                      : " hover:text-blue-600"
                  }`}
                >
                  <Link to={href} className="flex">
                    {icon}
                    {label}
                  </Link>
                  <div className="ml-2 bg-red-600 rounded-2xl text-white px-2 text-sm">
                    {nb}
                  </div>
                </li>
              ))}
            </ul>
          </aside>

          <div class="bg-white lg:ml-80 w-200 no-scrollbar overflow-y-scroll h-full lg:mt-2">
            <Outlet />
          </div>

          <div class="bg-gray-100 p-4 no-scrollbar overflow-y-scroll w-100 h-full hidden lg:block">
            <PersonList />
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_6px_rgba(0,0,0,0.1)] px-4 py-2 flex justify-between items-center lg:hidden">
        <ul className="flex justify-around w-full">
          {NavMobile.map(({ href, label, icon, nb }) => (
            <li
              key={href}
              className={`flex flex-col items-center justify-center p-2 px-3 rounded-2xl transition-colors ${
                pathname === href
                  ? "bg-cyan-600 text-white shadow-lg"
                  : " hover:text-blue-600"
              }`}
            >
              <div className="absolute top-0 text-[10px] text-white bg-red-600 px-1.5 rounded-xl ml-5 mt-0.5">
                {nb}
              </div>
              <Link className="text-xs" to={href}>
                {icon}
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Layout;
