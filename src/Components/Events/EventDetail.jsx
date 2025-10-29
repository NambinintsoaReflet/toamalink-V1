import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { SlOptionsVertical } from "react-icons/sl";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { GoComment } from "react-icons/go";
import { IoSend } from "react-icons/io5";
import Chargement from "../Chargement";
import { api } from "../../api/axios";
import formatDate from "../../functions/formatDate";
import { FaRegUser } from "react-icons/fa";

const EventDetail = () => {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  // ---- Fetch détail événement ----
  const fetchEventDetails = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/publications/${id}`);
      setEvent(data);
    } catch (err) {
      console.error(err);
      setError("Erreur lors du chargement des détails de l'événement.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchEventDetails();
  }, [id]);

  const createdAtLabel = useMemo(
    () => formatDate(event?.created_at),
    [event?.created_at]
  );

  // // ---- Rendus ----
  if (loading) return <Chargement />;

  return (
    <div className="flex flex-col">
      <Link to="/" className="mt-4 mb-2 text-blue-400 underline">
        ← Retour à la liste des événements
      </Link>

      <div className="bg-white shadow-md rounded-lg p-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <FaRegUser className="rounded-full mr-2 w-5 h-5" />
            <span className="flex flex-col text-gray-600 text-xs">
              {/* ✅ Sécurisation avec optional chaining */}
              <strong className="text-base">
                {event?.user?.first_name ?? "Utilisateur inconnu"}{" "}
                {event?.user?.last_name ?? ""}
              </strong>
              <span>{createdAtLabel}</span>
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
          <p className="text-gray-800 mb-2">{event.contenu}</p>
        )}

        {event?.image && (
          <img
            src={event.image}
            alt={event?.titre}
            className="object-cover mt-2 rounded-md w-full aspect-[4/3]"
          />
        )}

        <div className="event-card-actions flex items-center justify-between mt-4 border-t-1 mb-4 border-t-gray-200 pt-2">
          <button
            className={`flex items-center p-1 text-blue-500 rounded-sm hover:text-amber-50 hover:bg-blue-500 transition `}
          >
            <AiOutlineLike className="mr-1 w-5 h-5" />
            <span>{event.likes}</span>
          </button>

          <div className="flex items-center p-1 text-gray-600" id="comments">
            <GoComment className="mr-2" />
            {/* <h3 className="comments-title">Commentaires ({commentsCount})</h3> */}
          </div>
        </div>

        {/* --- Commentaires --- */}
        <div className="mt-10 text-left">
          <h3 className="text-center text-md text-blue-600 mb-5">
            {/* Commentaires ({commentsCount}) */}
          </h3>

          <div className="flex flex-col">
            <div className="mt-2 p-2 text-sm">
              <div className="flex mb-2 items-start">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Jean Dupont"
                  className="rounded-4xl mr-1 w-13 h-10 object-cover"
                />
                <div className="space-x-2 text-gray-600 w-full p-2 shadow-sm rounded-md border border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="mr-2">
                      <strong>Jean Dupont</strong>
                    </span>
                    <span className="text-[0.85em] justify-self-end text-gray-500">
                      10/10/2025 09:12
                    </span>
                  </div>
                  <p className="text-[1em] text-black mb-2">
                    Très bon article ! J’ai adoré la partie sur la gestion des
                    événements 👏
                  </p>
                </div>
              </div>
            </div>
          </div>

          <form className="flex items-end justify-between border mt-2 border-gray-300 rounded-md">
            <textarea
              placeholder="Écrivez un commentaire..."
              rows={2}
              className="w-full py-3 px-[10px] focus:outline-none text-base resize-y min-h-[80px]"
            />
            <button
              type="button"
              className="flex items-center justify-center text-cyan-600 text-2xl px-4 py-2 rounded-md hover:text-cyan-700"
              title="Envoyer"
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
