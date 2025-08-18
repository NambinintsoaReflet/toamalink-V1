import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
import { getEvents, toggleLike, users } from "../../Data/Events";
import Chargement from "../Chargement";

// Simuler l'utilisateur actuellement connecté
const CURRENT_USER_ID = users[0].id;

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const data = await getEvents();
      setEvents(data);
    } catch (err) {
      setError("Erreur lors du chargement des événements.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // --- NOUVELLE FONCTION pour gérer le like depuis la liste ---
  const handleLikeToggle = async (eventId) => {
    try {
      const updatedEvent = await toggleLike(eventId); // Appelle la fonction de notre API locale
      // Mettre à jour l'état de la liste des événements avec l'événement modifié
      setEvents((prevEvents) =>
        prevEvents.map((event) => (event.id === eventId ? updatedEvent : event))
      );
    } catch (err) {
      console.error("Erreur lors du like :", err);
      alert("Impossible de J'aime cet événement pour le moment.");
    }
  };
  // -------------------------------------------------------------

  if (loading) return <Chargement />;
  if (error) return <p className="error-message">{error}</p>;
  if (events.length === 0)
    return (
      <p className="no-events-message">
        Aucun événement disponible pour le moment.
      </p>
    );

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onLikeToggle={handleLikeToggle} // Passe la fonction de gestion du like
          currentUserId={CURRENT_USER_ID} // Passe l'ID de l'utilisateur actuel
        />
      ))}
    </div>
  );
};

export default EventList;
