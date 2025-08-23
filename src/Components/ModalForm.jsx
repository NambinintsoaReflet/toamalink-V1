import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosAddCircle } from "react-icons/io";
import { FiCamera } from "react-icons/fi";
import { BiImageAdd } from "react-icons/bi";
import { TiDelete } from "react-icons/ti";
import { RiImageAddFill } from "react-icons/ri";

export default function ModalForm() {
  const [isOpen, setIsOpen] = useState(false);
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

  // 🔹 Gérer les changements dans les inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Gérer le téléchargement d'image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, imageUrl }));
    }
  };

  // 🔹 Supprimer l'image
  const handleDeleteImage = () => {
    setFormData((prev) => ({ ...prev, imageUrl: "" }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // 🔹 Soumettre le formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulaire soumis ✅", formData);
    // Ici tu peux envoyer les données à ton API
  };
  return (
    <div className="flex items-center justify-center">
      {/* Bouton ouvrir */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-1 bg-blue-600 text-white rounded-full hover:bg-blue-700"
      >
        <IoIosAddCircle className="text-2xl" />
      </button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Contenu du modal */}
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="fixed bottom-0 z-10 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white rounded-t-2xl shadow-lg p-6"
            >
              <h2 className="text-xl font-semibold mb-4">
                Publier un événement
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Titre */}
                <div>
                  <label className="block text-gray-700">Titre</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
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
                      required
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-gray-700">Heure</label>
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
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
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-gray-700">Description</label>
                  <textarea
                    name="description"
                    rows="3"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                  ></textarea>
                </div>

                {/* Upload avec icône */}
                <div>
                  <label className="block text-gray-700 mb-1">Image</label>
                  {formData.imageUrl ? (
                    <div className="relative inline-block">
                      <img
                        className="w-40 h-28 object-cover rounded-lg shadow"
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
                    </div>
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

                {/* Catégorie */}
                <div>
                  <label className="block text-gray-700">Catégorie</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                  >
                    <option>Food & Drink</option>
                    <option>Culture</option>
                    <option>Sport</option>
                    <option>Networking</option>
                    <option>Other</option>
                  </select>
                </div>

                {/* Bouton */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow"
                  >
                    Publier
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
