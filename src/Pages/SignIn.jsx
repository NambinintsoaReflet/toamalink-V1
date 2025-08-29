import React, { useEffect, useMemo, useRef, useState } from "react";
import logo from "../assets/logo-png.png";
import { Link, useNavigate } from "react-router-dom";
import countryList from "react-select-country-list";
import Select from "react-select";
import { api } from "../api/axios";

const Signin = () => {
  const navigate = useNavigate();

  const [formStep, setFormStep] = useState(1);

  // Champs
  const [firstName, setFirstName] = useState("");
  const [lastName,  setLastName]  = useState("");
  const [email,     setEmail]     = useState("");
  const [address,   setAddress]   = useState("");
  const [countryOfOrigin, setCountryOfOrigin] = useState(null);

  // Password
  const [password, setPassword]               = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Vérification
  const [verificationCode, setVerificationCode] = useState("");

  // UI
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer]     = useState(60);
  const intervalRef = useRef(null);

  // Pays
  const options = useMemo(() => countryList().getData(), []);

  // Timer
  useEffect(() => {
    if (formStep === 2 && timer > 0) {
      intervalRef.current = setInterval(() => {
        setTimer((t) => t - 1);
      }, 1000);
      return () => clearInterval(intervalRef.current);
    }
  }, [formStep, timer]);

  const validateStep1 = () => {
    const emailOk = /\S+@\S+\.\S+/.test(email);
    if (!emailOk) return "Veuillez entrer un email valide.";
    if (!firstName.trim() || !lastName.trim()) return "Prénom et nom sont requis.";
    if (!address.trim()) return "L'adresse est requise.";
    if (!countryOfOrigin) return "Veuillez sélectionner votre pays d'origine.";

    if (password.length < 8) return "Le mot de passe doit contenir au moins 8 caractères.";
    if (password !== confirmPassword) return "Les mots de passe ne correspondent pas.";
    return "";
  };

  const handleInitialSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const msg = validateStep1();
    if (msg) {
      setError(msg);
      return;
    }

    try {
      setLoading(true);
      // Appel backend pour envoyer le code par email
      await api.post("/auth/send-verification-code", { email });
      setTimer(60);
      setFormStep(2);
    } catch (err) {
      setError("Échec d’envoi du code. Réessayez.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      // Vérifie le code et enregistre l’utilisateur côté backend
      await api.post("/auth/register", {
        firstName,
        lastName,
        email,
        password,
        address,
        country: countryOfOrigin.value,
        code: verificationCode,
      });

      navigate("/welcome");
    } catch (err) {
      setError("Code incorrect ou inscription impossible. Réessayez.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (timer > 0) return;
    try {
      await api.post("/auth/send-verification-code", { email });
      setTimer(60);
    } catch (err) {
      setError("Impossible de renvoyer le code.");
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <div className="mx-auto w-full">
        <div className="flex items-center justify-center px-2 py-6 w-full">
          <div className="w-full justify-center xl:w-3/4 lg:w-12/12 min-h-[92vh] flex">
            {/* Colonne gauche (belle image/accroche) */}
            <div className="w-full h-auto bg-login hidden sm:block md:w-5/12 bg-cover rounded-2xl">
              <div className="flex flex-col items-center justify-center h-full p-8 rounded-2xl text-white text-center">
                <h1 className="text-2xl">Connect, Share, and Thrive in Toamasina</h1>
                <p className="text-base mt-2 max-w-2xl">
                  Join a vibrant community of expatriates in Toamasina. Discover local events,
                  share experiences, and access valuable resources to make your transition smoother.
                </p>
              </div>
            </div>

            {/* Formulaire */}
            <div className="w-full max-w-sm lg:w-7/12 items-center lg:max-w-md text-black rounded-lg lg:rounded-l-none md:flex md:justify-center bg-white">
              <div className="w-full lg:w-sm">
                <h3 className="py-4 pb-0 text-2xl text-center">Create an Account!</h3>
                <div className="w-10 h-10 mt-1 flex justify-self-center p-1 border rounded-full border-[#a9a9a9] bg-white mx-auto shadow-xs">
                  <img src={logo} alt="ToamaLink" />
                </div>

                {formStep === 1 ? (
                  <form onSubmit={handleInitialSubmit} className="px-8 pt-2 text-gray-800 rounded">
                    <div className="mb-2 md:flex md:justify-between">
                      <div className="mb-4 md:mr-2 md:mb-0">
                        <label className="block mb-2 text-sm font-bold" htmlFor="firstName">
                          First Name
                        </label>
                        <input
                          id="firstName"
                          className="w-full px-3 py-2 text-sm leading-tight border border-gray-400 rounded focus:outline-none focus:shadow-outline"
                          type="text"
                          placeholder="First Name"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="md:ml-2">
                        <label className="block mb-2 text-sm font-bold" htmlFor="lastName">
                          Last Name
                        </label>
                        <input
                          id="lastName"
                          className="w-full px-3 py-2 text-sm leading-tight border border-gray-400 rounded focus:outline-none focus:shadow-outline"
                          type="text"
                          placeholder="Last Name"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-2">
                      <label className="block mb-2 text-sm font-bold" htmlFor="email">
                        Email
                      </label>
                      <input
                        id="email"
                        className="w-full px-3 py-2 text-sm leading-tight border border-gray-400 rounded focus:outline-none focus:shadow-outline"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="mb-2">
                      <label className="block mb-2 text-sm font-bold" htmlFor="address">
                        Adresse
                      </label>
                      <input
                        id="address"
                        className="w-full px-3 py-2 text-sm leading-tight border border-gray-400 rounded focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Votre adresse"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                      />
                    </div>

                    <div className="mb-2">
                      <label className="block mb-2 text-sm font-bold">
                        Pays d'origine
                      </label>
                      <Select
                        options={options}
                        value={countryOfOrigin}
                        onChange={setCountryOfOrigin}
                        placeholder="Sélectionnez votre pays"
                        // required ne marche pas ici → validation manuelle
                      />
                    </div>

                    <div className="md:flex md:justify-between">
                      <div className="mb-2 md:mr-2 md:mb-0">
                        <label className="block mb-2 text-sm font-bold" htmlFor="password">
                          Password
                        </label>
                        <input
                          id="password"
                          className="w-full px-3 py-2 mb-3 text-sm leading-tight border border-gray-400 rounded focus:outline-none focus:shadow-outline"
                          type="password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      <div className="md:ml-2">
                        <label className="block mb-2 text-sm font-bold" htmlFor="c_password">
                          Confirm Password
                        </label>
                        <input
                          id="c_password"
                          className="w-full px-3 py-2 mb-3 text-sm leading-tight border border-gray-400 rounded focus:outline-none focus:shadow-outline"
                          type="password"
                          placeholder="Confirm Password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    {error && (
                      <span className="flex justify-self-center mb-1 text-red-600 text-sm">
                        {error}
                      </span>
                    )}

                    <div className="mb-4 text-center">
                      <button
                        className="w-full px-4 py-2 font-bold cursor-pointer text-white bg-blue-500 rounded-full hover:bg-blue-700 disabled:opacity-60"
                        type="submit"
                        disabled={loading}
                      >
                        {loading ? "Processing..." : "Register Account"}
                      </button>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleVerificationSubmit} className="px-8 pt-6 pb-8 mb-4 text-gray-800 rounded">
                    <p className="text-xs text-center mb-4">
                      A 4-digit verification code has been sent to your email: {email}
                    </p>

                    <div className="mb-2">
                      <label className="block text-sm font-bold mb-2 text-gray-700" htmlFor="verificationCode">
                        Verification code
                      </label>
                      <input
                        id="verificationCode"
                        type="text"
                        className="w-full p-2 border rounded-md"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        required
                        maxLength={4}
                      />
                    </div>

                    {error && (
                      <span className="flex justify-self-center mb-2 text-red-600 text-sm">
                        {error}
                      </span>
                    )}

                    <div className="mb-6 text-center">
                      <button
                        type="submit"
                        className="w-full px-4 py-2 font-bold cursor-pointer text-white bg-green-500 rounded-full hover:bg-green-700 disabled:opacity-60"
                        disabled={loading}
                      >
                        {loading ? "Checking..." : "Check and register"}
                      </button>
                    </div>

                    <div className="text-center mt-2">
                      {timer > 0 ? (
                        <span className="text-gray-500 text-sm">Return in {timer}s</span>
                      ) : (
                        <button
                          type="button"
                          onClick={handleResend}
                          className="text-sm text-blue-500 hover:text-blue-800"
                        >
                          Resend code
                        </button>
                      )}
                    </div>

                    <div className="text-center mt-4">
                      <button
                        type="button"
                        onClick={() => { setFormStep(1); setTimer(60); }}
                        className="text-sm text-blue-500 hover:text-blue-800"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                <div className="text-center mb-1">
                  <a className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800" href="#">
                    Forgot Password?
                  </a>
                </div>
                <div className="text-center">
                  <Link className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800" to={"/login"}>
                    Already have an account? Login!
                  </Link>
                </div>
              </div>
            </div>
            {/* /Formulaire */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
