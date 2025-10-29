import React, { useState, useRef } from "react";
import { FiCamera } from "react-icons/fi";
import { TiDelete } from "react-icons/ti";
import { motion } from "framer-motion";
import { RiImageAddFill } from "react-icons/ri";
import { api } from "../api/axios";

const AddEvent = () => {
  const [formData, setFormData] = useState({
    titre: "",
    contenu: "",
    image: "",
  });

  const fileInputRef = useRef(null);

  // 🔹 Gestion des champs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🔹 Upload image
  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const image = URL.createObjectURL(file);
  //     setFormData((prev) => ({
  //       ...prev,
  //       image,
  //     }));
  //   }
  // };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  // 🔹 Supprimer image
  const handleDeleteImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: "",
    }));
    fileInputRef.current.value = null;
  };

  // 🔹 Soumission
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log("✅ Publication :", formData);

  //   try {
  //     // Envoi correct des données
  //     const res = await api.post("/publications", formData);
  //     console.log(res.data);

  //     // Réinitialiser le formulaire
  //     setFormData({
  //       titre: "",
  //       contenu: "",
  //       image: "",
  //     });
  //     fileInputRef.current.value = null;
  //   } catch (err) {
  //     if (err.response && err.response.status === 422) {
  //       console.error("Erreurs de validation :", err.response.data.errors);
  //       alert(JSON.stringify(err.response.data.errors));
  //     } else {
  //       console.error(err);
  //     }
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("✅ Publication :", formData);

    try {
      // Créer un vrai FormData pour envoi multipart
      const data = new FormData();
      data.append("titre", formData.titre);
      data.append("contenu", formData.contenu);
      if (formData.image) {
        data.append("image", formData.image); // ← fichier binaire
      }

      // Envoi vers Laravel
      const res = await api.post("/publications", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res.data);
      alert("✅ Publication ajoutée avec succès !");

      // Réinitialiser le formulaire
      setFormData({
        titre: "",
        contenu: "",
        image: "",
      });
      fileInputRef.current.value = null;
    } catch (err) {
      if (err.response && err.response.status === 422) {
        console.error("Erreurs de validation :", err.response.data.errors);
        alert(JSON.stringify(err.response.data.errors));
      } else {
        console.error(err);
      }
    }
  };

  return (
    <div className="flex justify-center bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-white shadow-lg p-6"
      >
        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Publish un event
        </h1>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Titre */}
          <div>
            <label className="block text-gray-700">Titre</label>
            <input
              type="text"
              name="titre"
              value={formData.titre}
              onChange={handleChange}
              required
              placeholder="Titre de l'événement"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none text-gray-500 focus:ring focus:ring-blue-300"
            />
          </div>

          {/* contenu */}
          <div>
            <label className="block text-gray-700">contenu</label>
            <textarea
              name="contenu"
              rows="2"
              value={formData.contenu}
              onChange={handleChange}
              placeholder="Décrivez votre événement..."
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            ></textarea>
          </div>

          {/* Upload image */}
          <div>
            <label className="block text-gray-700 mb-1">Image</label>
            {formData.image ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative inline-block"
              >
                <img
                  className="w-36 h-24 object-cover rounded-lg shadow"
                  src={formData.image}
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
                <span className="text-sm text-gray-500">Ajouter une image</span>
              </div>
            )}
          </div>

          {/* Bouton */}
          <div className="flex justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow"
            >
              Publier
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddEvent;
