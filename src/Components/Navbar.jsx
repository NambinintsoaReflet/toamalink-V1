import { AiOutlineHome } from "react-icons/ai";
import logoPng from "../assets/logo.png"; // Adjust the path as necessary
import { MenuContext } from "../Context/MenuContext/MenuContext";
import { FaBars, FaUserCircle, FaUserFriends } from "react-icons/fa"; // N'oubliez pas d'importer l'icône si vous l'utilisez
import { Link, useLocation } from "react-router-dom";
import { GoCommentDiscussion } from "react-icons/go";
import { VscDiffAdded } from "react-icons/vsc";
import { IoIosSettings } from "react-icons/io";

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
          <div className="text-gray-800 font-medium">{user.name}</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
