import {
  CognitoUserPool,
  CognitoUserAttribute,
} from "amazon-cognito-identity-js";

export const POST = async ({ request }) => {
  const data = await request.json();
  const username = data.email;
  const password = data.password;
  const dev_type = data.dev_type;

  const POOL_DATA = {
    UserPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
    ClientId: import.meta.env.VITE_COGNITO_CLIENT_ID,
  };
  const userPool = new CognitoUserPool(POOL_DATA);
  let attributeList = [];
  const dataDevType = {
    Name: "custom:dev_type",
    Value: dev_type,
  };
  const attributeDevType = new CognitoUserAttribute(dataDevType);
  attributeList.push(attributeDevType);
  await userPool.signUp(
    username,
    password,
    attributeList,
    null,
    function (err, result) {
      if (err) {
        console.log(err.message || JSON.stringify(err));
        return new Response(
          JSON.stringify({
            messsage: err.message || JSON.stringify(err),
          }),
          { status: 400 }
        );
      }
      let user = result.user;
      return new Response(
        JSON.stringify({
          message: "Success!",
        }),
        { status: 200 }
      );
    }
  );
};

export const ALL = ({ request }) => {
  return new Response(
    JSON.stringify({
      message: `This was a ${request.method}!`,
    })
  );
};
