import React, { useEffect, useState } from "react";
import { FaUser, FaWhatsapp } from "react-icons/fa";
import { RiMessage2Line } from "react-icons/ri";
import { IoMailUnreadOutline } from "react-icons/io5";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { api } from "../api/axios";

const PersonList = () => {
  const [expats, setExpats] = useState([]); // ← tableau au lieu de null
  const [loading, setLoading] = useState(true);

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
    <div className="container mx-auto">
      <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
        <LiaUserFriendsSolid className="text-blue-600 text-2xl" /> Expats
      </h1>

      {expats.length > 0 ? (
        <ul className="space-y-4">
          {expats.map((person) => (
            <li
              key={person.id}
              className="flex items-center justify-between p-2 bg-white shadow rounded-md hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-center space-x-3">
                <FaUser className="rounded-full mr-2 w-5 h-5" />
                <span className="text-base font-medium text-gray-800">
                  {person.first_name} {person.last_name}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <FaWhatsapp className="w-7 h-7 p-1 rounded-2xl text-emerald-600 bg-gray-200 hover:bg-emerald-600 hover:text-white cursor-pointer" />
                <RiMessage2Line className="w-7 h-7 p-1 rounded-2xl text-emerald-600 bg-gray-200 hover:bg-emerald-600 hover:text-white cursor-pointer" />
                <IoMailUnreadOutline className="w-7 h-7 p-1 rounded-2xl text-emerald-600 bg-gray-200 hover:bg-emerald-600 hover:text-white cursor-pointer" />
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
