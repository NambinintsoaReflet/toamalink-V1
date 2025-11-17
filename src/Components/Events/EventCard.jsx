import React, { useMemo } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { GoComment } from "react-icons/go";
import { Link } from "react-router-dom";
import { FaHeart, FaUser } from "react-icons/fa";
import formatDate from "../../functions/formatDate";

const EventCard = ({ event, currentUserId }) => {
  // const [publisherData, setPublisherData] = useState(null);

  const publisherName = event?.user?.last_name || "Utilisateur";

  // 🗓️ Date de création
  const createdAtLabel = useMemo(
    () => formatDate(event?.created_at),
    [event?.created_at]
  );

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 w-full max-w-2xl">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <FaUser className="rounded-full mr-2 w-5 h-5" />

          <span className="flex flex-col text-gray-600 text-xs">
            <strong className="text-base">{publisherName}</strong>
            <span>{event.timeAgo}</span>
          </span>
        </div>
        <SlOptionsVertical className="cursor-pointer text-gray-700" />
      </div>

      {event?.titre && (
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          {event.titre}
        </h3>
      )}

      {event?.contenu && (
        <p className="text-gray-800 mb-2 whitespace-pre-wrap">
          {event.contenu}
        </p>
      )}

      {event.image && (
        <img
          src={event.image_url}
          className="object-cover mt-2 rounded-md w-full aspect-[4/3]"
          loading="lazy"
          alt={event?.title || "image d'événement"}
        />
      )}

      <div className="flex items-center justify-between mt-4 border-t border-gray-200 pt-2">
        <button
          type="button"
          // className={`flex items-center p-1 text-blue-600 cursor-pointer rounded-sm hover:text-white hover:bg-blue-600 transition ${
          //   hasLiked ? "text-cyan-600" : ""
          // } ${!currentUserId ? "opacity-50 cursor-not-allowed" : ""}`}
          className={`flex items-center p-1 text-blue-600 cursor-pointer rounded-sm hover:text-white hover:bg-blue-600 transition`}
          disabled={!currentUserId}
        >
          <FaHeart className="mr-1 w-5 h-5 text-red-500" />
          <span>{event.likes}</span>
        </button>

        <Link
          to={`/events/${event.id}`}
          className="flex items-center p-1 text-gray-600 hover:text-gray-800"
          aria-label="Voir les commentaires"
        >
          <GoComment className="mr-2" />
          {/* {commentsCount} commentaire(s) */}
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
