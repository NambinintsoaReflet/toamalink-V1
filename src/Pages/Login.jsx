import React, { useState } from "react";
import logo from "../assets/logo-png.png";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { api } from "../api/axios";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // translation
  const { t, i18n } = useTranslation();

  const { mutate, isPending, error } = useMutation({
    mutationFn: async () => {
      try {
        const { data } = await api.post("/login", { email, password });
        return data;
      } catch (err) {
        // On relance l’erreur pour que React Query la capture
        throw err.response?.data?.message || "Erreur de connexion";
      }
    },

    onSuccess: (data) => {
      login(data.token, data.user);
    },

    onError: (err) => {
      console.error("Erreur lors de la connexion :", err);
    },
  });

  return (
    <div className="flex items-center min-h-screen bg-gray-100 text-gray-900">
      {/* <!-- Container --> */}
      <div className="mx-auto w-full">
        <div className="flex items-center justify-center px-2 py-6 w-full ">
          <div className="flex justify-center w-full xl:w-3/4 lg:w-12/12 min-h-[92vh]">
            <div className="w-full h-auto bg-login hidden sm:block md:w-5/12 bg-cover rounded-2xl">
              <div className="flex flex-col items-center justify-center h-full p-8 rounded-2xl text-white text-center">
                <h1 className="text-2xl">{t("login_title")}</h1>
                <p className="text-base mt-2 max-w-2xl">
                  {t("login_description")}
                </p>
              </div>
            </div>

            <div className=" flex w-full max-w-sm items-center lg:w-7/12 lg:max-w-md text-black rounded-lg lg:rounded-l-none md:flex md:justify-center bg-white">
              <div className="w-full lg:w-sm">
                <p className="flex justify-self-center mt-4 m-2 text-gray-600">
                  <select
                    onChange={(e) => i18n.changeLanguage(e.target.value)}
                    defaultValue={i18n.language}
                    className="border border-gray-400 rounded px-2 py-1 outline-none border-none"
                  >
                    <option value="en">🇬🇧 English</option>
                    <option value="fr">🇫🇷 Français</option>
                    <option value="it">🇮🇹 Italiano</option>
                    <option value="de">🇩🇪 Deutsch</option>
                    <option value="zh">🇨🇳 中文</option>
                  </select>
                </p>

                <div className="w-10 h-10 flex justify-self-center p-1 border rounded-full border-[#a9a9a9] bg-white mx-auto shadow-xs">
                  <img src={logo} alt="" />
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    mutate();
                  }}
                  className="px-8 pt-6 pb-8 text-gray-800 rounded"
                >
                  <div className="mb-4">
                    <label
                      className="block mb-2 text-sm font-bold "
                      htmlFor="email"
                    >
                      {t("email")}
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight  border border-gray-400 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      placeholder={t("email_placeholder")}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block mb-2 text-sm font-bold "
                      htmlFor="password"
                    >
                      {t("password")}
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight  border border-gray-400 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      placeholder={t("password_placeholder")}
                      required
                    />
                  </div>
                  <div className="mb-6 text-center">
                    {error && <p className="text-red-600 text-sm">{error}</p>}

                    <button
                      className="w-full mt-2 px-4 py-2 font-bold cursor-pointer text-white bg-blue-500 rounded hover:bg-blue-700 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-900 focus:outline-none focus:shadow-outline"
                      type="submit"
                      disabled={isPending}
                    >
                      {isPending ? t("login_loading") : t("login_button")}
                    </button>
                  </div>
                  <hr className="mb-6 border-t" />
                  <div className="text-center mb-1">
                    <a
                      className="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800"
                      href="#"
                    >
                      {t("forgot_password")}
                    </a>
                  </div>
                  <div className="text-center">
                    <Link
                      className="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800"
                      to={"/signin"}
                    >
                      {t("signin_link")}
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
