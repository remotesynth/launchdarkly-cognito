/* this manages client and server stores for application state */

import { persistentAtom } from "@nanostores/persistent";

export const isLoggedIn = persistentAtom<boolean>("isLoggedIn", false, {
  encode: JSON.stringify,
  decode: JSON.parse,
});

export const user = persistentAtom<Object>(
  "user",
  {},
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  }
);
