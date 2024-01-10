# Using LaunchDarkly with AWS Cognito

This project explores how to implement user targeting using user data from Amazon Cognito and LaunchDarkly. The application impements targeting on both the client-side (using LaunchDarkly's client-side JavaScript SDK) and server side (using the server-side Node.js SDK). The application itself is built using Astro with a combination of Astro and React components. State is handled on the client and server using Nanostores.

In order to use this project locally, you'll need the following details in a `.env` file (note that the `PUBLIC_` denotes variables are available client side within Astro):

* Your Amazon Cognito User Pool ID as `PUBLIC_COGNITO_USER_POOL_ID`
* Your Cognito Client ID as `PUBLIC_COGNITO_CLIENT_ID`
* A LaunchDarkly Client Side ID as `PUBLIC_LAUNCHDARKLY_CLIENT_ID` 
* A LaunchDarkly SDK Key as `LAUNCHDARKLY_SDK_KEY`

Your LaunchDarkly environment will need the following:

* A segment that targets contexts that pass a user context with a property of `dev_type` that is either of the following two values: `professional` or `hobbyist`
* A string flag with the key of `hero-text`. This flag should have at least a variation targeting the above segment.
* A JSON flag with the key of `pricing-plans`. This flag should have at least a variation targeting the above segment. The structure of the JSON should be:
    ```json
    {
    "plans": [
        {
        "name": "Developer",
        "description": "A plan for when you work for a company but you don't control the budget.",
        "price": "$49"
        },
        {
        "name": "Enterprise",
        "description": "A plan for when our budget is big enough that you might never notice you're paying us.",
        "price": "$299"
        }
    ]
    }
    ```

    Note that you can include more than 2 pricing items.

Once the setup is complete, you should be able to register with accounts that are either "hobbyist" or "professional" and you should see a different tagline in the hero banner on the home page and different pricing on the pricing page.