import React from "react";
import pdp from "../../assets/pexels-no-name-14543-66997.jpg"
import { SlOptionsVertical } from "react-icons/sl";
import { AiOutlineLike } from "react-icons/ai";
import { GoComment } from "react-icons/go";

const EventCard = () => {
  return (
    <div className="event-card bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="event-card-header flex justify-between items-center mb-2">
        <div className="event-card-author flex items-center">
          <img src={pdp} alt="pdp" className="rounded-4xl mr-1 w-10 h-10" />
          <span className="event-card-author text-gray-600 text-xs">
            Publié par <br />
            <strong className="text-base">username</strong>
          </span>
        </div>

        <SlOptionsVertical className="cursor-pointer" />
      </div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet fugit hic
        reprehenderit, optio vel exercitationem sequi sunt voluptas fuga
        quaerat. Tenetur cupiditate quo impedit at vitae labore laboriosam nobis
        accusamus.
      </p>
      <img src={pdp} alt="photo publier" className="mt-2" />
      <div className="mt-2">
        {/* <h3 className="event-card-title">itle</h3> */}
        <p className=" text-gray-800 text-normal">
          <span className="">Date :</span> formattedDate à time
        </p>
        <p className=" text-gray-800 text-normal">
          <span className="">Lieu :</span> location
        </p>

        {/* --- NOUVEAU : Bouton J'aime interactif directement sur la carte --- */}
        <div className="event-card-actions flex items-center justify-between mt-4 border-t-1 border-t-gray-800 pt-2">
          <button className="flex items-center p-1 text-blue-500 cursor-pointer rounded-sm hover:text-amber-50 hover:bg-blue-500">
            <AiOutlineLike className="mr-2" />
            <span>J'aime</span>
          </button>
          <div className="flex items-center p-1 text-gray-600 cursor-pointer hover:text-gray-800">
            <GoComment className="mr-2" />
            <span>Commentaire(s)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
