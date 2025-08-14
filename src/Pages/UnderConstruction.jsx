import React from "react";
import { FaTools } from "react-icons/fa";

const UnderConstruction = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[100vh] bg-gray-100 text-center p-4">
      <FaTools className="text-yellow-500 text-6xl mb-4 animate-bounce" />
      <h1 className="text-3xl font-bold mb-2">Page en construction</h1>
      <p className="text-gray-600 max-w-md">
        Cette page est actuellement en cours de développement.  
        Merci de revenir plus tard !
      </p>
    </div>
  );
};

export default UnderConstruction;
