import React, { useEffect, useState } from "react";
import { CiMail } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { api } from "../api/axios";
import { useAuth } from "../Context/AuthContext";

export default function Messages() {
  const [users, setUsers] = useState([]);
  const userId = useAuth();
  const navigate = useNavigate();

  // Charger les conversations + dernier message
  const fetchDiscussion = async () => {
    try {
      const { data } = await api.post("/users-with-last-message", {
        user_id: userId.userId,
      });

      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Erreur lors du chargement :", err);
    }
  };

  useEffect(() => {
    fetchDiscussion();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <CiMail className="text-blue-600 text-2xl" /> Messages
        </h1>
      </div>

      {/* Liste des conversations */}
      <div className="bg-white rounded-2xl shadow-md divide-y">
        {users.map((c) => (
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
              {c.lastMessageTime
                ? c.lastMessageTime
                : ""}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
