import React from "react";
import logo from "../assets/logo-png.png";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* <!-- Container --> */}
      <div className="mx-auto w-full">
        <div className="flex justify-center px-2 py-4 w-full">
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            <div className="w-full h-auto bg-gray-400 bg-login hidden lg:block lg:w-5/12 bg-cover rounded-l-lg">
              <div className="flex flex-col items-center justify-center h-full p-8 bg-gray-600/30 rounded-2xl text-white text-center">
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
            <div className="w-full lg:w-7/12 text-black rounded-lg lg:rounded-l-none md:flex md:justify-center bg-white">
              <div className="lg:mt-12 mt-14 lg:w-sm">
                <p className="flex justify-self-center mt-4 m-2 text-gray-600">
                  English(US)
                </p>
                <img
                  src={logo}
                  alt=""
                  className="w-18 h-18 flex justify-self-center"
                />
                <form className="px-8 pt-6 pb-8 mb-4  text-gray-800 rounded">
                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold " htmlFor="email">
                      Email
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight  border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="email"
                      type="email"
                      placeholder="Email"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold " htmlFor="password">
                      Password
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight  border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="password"
                      type="password"
                      placeholder="******************"
                    />
                    {/* <p className="text-xs italic text-red-500">
                        Please choose a password.
                      </p> */}
                  </div>
                  <div className="mb-6 text-center">
                    <button
                      className="w-full px-4 py-2 font-bold cursor-pointer text-white bg-blue-500 rounded-full hover:bg-blue-700 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-900 focus:outline-none focus:shadow-outline"
                      type="button"
                    >
                      Login in
                    </button>
                  </div>
                  <hr className="mb-6 border-t" />
                  <div className="text-center">
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
