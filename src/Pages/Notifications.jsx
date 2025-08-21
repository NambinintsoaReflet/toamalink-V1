import React, { useState } from "react";
import { CiBellOn } from "react-icons/ci";
import { FaRegCommentDots, FaRegHeart, FaCheckCircle } from "react-icons/fa";

export default function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "message",
      text: "Nouveau message de Sarah",
      time: "Il y a 2 min",
      read: false,
    },
    {
      id: 2,
      type: "like",
      text: "Jean a aimé votre publication",
      time: "Il y a 10 min",
      read: false,
    },
    {
      id: 3,
      type: "system",
      text: "Votre mot de passe a été changé avec succès",
      time: "Hier",
      read: true,
    },
  ]);

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  };

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <CiBellOn className="text-blue-600 text-2xl" /> Notifications
        </h1>
      </div>

      {/* Liste */}
      <div className="bg-white rounded-2xl shadow-md divide-y">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`flex items-center justify-between p-4 transition ${
              n.read ? "bg-white" : "bg-blue-50"
            }`}
          >
            {/* Icône + texte */}
            <div className="flex items-center gap-3">
              {n.type === "message" && (
                <FaRegCommentDots className="text-blue-500 text-lg" />
              )}
              {n.type === "like" && (
                <FaRegHeart className="text-pink-500 text-lg" />
              )}
              {n.type === "system" && (
                <FaCheckCircle className="text-green-500 text-lg" />
              )}
              <div>
                <p
                  className={`text-sm ${
                    n.read ? "text-gray-600" : "text-gray-900 font-semibold"
                  }`}
                >
                  {n.text}
                </p>
                <span className="text-xs text-gray-400">{n.time}</span>
              </div>
            </div>

            {/* Bouton */}
            {!n.read && (
              <button
                onClick={() => markAsRead(n.id)}
                className="text-xs text-blue-600 hover:underline"
              >
                Marquer comme lu
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
