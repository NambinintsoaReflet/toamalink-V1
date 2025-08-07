import React from "react";
import logo from "../assets/logo-png.png";

const Signin = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* <!-- Container --> */}
      <div class="mx-auto w-full">
        <div class="flex justify-center px-2 py-4 w-full">
          <div class="w-full xl:w-3/4 lg:w-11/12 flex">
            <div class="w-full h-auto bg-gray-400 bg-login hidden lg:block lg:w-5/12 bg-cover rounded-l-lg">
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
            <div class="w-full lg:w-7/12 text-gray-800 rounded-lg bg-amber-50 lg:rounded-l-none">
              <h3 class="py-4 text-2xl text-center">Create an Account!</h3>
              <img
                src={logo}
                alt=""
                className="w-15 h-15 flex justify-self-center"
              />
              <form class="px-8 pt-6 pb-8 mb-4 text-gray-800 rounded">
                <div class="mb-4 md:flex md:justify-between">
                  <div class="mb-4 md:mr-2 md:mb-0">
                    <label
                      class="block mb-2 text-sm font-bold "
                      for="firstName"
                    >
                      First Name
                    </label>
                    <input
                      class="w-full px-3 py-2 text-sm leading-tight  border border-gray-400 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="firstName"
                      type="text"
                      placeholder="First Name"
                    />
                  </div>
                  <div class="md:ml-2">
                    <label class="block mb-2 text-sm font-bold " for="lastName">
                      Last Name
                    </label>
                    <input
                      class="w-full px-3 py-2 text-sm leading-tight  border border-gray-400 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="lastName"
                      type="text"
                      placeholder="Last Name"
                    />
                  </div>
                </div>
                <div class="mb-4">
                  <label class="block mb-2 text-sm font-bold " for="email">
                    Email
                  </label>
                  <input
                    class="w-full px-3 py-2 mb-3 text-sm leading-tight  border border-gray-400 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Email"
                  />
                </div>
                <div class="mb-4 md:flex md:justify-between">
                  <div class="mb-4 md:mr-2 md:mb-0">
                    <label class="block mb-2 text-sm font-bold " for="password">
                      Password
                    </label>
                    <input
                      class="w-full px-3 py-2 mb-3 text-sm leading-tight border border-gray-400 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="password"
                      type="password"
                      placeholder="******************"
                    />
                    {/* <p class="text-xs italic text-red-500">
                        Please choose a password.
                      </p> */}
                  </div>
                  <div class="md:ml-2">
                    <label
                      class="block mb-2 text-sm font-bold "
                      for="c_password"
                    >
                      Confirm Password
                    </label>
                    <input
                      class="w-full px-3 py-2 mb-3 text-sm leading-tight  border border-gray-400 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="c_password"
                      type="password"
                      placeholder="******************"
                    />
                  </div>
                </div>
                <div class="mb-6 text-center">
                  <button
                    class="w-full px-4 py-2 font-bold cursor-pointer text-white bg-blue-500 rounded-full hover:bg-blue-700 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-900 focus:outline-none focus:shadow-outline"
                    type="button"
                  >
                    Register Account
                  </button>
                </div>
                <hr class="mb-6 border-t" />
                <div class="text-center">
                  <a
                    class="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800"
                    href="#"
                  >
                    Forgot Password?
                  </a>
                </div>
                <div class="text-center">
                  <a
                    class="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800"
                    href="/login"
                  >
                    Already have an account? Login!
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
