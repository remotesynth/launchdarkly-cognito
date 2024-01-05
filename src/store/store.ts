import { persistentAtom } from "@nanostores/persistent";

export const isLoggedIn = persistentAtom<boolean>("isLoggedIn", false, {
  encode: JSON.stringify,
  decode: JSON.parse,
});

export const developerType = persistentAtom<string>("developerType", "", {
  encode: JSON.stringify,
  decode: JSON.parse,
});
