import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUserSession } from "../service/Auth";

export const LoginForm = () => {
  let navigate = useNavigate();
  const [useremail, setUseremail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();
    if (useremail === "" || password.trim() === "") {
      setErrorMessage("Both username and password are required");
      return;
    }
    setErrorMessage(null);
    // const requestBody = {
    //   email: useremail,
    //   password: password,
    // };

    fetch("/api/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },

      //make sure to serialize your JSON body
      body: JSON.stringify({
        email: useremail,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((body) => {
        if (body.length === 0) {
          console.log("User does not exist");
          // Display a message or take any other action as needed
        } else {
          console.log(body[0].email);
          setUserSession(
            body[0].user_id.replace(/['"]+/g, ""),
            body[0].Username
          );
          setIsLoggedIn(true);
        }
      });
  };

  if (isLoggedIn) {
    navigate("/dashboard");
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="text-4xl font-bold tracking-tight text-lime-400 sm:text-3xl">
          Login
        </h1>
        <form className="space-y-6" onSubmit={submitHandler} method="POST">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-white-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                value={useremail}
                type="email"
                autoComplete="email"
                onChange={(e) => setUseremail(e.target.value)}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-white-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                value={password}
                type="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-lime-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-lime-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>
        {errorMessage && (
          <div
            class="flex items-center mt-4 p-4 mb-4 text-sm text-red-800 rounded-lg bg-stone-900 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <svg
              class="flex-shrink-0 inline w-4 h-4 me-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span class="sr-only">Info</span>
            <div>
              <span class="font-medium">{errorMessage}</span>
            </div>
          </div>
        )}

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{" "}
          <a
            href="/signup"
            className="font-semibold leading-6 text-lime-400 hover:text-lime-500"
          >
            Sign Up!
          </a>
        </p>
      </div>
    </div>
  );
};
