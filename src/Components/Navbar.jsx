import { useContext } from "react";
import logoPng from "../assets/logo-png.png"; // Adjust the path as necessary
import { MenuContext } from "../Context/MenuContext/MenuContext";
import { FaBars } from 'react-icons/fa'; // N'oubliez pas d'importer l'icône si vous l'utilisez

const Navbar = ({ handleShowModal }) => {
  const { toggle } = useContext(MenuContext);

  // 🔁 Exemple simulé : remplace ceci par ta logique réelle d'authentification
  // const user = null; // ou bien { name: "John Doe" } si connecté
  const user = { name: "John Doe" }; // Simule un utilisateur connecté
  return (
    // Correction ici : 'class' a été remplacé par 'className'
    <div className="flex justify-between items-center p-4 pt-0 pb-0 bg-white fixed top-0 left-0 right-0 z-50 shadow-md">
      <div className="flex items-center gap-2">
        <img src={logoPng} alt="" className="w-15 h-15" />
        ToamaLink
      </div>
      <div className="flex items-center justify-center space-x-4">
        {!user ? (
          <>
            <button
              className="p-1 pl-3 pr-3 bg-amber-400 rounded-sm text-amber-50"
              onClick={handleShowModal}
            >
              Login
            </button>
            <button className="p-1 pl-3 pr-3 bg-blue-400 rounded-sm text-amber-50">
              Sign in
            </button>
          </>
        ) : (
          <div className="text-gray-800 font-medium">{user.name}</div>
        )}

        <div onClick={toggle} className={`p-0.5 lg:hidden ${user ? "" : "hidden"}`}>
          {/* Assurez-vous d'importer FaBars si vous l'utilisez */}
          <FaBars className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;