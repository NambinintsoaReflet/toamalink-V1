import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
import Chargement from "../Chargement";
import { api } from "../../api/axios";
import { getCurrentUser } from "../../functions/getCurrentUser";

const EventList = () => {
  const [userId, setUserId] = useState(null); // Renommage pour plus de clarté
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- 1. Fonction de chargement des événements ---
  const fetchEvents = async () => {
    try {
      // Pas besoin de mettre setLoading(true) ici si la fonction principale le fait
      const { data } = await api.get("/publications");
      setPublications(data);
    } catch (err) {
      console.error("Erreur API:", err);
      setError("Erreur lors du chargement des événements.");
      // Note: Ne pas mettre setLoading(false) ici. La fonction principale s'en chargera.
      throw err; // Permet de propager l'erreur à la fonction d'appel
    }
  };

  // --- 2. Effet de chargement initial (Unifié) ---
  useEffect(() => {
    // Une seule fonction pour gérer l'état de chargement global
    const initializeData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // A. Charger l'utilisateur
        const userData = await getCurrentUser();
        setUserId(userData.id); // Stocker l'ID de l'utilisateur

        // B. Charger les événements
        await fetchEvents();
        
      } catch (err) {
        // Une erreur, qu'elle vienne de l'utilisateur ou des événements, affiche le même message
        console.error("Erreur d'initialisation:", err);
        setError("Impossible de charger l'application ou les événements."); 
      } finally {
        // C. Terminer le chargement une fois que TOUT est terminé
        setLoading(false); 
      }
    };

    initializeData();

  }, []); // Dépendances vides : s'exécute une seule fois au montage

  // 🌀 États intermédiaires de rendu
  if (loading) return <Chargement />;
  if (error) return <p className="text-red-600 p-4 font-semibold">{error}</p>;
  
  // Vérification de la liste vide après le chargement
  if (!publications || publications.length === 0) {
    return (
      <p className="no-events-message text-gray-500 p-4">
        Aucun événement disponible.
      </p>
    );
  }

  // --- 3. Rendu ---
  return (
    <div className="flex flex-col items-center justify-center w-full">
      {publications.map((event) => (
        <EventCard
          // Utilisation de la clé unique (event.id)
          key={event.id}
          event={event}
          currentUserId={userId} // Utilisation du nouvel état renommé
        />
      ))}
    </div>
  );
};

export default EventList;