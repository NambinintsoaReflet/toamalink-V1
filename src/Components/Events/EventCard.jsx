import React from "react";
import { SlOptionsVertical } from "react-icons/sl";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { GoComment } from "react-icons/go";
import { Link } from "react-router-dom";

const EventCard = ({ event, onLikeToggle, currentUserId }) => {
  const formattedDate = new Date(event.date).toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Déterminer si l'utilisateur actuel a aimé cet événement
  const hasLiked = event.likes.includes(currentUserId);

  // Gérer le clic sur le bouton J'aime
  const handleLikeClick = (e) => {
    e.stopPropagation(); // Empêche le clic sur le bouton de déclencher le lien de la carte
    if (onLikeToggle) {
      onLikeToggle(event.id);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <img
            src={event.publisher.profilePic}
            alt={event.publisher.username}
            className="rounded-4xl mr-1 w-10 h-10 object-cover"
          />
          <span className=" text-gray-600 text-xs">
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
      <div className="mt-2">
        {/* <h3 className="event-card-title">itle</h3> */}
        <p className=" text-gray-800 text-normal">
          <span className="">Date :</span> {formattedDate} à {event.time}
        </p>
        <p className=" text-gray-800 text-normal">
          <span className="">Lieu : {event.location}</span> location
        </p>

        {/* --- NOUVEAU : Bouton J'aime interactif directement sur la carte --- */}
        <div className="event-card-actions flex items-center justify-between mt-4 border-t-1 border-t-gray-200 pt-2">
          <button
            className={`flex items-center p-1 text-blue-500 cursor-pointer rounded-sm hover:text-amber-50 hover:bg-blue-500 ${
              hasLiked ? " text-cyan-600" : ""
            }`}
            onClick={handleLikeClick}
          >
            {
              hasLiked ? (
                <AiFillLike className="mr-1 w-5 h-5 text-cyan-600" />
              ) : (
                <AiOutlineLike className="mr-1 w-5 h-5" />
              )
            }
            <span>{event.likes.length}</span>
          </button>
          <div className="flex items-center p-1 text-gray-600 cursor-pointer hover:text-gray-800">
            <Link
              to={`/events/${event.id}#comments`}
              className="flex items-center"
            >
              <GoComment className="mr-2" />
              {event.comments ? event.comments.length : 0} commentaire(s)
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
