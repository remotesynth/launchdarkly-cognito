/* this is a simple client side wrapper for LaunchDarkly
that exposes the SDK client but ensures initialization is only performed once */

import * as LaunchDarkly from "launchdarkly-node-server-sdk";

let client;

async function initialize() {
  client = LaunchDarkly.init(import.meta.env.LAUNCHDARKLY_SDK_KEY);
  await client.waitForInitialization();
  return client;
}

export async function getClient() {
  if (client) return client;

  return await initialize();
}
