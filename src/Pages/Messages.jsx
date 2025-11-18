import React, { useEffect, useState } from "react";
import { CiMail } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { api } from "../api/axios";
import { useAuth } from "../Context/AuthContext";

export default function Messages() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userId } = useAuth(); // Déstructurez directement l'ID de l'objet retourné
  const navigate = useNavigate();

  // Charger les conversations + dernier message
  const fetchDiscussion = async () => {
    // Si l'ID utilisateur n'est pas prêt, on arrête la requête
    if (!userId) return; 
    
    setIsLoading(true);

    try {
      const { data } = await api.post("/users-with-last-message", {
        user_id: userId,
      });

      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Erreur lors du chargement :", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // 💡 Déclenche fetchDiscussion lorsque le composant monte
    // et si l'ID utilisateur change (ce qui est rare après le montage, mais assure la cohérence)
    fetchDiscussion();
  }, [userId]); // AJOUTÉ : Ajout de userId comme dépendance

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <CiMail className="text-blue-600 text-2xl" /> Messages
        </h1>
      </div>

      <div className="bg-white rounded-2xl shadow-md divide-y">
        {isLoading ? (
          <div className="p-6 text-center text-lg text-blue-500">
            Chargement des conversations...
          </div>
        ) : users.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            Aucune conversation trouvée.
          </div>
        ) : (
          /* Liste des conversations */
          users.map((c) => (
            <div
              key={c.id}
              onClick={() => navigate(`/message/${c.id}`)}
              className={`flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50 ${
                c.unread ? "bg-blue-50" : "bg-white"
              }`}
            >
              <div>
                <p
                  className={`font-medium ${
                    c.unread ? "text-gray-900" : "text-gray-700"
                  }`}
                >
                  {c.last_name} {c.first_name}
                </p>

                <p className="text-sm text-gray-500 truncate">
                  {c.lastMessage ?? "Pas de message"}
                </p>
              </div>

              <div className="text-xs text-gray-400">
                {c.lastMessageTime ? c.lastMessageTime : ""}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}