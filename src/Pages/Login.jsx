import React, { useState } from "react";
import logo from "../assets/logo-png.png";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/MenuContext/AuthContext";

const Login = () => {
  const { login, error } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password); // Appelle la fonction de connexion du contexte
  };

  return (
    <div className="flex items-center min-h-screen bg-gray-100 text-gray-900">
      {/* <!-- Container --> */}
      <div className="mx-auto w-full">
        <div className="flex items-center justify-center px-2 py-6 w-full ">
          <div className="flex justify-center w-full xl:w-3/4 lg:w-12/12 min-h-[92vh]">
            <div className="w-full h-auto bg-login hidden sm:block md:w-5/12 bg-cover rounded-2xl">
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

            <div className=" flex w-full max-w-sm items-center lg:w-7/12 lg:max-w-md text-black rounded-lg lg:rounded-l-none md:flex md:justify-center bg-white">
              <div className="w-full lg:w-sm">
                <p className="flex justify-self-center mt-4 m-2 text-gray-600">
                  English(US)
                </p>
                <div className="w-10 h-10 flex justify-self-center p-1 border rounded-full border-[#a9a9a9] bg-white mx-auto shadow-xs">
                  <img
                    src={logo}
                    alt=""
                  />
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="px-8 pt-6 pb-8 text-gray-800 rounded"
                >
                  <div className="mb-4">
                    <label
                      className="block mb-2 text-sm font-bold "
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight  border border-gray-400 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="email"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      type="email"
                      placeholder="Email"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block mb-2 text-sm font-bold "
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight  border border-gray-400 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      placeholder="Password"
                    />
                    {/* <p className="text-xs italic text-red-500">
                        Please choose a password.
                      </p> */}
                  </div>
                  <div className="mb-6 text-center">
                    <span className="text-red-500">{error}</span>
                    <button
                      className="w-full mt-2 px-4 py-2 font-bold cursor-pointer text-white bg-blue-500 rounded hover:bg-blue-700 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-900 focus:outline-none focus:shadow-outline"
                      type="submit"
                    >
                      Login in
                    </button>
                  </div>
                  <hr className="mb-6 border-t" />
                  <div className="text-center mb-1">
                    <a
                      className="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800"
                      href="#"
                    >
                      Forgot Password?
                    </a>
                  </div>
                  <div className="text-center">
                    <Link
                      className="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800"
                      to={"/signin"}
                    >
                      Already have an account? Sign in!
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
