import React, { useState, useRef } from "react";
import { FiCamera } from "react-icons/fi";
import { TiDelete } from "react-icons/ti";
import { motion } from "framer-motion";
import { RiImageAddFill } from "react-icons/ri";

const AddEvent = () => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
    imageUrl: "",
    category: "Food & Drink",
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
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        imageUrl,
      }));
    }
  };

  // 🔹 Supprimer image
  const handleDeleteImage = () => {
    setFormData((prev) => ({
      ...prev,
      imageUrl: "",
    }));
    fileInputRef.current.value = null;
  };

  // 🔹 Soumission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("✅ Publication :", formData);
    // Réinitialiser le formulaire
    setFormData({
      title: "",
      date: "",
      time: "",
      location: "",
      description: "",
      imageUrl: "",
      category: "Food & Drink",
    });
    fileInputRef.current.value = null;
    //navigate to home or event page
    window.location.href = "/";
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
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Titre de l'événement"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none text-gray-500 focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Date & Heure */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-gray-700">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-3 py-2 text-gray-500 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700">Heure</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full px-3 py-2  border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
          </div>

          {/* Lieu */}
          <div>
            <label className="block text-gray-700">Lieu</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Lieu de l'événement"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              rows="2"
              value={formData.description}
              onChange={handleChange}
      
              placeholder="Décrivez votre événement..."
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            ></textarea>
          </div>

          {/* Upload image */}
          <div>
            <label className="block text-gray-700 mb-1">Image</label>
            {formData.imageUrl ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative inline-block"
              >
                <img
                  className="w-36 h-24 object-cover rounded-lg shadow"
                  src={formData.imageUrl}
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
