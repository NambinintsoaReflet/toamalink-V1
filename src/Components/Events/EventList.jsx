import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
import Chargement from "../Chargement";
import { api } from "../../api/axios"; // Instance Axios configurée (baseURL + headers/token)
import { getCurrentUser } from "../../functions/getCurrentUser";

const EventList = () => {
  const [user, setUser] = useState();
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/publications");

      // setPublications(normalizePublications(data));
      setPublications(data);
 
    } catch (err) {
      console.error(err); // trace l’erreur en console
      setError("Erreur lors du chargement des événements."); // affiche un message utilisateur
    } finally {
      setLoading(false); // désactive le loader quoi qu’il arrive (succès ou erreur)
    }
  };

  useEffect(() => {
    getCurrentUser()
      .then((u) => setUser(u.id))
      .finally(() => setLoading(false));
    fetchEvents();
  }, []);

  // ❤️ Gestion du clic sur “J’aime” → fait un POST vers l’API
  // const handleLikeToggle = async (eventId) => {
  //   try {
  //     // Envoie une requête au backend pour liker/déliker l’événement
  //     const { data: updatedEvent } = await api.post(
  //       `/publications/${eventId}/like`
  //     );

  //     setPublications((prev) =>
  //       prev.map((ev) => (ev.id === eventId ? { ...ev, ...updatedEvent } : ev))
  //     );
  //   } catch (err) {
  //     console.error("Erreur lors du like :", err);
  //     alert("Impossible de liker cet événement pour le moment.");
  //   }
  // };

  // 🌀 États intermédiaires de rendu
  if (loading) return <Chargement />; // si en cours de chargement, affiche le loader
  if (error) return <p className="error-message">{error}</p>; // si erreur, affiche le message
  if (!publications || publications.length === 0) {
    return <p className="no-events-message">Aucun événement disponible.</p>; // si liste vide
  }

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 w-full">
      {publications.map((event) => (
        <EventCard
          key={event.id}
          event={event} // passe les données d’un événement
          // onLikeToggle={() => handleLikeToggle(event.id)} // callback qui déclenche le like
          currentUserId={user}
        />
      ))}
    </div>
  );
};

export default EventList;
