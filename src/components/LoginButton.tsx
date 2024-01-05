import { isLoggedIn } from "../store/store";

export default function LoginButton() {
  return (
    <div id="loginButton" className="text-right">
      {(!isLoggedIn.get() && (
        <a
          id="loginBtn"
          href="/signin"
          className="m-4 text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Sign in
        </a>
      )) || (
        <a
          id="logoutBtn"
          href="/logout"
          className="m-4 text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Log Out
        </a>
      )}
    </div>
  );
}
