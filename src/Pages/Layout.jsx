import React, { useContext } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { MenuContext } from "../Context/MenuContext/MenuContext";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineEvent } from "react-icons/md";
import { GoCommentDiscussion } from "react-icons/go";
import { FaUserFriends } from "react-icons/fa";
import { SiHelpscout } from "react-icons/si";
import { IoIosSettings } from "react-icons/io";
import Navbar from "../Components/Navbar";
import PersonList from "../Components/PersonList";

const Layout = ({ handleShowModal }) => {
  const { open, setOpen } = useContext(MenuContext);
  const location = useLocation(); // On utilise useLocation
  const pathname = location.pathname; // On accède à la propriété pathname

  const navItems = [
    {
      href: "/",
      label: "Home",
      icon: <AiOutlineHome className="mr-2 text-xl" />,
    },
    {
      href: "/events",
      label: "Events",
      icon: <MdOutlineEvent className="mr-2 text-xl" />,
    },
    {
      href: "/messages",
      label: "Messages",
      icon: <GoCommentDiscussion className="mr-2 text-xl" />,
    },
    {
      href: "/expats",
      label: "Expats",
      icon: <FaUserFriends className="mr-2 text-xl" />,
    },
    {
      href: "/about",
      label: "About",
      icon: <SiHelpscout className="mr-2 text-xl" />,
    },
    {
      href: "/setting",
      label: "Settings",
      icon: <IoIosSettings className="mr-2 text-xl" />,
    },
  ];

  return (
    <>
      <Navbar handleShowModal={handleShowModal} />
      <div class="min-h-screen overflow-hidden mt-14">
        <div className="flex h-screen">
          <aside
            className={`bg-white mt-1 overflow-hidden transition-all duration-200 h-screen w-80 p-4 ${
              open ? "block" : "hidden"
            } lg:block fixed lg:p-4`}
          >
            <ul>
              {navItems.map(({ href, label, icon }) => (
                <li
                  key={href}
                  className={`flex items-center text-lg rounded-sm p-2 pl-2 transition-colors ${
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
          </aside>

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
    </>
  );
};

export default Layout;
