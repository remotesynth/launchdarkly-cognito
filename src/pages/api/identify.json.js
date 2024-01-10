/* this endpoint is used to store the user in the server side state */
import { user, isLoggedIn } from "../../store/store";

export const POST = async ({ request }) => {
  const data = await request.json();

  user.set(data);
  isLoggedIn.set(true);

  return new Response("ok", {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
