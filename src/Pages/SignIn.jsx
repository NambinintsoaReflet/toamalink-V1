import React, { useEffect, useState } from "react";
import logo from "../assets/logo-png.png";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/MenuContext/AuthContext";

const Signin = () => {
  const { signup } = useAuth();
  const [formStep, setFormStep] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");

  // Nouveaux états pour l'adresse et le pays
  const [address, setAddress] = useState("");
  const [countryOfOrigin, setCountryOfOrigin] = useState("");

  // 1. Nouvel état pour le minuteur
  const [timer, setTimer] = useState(60);

  // 2. Nouvel effet pour gérer le minuteur
  useEffect(() => {
    let interval;
    if (formStep === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [formStep, timer]);

  const handleGetCode = () => {
    if (!email) {
      alert("Veuillez entrer une adresse email valide.");
      return;
    }
    const newCode = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedCode(newCode);
    console.log(`Code de vérification simulé pour ${email}: ${newCode}`);
    alert(`Un nouveau code a été envoyé à ${email}.`);
    setTimer(60); // Réinitialise le minuteur
  };

  const handleInitialSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }
    handleGetCode();
    setFormStep(2);
  };

  const handleVerificationSubmit = (e) => {
    e.preventDefault();
    if (verificationCode !== generatedCode) {
      alert("Le code de vérification est incorrect.");
      return;
    }
    signup(firstName, lastName, email, password, verificationCode);
  };

  return (
    // <div className="min-h-screen bg-gray-100 text-gray-900">
    //   {/* <!-- Container --> */}
    //   <div className="mx-auto w-full">
    //     <div className="flex justify-center px-2 py-6 w-full">
    //       <div className="w-full xl:w-3/4 lg:w-11/12 flex">
    //         <div className="w-full h-auto  bg-login hidden lg:block lg:w-5/12 bg-cover rounded-2xl">
    //           <div className="flex flex-col items-center justify-center h-full p-8  rounded-2xl text-white text-center">
    //             <h1 className="text-2xl">
    //               Connect, Share, and Thrive in Toamasina
    //             </h1>
    //             <p className="text-base mt-2 max-w-2xl">
    //               Join a vibrant community of expatriates in Toamasina. Discover
    //               local events, share experiences, and access valuable resources
    //               to make your transition smoother and more rewarding.
    //             </p>
    //           </div>
    //         </div>
    //         <div className="w-full lg:w-7/12 text-gray-800 rounded-lg bg-white lg:rounded-l-none">
    //           <h3 className="py-4 text-2xl text-center">Create an Account!</h3>
    //           <img
    //             src={logo}
    //             alt=""
    //             className="w-15 h-15 flex justify-self-center"
    //           />
    //           <form className="px-8 pt-6 pb-8 mb-4 text-gray-800 rounded">
    //             <div className="mb-4 md:flex md:justify-between">
    //               <div className="mb-4 md:mr-2 md:mb-0">
    //                 <label
    //                   className="block mb-2 text-sm font-bold "
    //                   htmlFor="firstName"
    //                 >
    //                   First Name
    //                 </label>
    //                 <input
    //                   className="w-full px-3 py-2 text-sm leading-tight  border border-gray-400 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
    //                   id="firstName"
    //                   type="text"
    //                   placeholder="First Name"
    //                 />
    //               </div>
    //               <div className="md:ml-2">
    //                 <label className="block mb-2 text-sm font-bold " htmlFor="lastName">
    //                   Last Name
    //                 </label>
    //                 <input
    //                   className="w-full px-3 py-2 text-sm leading-tight  border border-gray-400 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
    //                   id="lastName"
    //                   type="text"
    //                   placeholder="Last Name"
    //                 />
    //               </div>
    //             </div>
    //             <div className="mb-4">
    //               <label className="block mb-2 text-sm font-bold " htmlFor="email">
    //                 Email
    //               </label>
    //               <input
    //                 className="w-full px-3 py-2 mb-3 text-sm leading-tight  border border-gray-400 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
    //                 id="email"
    //                 type="email"
    //                 placeholder="Email"
    //               />
    //             </div>
    //             <div className="mb-4 md:flex md:justify-between">
    //               <div className="mb-4 md:mr-2 md:mb-0">
    //                 <label className="block mb-2 text-sm font-bold " htmlFor="password">
    //                   Password
    //                 </label>
    //                 <input
    //                   className="w-full px-3 py-2 mb-3 text-sm leading-tight border border-gray-400 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
    //                   id="password"
    //                   type="password"
    //                   placeholder="******************"
    //                 />
    //                 {/* <p className="text-xs italic text-red-500">
    //                     Please choose a password.
    //                   </p> */}
    //               </div>
    //               <div className="md:ml-2">
    //                 <label
    //                   className="block mb-2 text-sm font-bold "
    //                   htmlFor="c_password"
    //                 >
    //                   Confirm Password
    //                 </label>
    //                 <input
    //                   className="w-full px-3 py-2 mb-3 text-sm leading-tight  border border-gray-400 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
    //                   id="c_password"
    //                   type="password"
    //                   placeholder="******************"
    //                 />
    //               </div>
    //             </div>
    //             <div className="mb-6 text-center">
    //               <button
    //                 className="w-full px-4 py-2 font-bold cursor-pointer text-white bg-blue-500 rounded-full hover:bg-blue-700 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-900 focus:outline-none focus:shadow-outline"
    //                 type="button"
    //               >
    //                 Register Account
    //               </button>
    //             </div>
    //             <hr className="mb-6 border-t" />
    //             <div className="text-center">
    //               <a
    //                 className="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800"
    //                 href="#"
    //               >
    //                 Forgot Password?
    //               </a>
    //             </div>
    //             <div className="text-center">
    //               <Link
    //                 className="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800"
    //                 to={"/login"}
    //               >
    //                 Already have an account? Login!
    //               </Link>
    //             </div>
    //           </form>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <div className="mx-auto w-full">
        <div className="flex justify-center px-2 py-6 w-full">
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            <div className="w-full h-auto bg-login hidden lg:block lg:w-5/12 bg-cover rounded-2xl">
              <div className="flex flex-col items-center justify-center h-full p-8 rounded-2xl text-white text-center">
                <h1 className="text-2xl">
                  Connect, Share, and Thrive in Toamasina
                </h1>
                <p className="text-base mt-2 max-w-2xl">
                  Join a vibrant community of expatriates in Toamasina. Discover
                  local events, share experiences, and access valuable resources
                  to make your transition smoother and more rewarding.
                </p>
              </div>
            </div>

            <div className="w-full lg:w-7/12 text-gray-800 rounded-lg bg-white lg:rounded-l-none">
              <h3 className="py-4 text-2xl text-center">Create an Account!</h3>
              <img src={logo} alt="logo" className="w-15 h-15 mx-auto" />

              {formStep === 1 ? (
                // ... (Votre formulaire de la première étape) ...
                <form
                  onSubmit={handleInitialSubmit}
                  className="px-10 pt-2 pb-4 text-gray-800 rounded"
                >
                  <div className="mb-2 md:flex md:justify-between">
                    <div className="mb-4 md:mr-2 md:mb-0">
                      <label
                        className="block mb-2 text-sm font-bold"
                        htmlFor="firstName"
                      >
                        First Name
                      </label>
                      <input
                        className="w-full px-3 py-2 text-sm leading-tight border border-gray-400 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="firstName"
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="md:ml-2">
                      <label
                        className="block mb-2 text-sm font-bold"
                        htmlFor="lastName"
                      >
                        Last Name
                      </label>
                      <input
                        className="w-full px-3 py-2 text-sm leading-tight border border-gray-400 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="lastName"
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-2">
                    <label
                      className="block mb-2 text-sm font-bold"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight border border-gray-400 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="email"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  {/* Ajout des nouveaux champs */}
                  <div className="mb-2">
                    <label
                      className="block mb-2 text-sm font-bold"
                      htmlFor="address"
                    >
                      Adresse
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight border border-gray-400 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="address"
                      type="text"
                      placeholder="Votre adresse"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-2">
                    <label
                      className="block mb-2 text-sm font-bold"
                      htmlFor="country"
                    >
                      Pays d'origine
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight border border-gray-400 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="country"
                      type="text"
                      placeholder="Votre pays d'origine"
                      value={countryOfOrigin}
                      onChange={(e) => setCountryOfOrigin(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-2 md:flex md:justify-between">
                    <div className="mb-4 md:mr-2 md:mb-0">
                      <label
                        className="block mb-2 text-sm font-bold"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <input
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight border border-gray-400 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="******************"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="md:ml-2">
                      <label
                        className="block mb-2 text-sm font-bold"
                        htmlFor="c_password"
                      >
                        Confirm Password
                      </label>
                      <input
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight border border-gray-400 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="c_password"
                        type="password"
                        placeholder="******************"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4 text-center">
                    <button
                      className="w-full px-4 py-2 font-bold cursor-pointer text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                      type="submit"
                    >
                      Register Account
                    </button>
                  </div>
                </form>
              ) : (
                <form
                  onSubmit={handleVerificationSubmit}
                  className="px-8 pt-6 pb-8 mb-4 text-gray-800 rounded"
                >
                  <p className="text-center mb-4">
                    Un code de vérification à 4 chiffres a été envoyé à votre
                    email.
                  </p>
                  <div className="mb-2">
                    <label
                      className="block text-sm font-bold mb-2 text-gray-700"
                      htmlFor="verificationCode"
                    >
                      Code de vérification
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md"
                      id="verificationCode"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-6 text-center">
                    <button
                      type="submit"
                      className="w-full px-4 py-2 font-bold cursor-pointer text-white bg-green-500 rounded-full hover:bg-green-700 focus:outline-none focus:shadow-outline"
                    >
                      Vérifier et s'inscrire
                    </button>
                  </div>

                  <div className="text-center mt-4">
                    {/* 3. Le bouton de renvoi */}
                    {timer > 0 ? (
                      <span className="text-gray-500 text-sm">
                        Renvoyer dans {timer}s
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={handleGetCode}
                        className="text-sm text-blue-500 hover:text-blue-800"
                      >
                        Renvoyer le code
                      </button>
                    )}
                  </div>

                  <div className="text-center mt-4">
                    <button
                      type="button"
                      onClick={() => setFormStep(1)}
                      className="text-sm text-blue-500 hover:text-blue-800"
                    >
                      Retour
                    </button>
                  </div>
                </form>
              )}
              <div className="text-center">
                <a
                  className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                  href="#"
                >
                  Forgot Password?
                </a>
              </div>
              <div className="text-center">
                <Link
                  className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                  to={"/login"}
                >
                  Already have an account? Login!
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
