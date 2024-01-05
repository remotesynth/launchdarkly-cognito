import { signInWithEmail, getAttributes } from "../lib/cognito";
import { useState } from "react";
import { isLoggedIn, developerType } from "../store/store";

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
      const currentUser = await signInWithEmail(email, password);
      /*window.localStorage.setItem(
        "accessToken",
        `${currentUser.accessToken.jwtToken}`
      );
      window.localStorage.setItem(
        "refreshToken",
        `${currentUser.refreshToken.token}`
      );*/
      isLoggedIn.set(true);
      const devType = await getAttribute("custom:devType");
      console.log(devType);
      developerType.set(devType);
      //window.location.href = "/";
    } catch (err) {
      if (err instanceof Error) {
        console.log("error", err.message);
        isLoggedIn.set(false);
      }
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
