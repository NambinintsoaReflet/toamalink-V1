import React, { useState } from "react";
import pdp from "../assets/pexels-no-name-14543-66997.jpg"; // Exemple d'image de profil

const PersonList = () => {
  // Données de personnes simulées (vous les récupéreriez normalement depuis une API)
  const [people] = useState([
    { id: 1, name: "Alice Johnson", photo: pdp },
    { id: 2, name: "Bob Smith", photo: pdp },
    { id: 3, name: "Charlie Brown", photo: pdp },
    { id: 4, name: "Diana Prince", photo: pdp },
    { id: 5, name: "Alice Johnson", photo: pdp },
    { id: 6, name: "Bob Smith", photo: pdp },
    { id: 7, name: "Charlie Brown", photo: pdp },
    { id: 8, name: "Alice Johnson", photo: pdp },
    { id: 9, name: "Bob Smith", photo: pdp },
    { id: 10, name: "Charlie Brown", photo: pdp },
  ]);

  // Fonction pour gérer l'envoi de message (simulé)
  const handleSendMessage = (personName) => {
    alert(`Envoi d'un message à ${personName}...`);
    // 💡 Ici, vous implémenteriez votre logique d'envoi de message (par ex. ouvrir une modale)
    console.log(`Bouton "Envoyer un message" cliqué pour ${personName}`);
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Liste des personnes</h2>
      <ul className="space-y-4">
        {people.map((person) => (
          <li
            key={person.id}
            className="flex items-center justify-between p-2 bg-white shadow rounded-md hover:bg-gray-50 transition-colors duration-200"
          >
            <div className="flex items-center space-x-3">
              <img
                src={person.photo}
                alt={person.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="text-base font-medium">{person.name}</span>
            </div>
            <button
              onClick={() => handleSendMessage(person.name)}
              className="px-4 py-2 text-sm cursor-pointer font-semibold text-white bg-blue-500 rounded-full hover:bg-blue-600 transition-colors duration-200"
            >
              message
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PersonList;
