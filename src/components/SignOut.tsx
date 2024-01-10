import { signOut } from "../lib/cognito";
import { useEffect } from "react";
import { isLoggedIn, user } from "../store/store";

export default function SignOut() {
  useEffect(() => {
    signOut();
    // once cognito is signed out, clear the client side state
    isLoggedIn.set(false);
    user.set({});
  }, []);
  return (
    <section id="createAccountSection" className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              You have been logged out.
            </h1>
            <p>
              <a href="/">Go home</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
