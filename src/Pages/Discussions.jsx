import React, { useState, useRef, useEffect } from "react";
import { CiPaperplane } from "react-icons/ci";
import { useParams, useNavigate } from "react-router-dom";

export default function Discussion() {
  const { id } = useParams();
  const navigate = useNavigate();

  const users = {
    1: "Sarah",
    2: "Jean",
    3: "Lisa",
  };

  const [messages, setMessages] = useState([
    { id: 1, sender: "Sarah", text: "Salut ! Comment tu vas ?" },
    { id: 2, sender: "Moi", text: "Très bien merci, et toi ?" },
    { id: 3, sender: "Sarah", text: "Je vais super ! Tu fais quoi de beau ?" },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, { id: Date.now(), sender: "Moi", text: newMessage }]);
      setNewMessage("");
    }
  };

  // Gérer la touche Enter
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // empêche le saut de ligne
      sendMessage();
    }
  };

  return (
    <div className="min-h-full flex flex-col">
      {/* Header */}
      <div className="p-4 bg-white shadow flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="text-sm text-blue-600">
          ← Retour
        </button>
        <h2 className="font-semibold text-gray-800">{users[id]}</h2>
        <span className="text-xs text-gray-400">En ligne</span>
      </div>

      {/* Zone de discussion */}
      <div className="p-4 flex-1 max-h-[70vh] overflow-y-auto no-scrollbar space-y-3">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.sender === "Moi" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-xs text-sm ${
                m.sender === "Moi"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Zone de saisie */}
      <div className="p-3 bg-white flex items-center gap-2 border-t">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyPress} // ← gestion Enter
          placeholder="Écrire un message..."
          className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={sendMessage}
          className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
        >
          <CiPaperplane className="text-xl" />
        </button>
      </div>
    </div>
  );
}
