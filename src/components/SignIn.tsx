import { signInWithEmail, getAttributesAsObject } from "../lib/cognito";
import { identifyContext } from "../lib/ld-client";
import { useState } from "react";
import { isLoggedIn } from "../store/store";
import ErrorMessage from "./ErrorMessage";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const signInClicked = async () => {
    if (email === "") {
      setError("Email is required");
      return;
    }
    if (password === "") {
      setError("Password is required");
      return;
    }
    try {
      // set the client state to logged in
      isLoggedIn.set(true);
      // call Cognito to sign in
      const currentUser = await signInWithEmail(email, password);
      // this converts attributes returned by Cognito
      // to an object that can be easily passed to LaunchDarkly
      const attributes = await getAttributesAsObject();
      const context = {
        kind: "user",
        key: attributes.sub,
        ...attributes,
      };
      // identify the new logged in user with LaunchDarkly
      // this allows you to get flags targeted to this user
      identifyContext(context);

      // pass the client side user data to make it available for server side rendering.
      await fetch("/api/identify.json", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(context),
      });
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        console.log("error", err.message);
        isLoggedIn.set(false);
      }
    }
    // if there are no errors and the user is logged in, go to the home page
    if (!error.length && isLoggedIn.get()) {
      window.location.href = "/";
    }
  };
  return (
    <section id="createAccountSection" className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Log into your account
            </h1>
            {error.length > 0 && <ErrorMessage message={error} />}
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your email
              </label>
              <input
                required={true}
                value={email}
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                placeholder="name@company.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <input
                required={true}
                value={password}
                type="password"
                name="password"
                id="password"
                placeholder="*****"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              onClick={signInClicked}
              className="w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Sign In
            </button>
            <div>
              <a
                href="/"
                className="block w-full text-white bg-slate-200 hover:bg-slate-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Cancel
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
