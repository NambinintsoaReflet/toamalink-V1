import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { addComment, getEventById, toggleLike, users } from "../../Data/Events";
import { SlOptionsVertical } from "react-icons/sl";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { GoComment } from "react-icons/go";
import Chargement from "../Chargement";
import { IoSend } from "react-icons/io5";

const CURRENT_USER_ID = users[0].id; // Par exemple, le premier utilisateur du tableau

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentText, setCommentText] = useState(""); // <-- NOUVEL ÉTAT POUR LE FORMULAIRE DE COMMENTAIRE

  const fetchEventDetails = async () => {
    try {
      setLoading(true);
      const data = await getEventById(id);
      if (data) {
        setEvent(data);
      } else {
        setError("Événement non trouvé.");
      }
    } catch (err) {
      setError("Erreur lors du chargement des détails de l'événement.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventDetails();
  }, [id]); // Dépend de l'ID de l'événement

  const handleLike = async () => {
    if (!event) return;
    try {
      const updatedEvent = await toggleLike(event.id);
      setEvent(updatedEvent); // Met à jour l'état de l'événement
    } catch (err) {
      console.error("Erreur lors du like :", err);
      alert("Impossible de J'aime cet événement pour le moment.");
    }
  };

  // --- NOUVELLE FONCTION POUR AJOUTER UN COMMENTAIRE ---
  const handleCommentSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    if (!commentText.trim() || !event) return; // Ne pas envoyer de commentaire vide ou si pas d'événement

    try {
      const updatedEvent = await addComment(event.id, commentText);
      setEvent(updatedEvent); // Met à jour l'état de l'événement avec le nouveau commentaire
      setCommentText(""); // Réinitialise le champ de commentaire après l'envoi
    } catch (err) {
      console.error("Erreur lors de l'ajout du commentaire :", err);
      alert("Impossible d'ajouter le commentaire pour le moment.");
    }
  };
  // ----------------------------------------------------

  if (loading) return <Chargement />;
  if (error)
    return (
      <p className="error-message">
        {error} <Link to="/events">Retour à la liste</Link>
      </p>
    );
  if (!event || !event.publisher)
    return (
      <p className="no-events-message">
        Cet événement n'existe pas ou a été supprimé.{" "}
        <Link to="/events">Retour à la liste</Link>
      </p>
    );

  const formattedDate = new Date(event.date).toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const hasLiked = event.likes.includes(CURRENT_USER_ID);
  return (
    <div className="flex flex-col">
      <Link to="/" className="mt-2 mb-2 text-blue-400 underline">
        ← Retour à la liste des événements
      </Link>
      <div className="bg-white shadow-md rounded-lg p-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            {event.publisher.profilePic && (
              <img
                src={event.publisher.profilePic}
                alt={event.publisher.username}
                className="rounded-4xl mr-1 w-10 h-10 object-cover"
              />
            )}
            <span className="text-gray-600 text-xs">
              Publié par <br />
              <strong className="text-base">{event.publisher.username}</strong>
            </span>
          </div>
          <SlOptionsVertical className="cursor-pointer text-gray-700" />
        </div>
        <p className=" text-gray-800 mb-2">{event.description}</p>
        {event.imageUrl && (
          <img
            src={event.imageUrl}
            alt={event.title}
            className="object-cover mt-2 aspect-[4/3]"
          />
        )}
        <p className=" text-gray-800 text-normal">
          <span className="">Date :</span> {formattedDate} à {event.time}
        </p>
        <p className="text-gray-800 text-normal">
          <span className="">Lieu :</span> {event.location}
        </p>

        {event.category && (
          <p className="">
            <span className="">Catégorie :</span> {event.category}
          </p>
        )}

        <div className="event-card-actions flex items-center justify-between mt-4 border-t-1 mb-4 border-t-gray-200 pt-2">
          <button
            onClick={handleLike}
            className={`flex items-center p-1 text-blue-500 cursor-pointer rounded-sm hover:text-amber-50 hover:bg-blue-500 ${
              hasLiked ? "text-cyan-600" : ""
            }`}
          >
            {hasLiked ? (
              <AiFillLike className="mr-1 w-5 h-5 text-cyan-600" />
            ) : (
              <AiOutlineLike className="mr-1 w-5 h-5" />
            )}
            <span>{event.likes.length}</span>
          </button>
          <div
            className="flex items-center p-1 text-gray-600 cursor-pointer hover:text-gray-800"
            id="comments"
          >
            <GoComment className="mr-2" />
            <h3 className="comments-title">
              Commentaires ({event.comments.length})
            </h3>
          </div>
        </div>
        {/* --- NOUVEAU : Section pour les commentaires et le formulaire --- */}

        <div className="mt-10 text-left">
          <h3 className="text-center text-md text-blue-600 mb-5">
            Commentaires ({event.comments.length})
          </h3>
          <div className="flex flex-col">
            {event.comments.length > 0 ? (
              event.comments.map((comment) => (
                <div key={comment.id} className="mt-2 p-2 text-sm ">
                  <div className="flex mb-2 items-start">
                    {comment.author && comment.author.profilePic && (
                      <img
                        src={comment.author.profilePic}
                        alt={comment.author.username}
                        className="rounded-4xl mr-1 w-13 h-10 object-cover"
                      />
                    )}
                    <div className="space-x-2 text-gray-600 w-screen p-2 shadow-sm">
                      <div className="flex justify-between items-center mb-2">
                        <span className="mr-2">
                          <strong>
                            {comment.author
                              ? comment.author.username
                              : "Utilisateur inconnu"}
                          </strong>
                        </span>
                        <span className="text-[0.85em] justify-self-end text-gray-500">
                          {/* Formatage de la date du commentaire */}
                          {new Date(comment.timestamp).toLocaleDateString(
                            "fr-FR",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </span>
                      </div>
                      <p className="text-[1em] text-black mb-2">
                        {comment.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">Soyez le premier à commenter !</p>
            )}
          </div>

          {/* Formulaire d'ajout de commentaire */}
          <form
            onSubmit={handleCommentSubmit}
            className="flex items-end justify-between border mt-2 border-gray-300 rounded-md"
          >
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Écrivez un commentaire..."
              rows="1"
              className="w-full py-3 px-[10px] focus:outline-none  text-base resize-y min-h-[80px]"
              required
            ></textarea>
            <button
              type="submit"
              className="flex items-center justify-center  text-cyan-600 text-2xl px-4 py-2 rounded-md hover:cursor-pointer transition-colors"
            >
              <IoSend />
            </button>
          </form>
        </div>
        {/* --------------------------------------------------------------- */}
      </div>
    </div>
  );
};

export default EventDetail;
