import {
  signUpUserWithEmail,
  verifyCode,
  signInWithEmail,
} from "../lib/cognito";
import { useState } from "react";
import { isLoggedIn, developerType } from "../store/store";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [devType, setDevType] = useState("");
  const [error, setError] = useState("");
  const [created, setCreated] = useState(false);
  const [otp, setOtp] = useState("");

  const signUpClicked = async () => {
    if (email === "") {
      setError("Email is required");
      return;
    }
    if (password === "") {
      setError("Password is required");
      return;
    }
    if (!devType || devType === "") {
      setError("Developer type is required");
      return;
    }
    try {
      await signUpUserWithEmail(email, password, devType);
      setCreated(true);
    } catch (err) {
      if (err instanceof Error) {
        console.log("error", err.message);
      }
    }
  };

  const confirmSignUpClicked = async () => {
    try {
      await verifyCode(email, otp);
      // get their tokens
      const currentUser = await signInWithEmail(email, password);
      /*window.localStorage.setItem(
        "accessToken",
        `${currentUser.accessToken.jwtToken}`
      );
      window.localStorage.setItem(
        "refreshToken",
        `${currentUser.refreshToken.token}`
      ); */
      isLoggedIn.set(true);
      developerType.set(devType);
      window.location.href = "/";
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
              Create your account
            </h1>
            <p className="text-red-500">{error}</p>
            {!created && (
              <>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Your email
                  </label>
                  <input
                    required={true}
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                    placeholder="name@company.com"
                    value={email}
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
                    type="password"
                    name="password"
                    id="password"
                    placeholder="*****"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="dev_type" className="sr-only">
                    Account type
                  </label>
                  <select
                    name="dev_type"
                    id="dev_type"
                    value={devType}
                    onChange={(e) => setDevType(e.target.value)}
                    className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 peer"
                  >
                    <option>You are a...</option>
                    <option value="hobbyist">Hobbyist Developer</option>
                    <option value="professional">Professional Developer</option>
                  </select>
                </div>
                <button
                  onClick={signUpClicked}
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Create Account
                </button>
                <div>
                  <a
                    href="/"
                    className="block w-full text-white bg-slate-200 hover:bg-slate-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Cancel
                  </a>
                </div>
              </>
            )}
            {created && (
              <>
                <div>
                  <label
                    htmlFor="otp"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Enter your one time passcode (sent to your email):
                  </label>
                  <input
                    required={true}
                    type="text"
                    name="otp"
                    id="otp"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                    placeholder="1234"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
                <button
                  onClick={confirmSignUpClicked}
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Confirm Account
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
