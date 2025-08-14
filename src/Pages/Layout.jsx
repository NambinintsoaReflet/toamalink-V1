import React, { useContext } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { MenuContext } from "../Context/MenuContext/MenuContext";
import { AiOutlineHome } from "react-icons/ai";
import { GoCommentDiscussion } from "react-icons/go";
import { FaUserFriends } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import Navbar from "../Components/Navbar";
import PersonList from "../Components/PersonList";
import { VscDiffAdded } from "react-icons/vsc";

const Layout = ({ handleShowModal }) => {
  const { open, setOpen } = useContext(MenuContext);
  const location = useLocation(); // On utilise useLocation
  const pathname = location.pathname; // On accède à la propriété pathname

  const navItems = [
    {
      href: "/",
      label: "Home",
      icon: <AiOutlineHome className="text-2xl mb-[2px]" />,
    },
    {
      href: "/events",
      label: "Events",
      icon: <GoCommentDiscussion className="text-2xl mb-[2px]" />,
    },
    {
      href: "/messages",
      label: "Messages",
      icon: <VscDiffAdded className="text-2xl mb-[2px]" />,
    },
    {
      href: "/expats",
      label: "Expats",
      icon: <FaUserFriends className="text-2xl mb-[2px]" />,
    },
    {
      href: "/setting",
      label: "Settings",
      icon: <IoIosSettings className="text-2xl mb-[2px]" />,
    },
  ];

  return (
    <>
      <Navbar handleShowModal={handleShowModal} />
      <div class="h-[80vh] overflow-hidden mt-14">
        <div className="h-full flex">
          {/* <aside
            className={`bg-white mt-1 overflow-hidden transition-all duration-200 h-screen w-80 p-4 ${
              open ? "block" : "hidden"
            } lg:block fixed lg:p-4`}
          >
            <ul>
              {navItems.map(({ href, label, icon }) => (
                <li
                  key={href}
                  className={`flex items-center text-lg rounded-sm text-gray-400 p-2 pl-2 transition-colors ${
                    pathname === href
                      ? "bg-blue-200 text-blue-600"
                      : " hover:text-blue-600"
                  }`}
                >
                  {icon}
                  <Link to={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </aside> */}

          <div
            class="bg-white lg:ml-80 w-200 p-4 no-scrollbar overflow-y-scroll h-full"
            onClick={() => setOpen(false)}
          >
            <Outlet />
          </div>

          <div class="bg-gray-100 p-4 no-scrollbar overflow-y-scroll w-100 h-full hidden lg:block">
           <PersonList/>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 flex justify-between items-center lg:hidden">
        <ul className="flex justify-around w-full">
        
              {navItems.map(({ href, label, icon }) => (
                <li
                  key={href}
                  className={`flex flex-col items-center justify-center p-2 px-3 rounded-2xl transition-colors ${
                    pathname === href
                      ? "bg-cyan-600 text-white"
                      : " hover:text-blue-600"
                  }`}
                >
                  {icon}
                  <Link className="text-xs" to={href}>{label}</Link>
                </li>
              ))}
        </ul>
      </div>
    </>
  );
};

export default Layout;
