import React from "react";
import { IoMdClose } from "react-icons/io";

import logo from "../../assets/logo-png.png"; // Adjust the path to your logo image

const LoginModal = ({ handleShowModal }) => {
  return (
    <div className="w-full h-full fixed z-50 top-0 backdrop-filter backdrop-brightness-75 backdrop-blur-md">
      <div className="flex items-center justify-center h-full">
        <div className="bg-white p-6 m-6 rounded-lg shadow-lg w-90">
          <button
            className="flex justify-self-end text-red-500 cursor-pointer"
            onClick={handleShowModal}
          >
            <IoMdClose />
          </button>
          <div class="flex min-h-full flex-col justify-center px-6 lg:px-8">
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
              <img src={logo} alt="Your Company" class="mx-auto h-20 w-20" />
              <h2 class="mt-2 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                Login
              </h2>
            </div>

            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form action="#" method="POST" class="space-y-6">
                <div>
                  <label
                    for="email"
                    class="block text-sm/6 font-medium text-gray-900"
                  >
                    Email address
                  </label>
                  <div class="mt-2">
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      autocomplete="email"
                      class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>

                <div>
                  <div class="flex items-center justify-between">
                    <label
                      for="password"
                      class="block text-sm/6 font-medium text-gray-900"
                    >
                      Password
                    </label>
                    <div class="text-sm">
                      <a
                        href="#"
                        class="font-semibold text-indigo-600 hover:text-indigo-500"
                      >
                        Forgot password?
                      </a>
                    </div>
                  </div>
                  <div class="mt-2">
                    <input
                      id="password"
                      type="password"
                      name="password"
                      required
                      autocomplete="current-password"
                      class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Login
                  </button>
                </div>
              </form>

              <p class="mt-10 text-center text-sm/6 text-gray-500">
                Not a member?
                <a
                  href="#"
                  class="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Create a new account
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
