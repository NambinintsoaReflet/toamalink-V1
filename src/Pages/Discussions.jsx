import React, { useState, useRef, useEffect } from "react";
import { CiPaperplane } from "react-icons/ci";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api/axios";
import { useAuth } from "../Context/AuthContext";
import MessageItem from "../Components/MessageItem";

export default function Discussion() {
  const { userId } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const messagesEndRef = useRef(null);

  // Auto scroll
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 🔥 Solution 1 : Recharger systématiquement l'interlocuteur quand id change
  useEffect(() => {
    if (!id) return;

    api
      .get(`/users/${id}`)
      .then((res) => setSelectedUser(res.data))
      .catch((err) =>
        console.error("Erreur de chargement de l'utilisateur :", err)
      );
  }, [id]);

  // Charger les messages et écouter Echo
  // useEffect(() => {
  //   if (!id || !userId) return;

  //   // Charger l'historique
  //   api
  //     .post("/messages", { user_id: userId, receiver_id: id })
  //     .then((res) => setMessages(res.data));

  //   // Écoute Echo
  //   if (window.Echo) {
  //     const channelName = `chat.${userId}`;
  //     const channel = window.Echo.channel(channelName);

  //     const listener = (data) => {
  //       if (data.message.sender_id.toString() === id.toString()) {
  //         setMessages((prev) => [...prev, data.message]);
  //       }
  //     };

  //     channel.listen("MessageSent", listener);

  //     return () => {
  //       window.Echo.leave(channelName);
  //     };
  //   }
  // }, [id, userId]);

  useEffect(() => {
    if (!id || !userId) return;

    // --- 1. FONCTION DE CHARGEMENT ---
    const fetchMessages = () => {
        api
            .post("/messages", { user_id: userId, receiver_id: id })
            .then((res) => {
                // Mettre à jour l'état seulement si la requête réussit
                setMessages(res.data);
            })
            .catch(error => console.error("Erreur lors du rafraîchissement:", error));
    };

    // --- 2. CHARGEMENT INITIAL ---
    fetchMessages();

    // --- 3. MISE EN PLACE DE L'INTERVALLE DE 5 SECONDES ---
    const intervalId = setInterval(() => {
        fetchMessages();
    }, 5000); // 5000 millisecondes = 5 secondes

    // --- 4. NETTOYAGE (TRÈS IMPORTANT !) ---
    // Cette fonction de nettoyage est appelée lorsque le composant est démonté
    // ou avant que l'effet ne soit réexécuté (si les dépendances changent).
    // Elle stoppe l'intervalle pour éviter les fuites de mémoire.
    const cleanupInterval = () => {
        clearInterval(intervalId);
    };

    // --- 5. Écoute Echo (VOTRE CODE ORIGINAL) ---
    if (window.Echo) {
        const channelName = `chat.${userId}`;
        const channel = window.Echo.channel(channelName);

        const listener = (data) => {
            if (data.message.sender_id.toString() === id.toString()) {
                setMessages((prev) => [...prev, data.message]);
            }
        };

        channel.listen("MessageSent", listener);

        const cleanupEcho = () => {
            window.Echo.leave(channelName);
        };
        
        // La fonction de nettoyage doit appeler les deux nettoyages
        return () => {
            cleanupInterval();
            cleanupEcho();
        };
    }
    
    // Si Echo n'existe pas, on retourne seulement le nettoyage de l'intervalle
    return cleanupInterval;

}, [id, userId]);

  // Envoyer un message
  const sendMessage = () => {
    if (!text.trim() || !id) return;

    const tempMessage = {
      sender_id: userId,
      receiver_id: id,
      message: text,
      id: Date.now(),
    };

    setMessages((prev) => [...prev, tempMessage]);

    api
      .post("send", {
        ...tempMessage,
        id: undefined,
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi du message", error);
        setMessages((prev) => prev.filter((msg) => msg.id !== tempMessage.id));
      });

    setText("");
  };

  // Touche Enter
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  // Header
  const headerTitle = selectedUser
    ? `${selectedUser.first_name} ${selectedUser.last_name}`
    : "Chargement...";

  return (
    <div className="min-h-full flex mt-2 flex-col h-screen">
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

      <div className="p-4 flex-1 pt-[100px] overflow-y-auto outer-wrapper space-y-3 bg-gray-50">
        {messages.map((msg, i) => (
          <MessageItem key={i} msg={msg} userId={userId} />
        ))}
        <div ref={messagesEndRef} />
      </div>

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
