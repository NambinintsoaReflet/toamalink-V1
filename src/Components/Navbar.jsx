import { AiOutlineHome } from "react-icons/ai";
import logoPng from "../assets/logo.png"; // Adjust the path as necessary
import { MenuContext } from "../Context/MenuContext/MenuContext";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import {
  FaAngleDown,
  FaBars,
  FaUserCircle,
  FaUserFriends,
} from "react-icons/fa"; // N'oubliez pas d'importer l'icône si vous l'utilisez

const Navbar = () => {
  // 🔁 Exemple simulé : remplace ceci par ta logique réelle d'authentification
  // const user = null; // ou bien { name: "John Doe" } si connecté
  const user = { name: "John Doe" }; // Simule un utilisateur connecté
  return (
    // Correction ici : 'class' a été remplacé par 'className'
    <div className="flex justify-between items-center p-4 pt-1 pb-1 bg-white fixed top-0 left-0 right-0 z-50 shadow-md">
      <div className="flex items-center">
        <img src={logoPng} alt="" className="w-auto h-12 sm:h-15" />
      </div>
      <div className="flex items-center justify-center space-x-3">
        <div className="flex items-center space-x-2 ">
          <FaUserCircle className="text-2xl text-cyan-800" />
          <Menu as="div" className="relative inline-block">
            <MenuButton className="inline-flex w-full justify-center gap-x-1.5 cursor-pointer rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring-1 inset-ring-gray-300 hover:bg-gray-50">
              <div className="text-gray-800 font-medium">{user.name}</div>
              <ChevronDownIcon
                aria-hidden="true"
                className="-mr-1 size-5 text-gray-400"
              />
            </MenuButton>

            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg outline-1 outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
            >
              <div className="py-1">
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                  >
                    Account settings
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                  >
                    Support
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                  >
                    License
                  </a>
                </MenuItem>
                <form action="#" method="POST">
                  <MenuItem>
                    <button
                      type="submit"
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                    >
                      Sign out
                    </button>
                  </MenuItem>
                </form>
              </div>
            </MenuItems>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
