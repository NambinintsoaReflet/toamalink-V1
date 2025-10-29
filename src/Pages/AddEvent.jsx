import React, { useState, useRef } from "react";
import { FiCamera } from "react-icons/fi";
import { TiDelete } from "react-icons/ti";
import { motion } from "framer-motion";
import { RiImageAddFill } from "react-icons/ri";
import { api } from "../api/axios";
import { useNavigate } from "react-router-dom";

const AddEvent = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    titre: "",
    contenu: "",
    image: null, // 🟢 mieux null que ""
  });

  const [loading, setLoading] = useState(false); // 🔹 loading pour le bouton
  const [preview, setPreview] = useState(null); // 🔹 preview de l'image

  const fileInputRef = useRef(null);

  // 🔹 Gestion des champs texte
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🔹 Gestion de l'image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file)); // Générer preview
    }
  };

  // 🔹 Supprimer image
  const handleDeleteImage = () => {
    setFormData((prev) => ({ ...prev, image: null }));
    setPreview(null);
    fileInputRef.current.value = null;
  };

  // 🔹 Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      data.append("titre", formData.titre);
      data.append("contenu", formData.contenu);
      if (formData.image) data.append("image", formData.image);

      const res = await api.post("/publications", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log(res.data);
      alert("✅ Publication publié avec succès !");
      navigate("/home");

      // Réinitialiser le formulaire
      setFormData({ titre: "", contenu: "", image: null });
      setPreview(null);
      fileInputRef.current.value = null;
    } catch (err) {
      if (err.response?.status === 422) {
        console.error("Erreurs de validation :", err.response.data.errors);
        alert(JSON.stringify(err.response.data.errors));
      } else {
        console.error(err);
        // alert("Une erreur est survenue !");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center bg-gray-100 min-h-screen p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-white shadow-lg p-6 rounded-lg"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Publier un événement
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Titre */}
          <div>
            <label className="block text-gray-700 mb-1">Titre</label>
            <input
              type="text"
              name="titre"
              value={formData.titre}
              onChange={handleChange}
              required
              placeholder="Titre de l'événement"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none text-gray-700 focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Contenu */}
          <div>
            <label className="block text-gray-700 mb-1">Contenu</label>
            <textarea
              name="contenu"
              rows="3"
              value={formData.contenu}
              onChange={handleChange}
              placeholder="Décrivez votre événement..."
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            ></textarea>
          </div>

          {/* Upload Image */}
          <div>
            <label className="block text-gray-700 mb-1">Image</label>
            {preview ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative inline-block"
              >
                <img
                  className="w-36 h-24 object-cover rounded-lg shadow"
                  src={preview} // 🔹 afficher preview
                  alt="preview"
                />
                <button
                  type="button"
                  onClick={handleDeleteImage}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <TiDelete size={20} />
                </button>
              </motion.div>
            ) : (
              <div className="flex items-center gap-3">
                <label className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300">
                  <RiImageAddFill className="text-2xl text-gray-600" />
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
                <span className="text-sm text-gray-500">
                  Ajouter une image
                </span>
              </div>
            )}
          </div>

          {/* Bouton submit */}
          <div className="flex justify-end pt-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className={`px-8 py-3 font-semibold text-white rounded-lg shadow-lg transition duration-300 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed flex items-center justify-center gap-2"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Publication en cours...
                </>
              ) : (
                "Publier l'événement"
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddEvent;
