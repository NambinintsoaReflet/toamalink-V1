
export const users = [
  {
    id: 'user1',
    username: 'Jean_Expat',
    profilePic: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 'user2',
    username: 'Sophie_Mada',
    profilePic: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 'user3',
    username: 'Mike_Travel',
    profilePic: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  }
];

let events = [
  {
    id: 'e1',
    title: 'Soirée Dégustation de Vin et Fromage',
    date: '2025-09-10',
    time: '19:00',
    location: 'Le Cellier Parisien, Rue des Vignes',
    description: "Rejoignez-nous pour une soirée conviviale de dégustation de vins français et de fromages artisanaux. Parfait pour rencontrer de nouveaux expatriés !",
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Food & Drink',
    publisherId: 'user1',
    likes: ['user2', 'user3'], // Liste des IDs d'utilisateurs qui aiment
    comments: [
      { id: 'c1', userId: 'user2', text: "Super idée, j'ai hâte !", timestamp: '2025-07-10T10:30:00Z' },
      { id: 'c2', userId: 'user3', text: "On peut venir à plusieurs ?", timestamp: '2025-07-10T11:00:00Z' },
    ],
  },
  {
    id: 'e2',
    title: 'Match de Foot Amical Expat',
    date: '2025-09-15',
    time: '17:30',
    location: 'Stade Municipal de la Liberté',
    description: "Venez taper dans le ballon avec d'autres expatriés ! Tous niveaux acceptés. Ramenez vos crampons et votre bonne humeur.",
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Sports',
    publisherId: 'user2',
    likes: ['user1'],
    comments: [],
  },
  {
    id: 'e3',
    title: 'Atelier de Conversation Française',
    date: '2025-09-20',
    time: '18:00',
    location: 'Café Littéraire "Le Bouquiniste"',
    description: "Améliorez votre français dans une ambiance détendue. Des animateurs natifs seront là pour guider les discussions. Tous niveaux.",
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Education',
    publisherId: 'user1',
    likes: [],
    comments: [
      { id: 'c3', userId: 'user1', text: "N'hésitez pas à nous rejoindre !", timestamp: '2025-07-11T09:00:00Z' },
    ],
  },
  {
    id: 'e4',
    title: 'Concert de Jazz au Club "Le Blue Note"',
    date: '2025-09-22',
    time: '20:30',
    location: 'Le Blue Note, Rue du Jazz',
    description: "Venez vibrer au rythme du jazz en live ! Une soirée inoubliable avec des musiciens talentueux. Réservation conseillée.",
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Music & Arts',
    publisherId: 'user3',
    likes: ['user1', 'user2'],
    comments: [],
  },
];

export const getUserById = (id) => {
  return new Promise(resolve => {
    setTimeout(() => {
      const foundUser = users.find(user => user.id === id);
      resolve(foundUser || null);
    }, 50);
  });
};

// MODIFIÉ : Enrichir les événements avec les infos de l'utilisateur ET des commentaires
export const getEvents = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      const enrichedEvents = events.map(event => {
        const publisher = users.find(user => user.id === event.publisherId);
        // Enrichir chaque commentaire avec les infos de son auteur
        const enrichedComments = event.comments.map(comment => {
          const author = users.find(user => user.id === comment.userId);
          return { ...comment, author };
        });
        return {
          ...event,
          publisher: publisher,
          comments: enrichedComments,
        };
      });
      resolve([...enrichedEvents]);
    }, 300);
  });
};

export const addEvent = (newEvent) => {
  return new Promise(resolve => {
    setTimeout(() => {
      const id = 'e' + (events.length + 1);
      // Par défaut, l'utilisateur qui publie est 'user1' (simulé)
      const eventWithId = { ...newEvent, id, publisherId: 'user1', likes: [], comments: [] }; // Initialiser likes et comments
      events.push(eventWithId);
      const publisher = users.find(user => user.id === eventWithId.publisherId);
      resolve({ ...eventWithId, publisher });
    }, 300);
  });
};

// MODIFIÉ : Récupérer un événement par son ID (avec likes et commentaires enrichis)
export const getEventById = (id) => {
  return new Promise(resolve => {
    setTimeout(() => {
      const foundEvent = events.find(event => event.id === id);
      if (foundEvent) {
        const publisher = users.find(user => user.id === foundEvent.publisherId);
        // Enrichir les commentaires avec leurs auteurs
        const enrichedComments = foundEvent.comments.map(comment => {
          const author = users.find(user => user.id === comment.userId);
          return { ...comment, author };
        });
        resolve({ ...foundEvent, publisher, comments: enrichedComments });
      } else {
        resolve(null);
      }
    }, 100);
  });
};

// --- Déclaration de l'utilisateur connecté (UNE SEULE FOIS) ---
// Simule un utilisateur connecté pour les actions (dans une vraie app, ça viendrait de l'authentification)
const currentUser = users[0]; // user1 est l'utilisateur connecté pour cet exemple
// -------------------------------------------------------------

// --- Fonctions pour gérer les likes et commentaires (UNE SEULE FOIS) ---

export const toggleLike = (eventId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const eventIndex = events.findIndex(e => e.id === eventId);
      if (eventIndex !== -1) {
        const event = events[eventIndex];
        const hasLiked = event.likes.includes(currentUser.id);

        if (hasLiked) {
          event.likes = event.likes.filter(id => id !== currentUser.id); // Retire le like
        } else {
          event.likes.push(currentUser.id); // Ajoute le like
        }
        // Retourne l'événement mis à jour (enrichi comme getEventById)
        const publisher = users.find(user => user.id === event.publisherId);
        const enrichedComments = event.comments.map(comment => {
          const author = users.find(user => user.id === comment.userId);
          return { ...comment, author };
        });
        resolve({ ...event, publisher, comments: enrichedComments });
      } else {
        reject(new Error("Événement non trouvé pour liker."));
      }
    }, 200);
  });
};

export const addComment = (eventId, commentText) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const eventIndex = events.findIndex(e => e.id === eventId);
      if (eventIndex !== -1) {
        const event = events[eventIndex];
        const newComment = {
          id: 'c' + (event.comments.length + 1) + '-' + Date.now(), // ID unique pour le commentaire
          userId: currentUser.id,
          text: commentText,
          timestamp: new Date().toISOString(),
        };
        event.comments.push(newComment);
        // Retourne l'événement mis à jour (enrichi comme getEventById)
        const publisher = users.find(user => user.id === event.publisherId);
        const enrichedComments = event.comments.map(comment => {
          const author = users.find(user => user.id === comment.userId);
          return { ...comment, author };
        });
        resolve({ ...event, publisher, comments: enrichedComments });
      } else {
        reject(new Error("Événement non trouvé pour commenter."));
      }
    }, 200);
  });
};