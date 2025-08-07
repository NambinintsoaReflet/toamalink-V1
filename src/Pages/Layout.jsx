import React, { useContext } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { MenuContext } from "../Context/MenuContext/MenuContext";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineEvent } from "react-icons/md";
import { GoCommentDiscussion } from "react-icons/go";
import { FaUserFriends } from "react-icons/fa";
import { SiHelpscout } from "react-icons/si";
import { IoIosSettings } from "react-icons/io";

const Layout = () => {
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

  const user = null; // Simule un utilisateur non connecté, remplacez par votre logique d'authentification
  // const user = { name: "John Doe" }; // Simule un utilisateur connecté

  return (
    <>
      {/* <Navbar handleShowModal={handleShowModal} /> */}
      <div className="bg-gray-100 min-h-screen lg:mt-12 mt-14">
        <div className="flex">
          <aside
            className={`z-10 bg-white mt-1 overflow-hidden transition-all duration-200 h-screen ${
              open ? "w-60 p-4" : "w-0"
            } lg:w-60 fixed lg:p-4 ${user ? "" : "lg:hidden"}`}
          >
            <ul>
              {navItems.map(({ href, label, icon }) => (
                <li
                  key={href}
                  className={`flex items-center rounded-sm p-1 pl-2 transition-colors ${
                    pathname === href
                      ? "bg-blue-200 text-blue-600"
                      : "hover:bg-blue-200 hover:text-blue-600"
                  }`}
                >
                  {icon}
                  <Link to={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </aside>
          <main
            className={`p-4 w-full ${user ? "lg:ml-60" : ""} `}
            onClick={() => setOpen(false)}
          >
            <Outlet />
          </main>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
