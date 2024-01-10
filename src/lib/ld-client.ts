/* this is a simple client side wrapper for LaunchDarkly
it does not make all of the SDK functionality available 
but it helps ensure the client is initialized only once */

import * as LaunchDarkly from "launchdarkly-js-client-sdk";
let launchDarklyClient;

async function initialize(context: Object = null) {
  if (!context) {
    context = {
      kind: "user",
      anonymous: true,
    };
  }
  const client = LaunchDarkly.initialize(
    import.meta.env.PUBLIC_LAUNCHDARKLY_CLIENT_ID,
    context
  );
  await client.waitForInitialization();
  return client;
}

async function getClient(context: Object = null) {
  if (launchDarklyClient) return launchDarklyClient;
  return (launchDarklyClient = await initialize(context));
}

export async function getFlagValue(key, fnChangeListener) {
  const client = await getClient();
  let flagValue;

  flagValue = await client.variation(key, false);

  if (fnChangeListener) {
    client.on("change:" + key, fnChangeListener);
  }
  return flagValue;
}

export async function identifyContext(context: Object = null) {
  let client;
  if (!launchDarklyClient) client = await initialize(context);
  else {
    client = await getClient();
    client.identify(context);
  }
}
