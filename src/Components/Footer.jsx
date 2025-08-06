import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="z-20 flex bg-blue-400 text-white p-8 justify-between items-center flex-col md:flex-row">
      <div className="flex gap-4 lg:flex-wrap justify-center">
        <Link>About</Link>
        <Link>Contact</Link>
        <Link>PrivacyPolicy</Link>
        <Link>Terms of Service</Link>
      </div>

      <div className="">
        {/* <img src={logoPng} alt="Logo" className="logo-star-bottom" /> */}
        <p>&copy; 2025 NAO. Tous droits réservés.</p>
      </div>
    </div>
  );
};

export default Footer;
