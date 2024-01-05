import { isLoggedIn } from "../store/store";

export default function GetStartedButton() {
  return (
    <div id="loginButton" className="text-right">
      {(!isLoggedIn.get() && (
        <a
          href="/signup"
          role="button"
          aria-label="Get started"
          className="block mt-10 py-3 px-4 bg-white font-bold text-indigo-700 rounded-lg text-lg hover:bg-opacity-90 focus:ring-2 focus:ring-offset-2 focus:ring-white focus:outline-none"
        >
          Get Started
        </a>
      )) || (
        <a
          href="/pricing"
          role="button"
          aria-label="See pricing"
          className="block mt-10 py-3 px-4 bg-white font-bold text-indigo-700 rounded-lg text-lg hover:bg-opacity-90 focus:ring-2 focus:ring-offset-2 focus:ring-white focus:outline-none"
        >
          View Pricing
        </a>
      )}
    </div>
  );
}
