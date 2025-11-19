import React, { useEffect, useState } from "react";
import { FaUser, FaWhatsapp } from "react-icons/fa";
import { RiMessage2Line } from "react-icons/ri";
import { IoMailUnreadOutline } from "react-icons/io5";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { api } from "../api/axios";
import { useNavigate } from "react-router-dom";

const PersonList = () => {
  const [expats, setExpats] = useState([]); // ← tableau au lieu de null
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Charger les utilisateurs sauf celui connecté
  const fetchExpats = async () => {
    try {
      const { data } = await api.get("/users");
      // console.log("Utilisateurs :", data);

      // si ton contrôleur renvoie un objet { data: [...] }
      // on vérifie pour éviter une erreur
      setExpats(Array.isArray(data.data) ? data.data : data);
    } catch (err) {
      console.error("Erreur lors du chargement des utilisateurs :", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpats();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Chargement...</p>;
  }

  return (
    <div className="container mx-auto p-2">
      <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
        <LiaUserFriendsSolid className="text-blue-600 text-2xl" /> Expats
      </h1>

      {expats.length > 0 ? (
        <ul className="">
          {expats.map((person) => (
            <li
              key={person.id}
              className="flex items-center justify-between p-2 bg-white shadow rounded-sx cursor-pointer hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-center space-x-3">
                <FaUser className="rounded-full mr-2 w-5 h-5" />
                <span className="text-base font-medium text-gray-800">
                  {person.first_name} {person.last_name}
                </span>
              </div>

              {/* <div className="flex items-center space-x-2">
                <button className="flex gap-2 px-2 py-1 bg-blue-200 text-white">
                  Message{" "}
                  <RiMessage2Line
                    key={person.id}
                    onClick={() => navigate(`/message/${person.id}`)}
                    className="w-7 h-7 p-1  text-emerald-600  hover:bg-emerald-600 hover:text-white cursor-pointer"
                  />
                </button>
              </div> */}
              <div className="flex items-center space-x-2">
                <button
                  // L'action de navigation est attachée au bouton complet
                  onClick={() => navigate(`/message/${person.id}`)}
                  className="flex items-center justify-center gap-2 cursor-pointer px-3 py-1.5 rounded-full bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-md"
                >
                  {/* Texte du bouton */}
                  Message
                  {/* Icône intégrée, elle hérite de la couleur text-white du parent */}
                  <RiMessage2Line className="w-5 h-5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">
          Aucun autre utilisateur trouvé.
        </p>
      )}
    </div>
  );
};

export default PersonList;
