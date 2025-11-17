import React, { useState, useRef, useEffect } from "react";
import { CiPaperplane } from "react-icons/ci";
import { useNavigate, useParams, useLocation } from "react-router-dom"; // Ajout de useLocation
import { api } from "../api/axios";
import { useAuth } from "../Context/AuthContext";
import MessageItem from "../Components/MessageItem";

export default function Discussion() {
  const { userId } = useAuth(); // Récupérer l'ID de l'utilisateur connecté
  const { id } = useParams(); // 'id' est l'ID du destinataire (string)
  const location = useLocation(); // Pour récupérer l'état passé par navigate
  
  const [selectedUser, setSelectedUser] = useState(location.state?.selectedUser || null);

  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const messagesEndRef = useRef(null);

  // Fonction pour scroller en bas
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Auto-scroll à chaque fois que les messages changent
  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  // Logique de chargement des messages et d'écoute Echo
  useEffect(() => {
    if (!id || !userId) return;

    if (!selectedUser) {
        api.get(`/users/${id}`) // Supposons une route GET /users/{id}
            .then(res => {
                setSelectedUser(res.data);
            })
            .catch(err => console.error("Erreur de chargement de l'utilisateur :", err));
    }

    api
      .post("/messages", { user_id: userId, receiver_id: id })
      .then((res) => {
        setMessages(res.data);
      });

    if (window.Echo) {
        const channelName = `chat.${userId}`;
        const channel = window.Echo.channel(channelName);

        const listener = (data) => {
            if (data.message.sender_id.toString() === id.toString()) { 
                setMessages((prev) => [...prev, data.message]);
            }
        };

        channel.listen("MessageSent", listener);

        return () => {
            window.Echo.leave(channelName);
        };
    } else {
        console.warn("Laravel Echo n'est pas encore initialisé (window.Echo est undefined).");
    }
  }, [id, userId, selectedUser]); // Ajout de selectedUser dans les dépendances


  // Logique d'envoi du message
  const sendMessage = () => {
    if (!text.trim() || !id) return; 

    const tempMessage = {
        sender_id: userId,
        receiver_id: id, // Correction 2
        message: text,

        id: Date.now(), 
      };

    // 1. Ajout local et immédiat du message
    setMessages((prev) => [...prev, tempMessage]);

    // 2. Envoi à l'API
    api
      .post("send", {
        ...tempMessage, // Envoi des données au backend
        id: undefined, // Enlever l'ID temporaire
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi du message", error);
        // Retirer le message si l'envoi échoue (Rollback)
        setMessages(prev => prev.filter(msg => msg.id !== tempMessage.id));
      });

    // 3. Vider le champ de saisie
    setText("");
  };

  // Gérer la touche Enter
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); 
      sendMessage();
    }
  };

  // Affichage du nom de l'interlocuteur
  const headerTitle = selectedUser
    ? selectedUser.last_name || selectedUser.name || "Discussion"
    : "Chargement...";

  return (
    <div className="min-h-full flex flex-col h-screen">
      <div className="p-4 bg-white shadow flex items-center justify-between sticky top-0 z-10">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          ← Retour
        </button>
        <h2 className="font-semibold text-lg text-gray-800">{headerTitle}</h2>
        <span className="text-xs text-green-500 font-medium">
            {selectedUser ? "En ligne" : "Hors ligne"}
        </span>
      </div>
      {/* Zone de discussion */}
      <div className="p-4 flex-1 overflow-y-auto space-y-3 bg-gray-50">
        {messages.map((msg, i) => (
          <MessageItem key={i} msg={msg} userId={userId} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      {/* Zone de saisie */}
      <div className="p-3 bg-white flex items-center gap-2 border-t shadow-inner sticky bottom-0 z-10">
        <input
          type="text"
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          onKeyDown={handleKeyPress}
          placeholder="Écrire un message..."
          className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          disabled={!selectedUser} 
        />
        <button
          onClick={sendMessage}
          className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition disabled:opacity-50"
          disabled={!text.trim() || !selectedUser} 
        >
          <CiPaperplane className="text-xl" />
        </button>
      </div>
    </div>
  );
}