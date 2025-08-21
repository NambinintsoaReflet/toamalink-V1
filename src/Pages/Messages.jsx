import React, { useState } from "react";
import { CiMail } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

export default function Messages() {
  const navigate = useNavigate();
  const [conversations] = useState([
    { id: 1, name: "Sarah", lastMessage: "Salut, comment tu vas ?", time: "2 min", unread: true },
    { id: 2, name: "Jean", lastMessage: "On se voit demain 👍", time: "10 min", unread: false },
    { id: 3, name: "Lisa", lastMessage: "Ok, merci pour l’info !", time: "1h", unread: false },
  ]);

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
        {conversations.map((c) => (
          <div
            key={c.id}
            onClick={() => navigate(`/message/${c.id}`)}
            className={`flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50 ${
              c.unread ? "bg-blue-50" : "bg-white"
            }`}
          >
            <div>
              <p className={`font-medium ${c.unread ? "text-gray-900" : "text-gray-700"}`}>
                {c.name}
              </p>
              <p className="text-sm text-gray-500 truncate">{c.lastMessage}</p>
            </div>
            <div className="text-xs text-gray-400">{c.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
