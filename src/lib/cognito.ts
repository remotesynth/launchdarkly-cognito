// this is a modified version of a component from the following repo:
// https://github.com/dbroadhurst/aws-cognito-react/blob/master/app/src/libs/cognito.ts

import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
} from "amazon-cognito-identity-js";

const POOL_DATA = {
  UserPoolId: import.meta.env.PUBLIC_COGNITO_USER_POOL_ID,
  ClientId: import.meta.env.PUBLIC_COGNITO_CLIENT_ID,
};

const userPool: CognitoUserPool = new CognitoUserPool(POOL_DATA);

let currentUser: any = userPool.getCurrentUser();

export function getCurrentUser() {
  return currentUser;
}

function getCognitoUser(username: string) {
  const userData = {
    Username: username,
    Pool: userPool,
  };
  const cognitoUser = new CognitoUser(userData);

  return cognitoUser;
}

export async function getSession() {
  if (!currentUser) {
    currentUser = userPool.getCurrentUser();
  }

  return new Promise(function (resolve, reject) {
    currentUser.getSession(function (err: any, session: any) {
      if (err) {
        reject(err);
      } else {
        resolve(session);
      }
    });
  }).catch((err) => {
    throw err;
  });
}

export async function signUpUserWithEmail(
  email: string,
  password: string,
  devType: string
) {
  return new Promise(function (resolve, reject) {
    const attributeList = [
      new CognitoUserAttribute({
        Name: "custom:dev_type",
        Value: devType,
      }),
    ];

    userPool.signUp(email, password, attributeList, [], function (err, res) {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  }).catch((err) => {
    throw err;
  });
}

export async function verifyCode(username: string, code: string) {
  return new Promise(function (resolve, reject) {
    const cognitoUser = getCognitoUser(username);

    cognitoUser.confirmRegistration(code, true, function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }).catch((err) => {
    throw err;
  });
}

export async function signInWithEmail(username: string, password: string) {
  return new Promise(function (resolve, reject) {
    const authenticationData = {
      Username: username,
      Password: password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    currentUser = getCognitoUser(username);

    currentUser.authenticateUser(authenticationDetails, {
      onSuccess: function (res: any) {
        resolve(res);
      },
      onFailure: function (err: any) {
        reject(err);
      },
    });
  }).catch((err) => {
    throw err;
  });
}

export function signOut() {
  if (currentUser) {
    currentUser.signOut();
  }
}

export async function getAttributes() {
  return new Promise(function (resolve, reject) {
    currentUser.getUserAttributes(function (err: any, attributes: any) {
      if (err) {
        reject(err);
      } else {
        resolve(attributes);
      }
    });
  }).catch((err) => {
    throw err;
  });
}

// Cognito returns attributes in an array but this helper function makes it easier to get them as an object
// while also removing the "custom:" prefix from any custom attribute names
export async function getAttributesAsObject() {
  const attributesArray: Array<any> = (await getAttributes()) as Array<any>;
  const attibutesStruct = attributesArray.reduce((acc, cur) => {
    acc[cur.getName().replace("custom:", "")] = cur.getValue();
    return acc;
  }, {});

  return attibutesStruct;
}

export async function setAttribute(attribute: any) {
  return new Promise(function (resolve, reject) {
    const attributeList = [];
    const res = new CognitoUserAttribute(attribute);
    attributeList.push(res);

    currentUser.updateAttributes(attributeList, (err: any, res: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  }).catch((err) => {
    throw err;
  });
}

export async function sendCode(username: string) {
  return new Promise(function (resolve, reject) {
    const cognitoUser = getCognitoUser(username);

    if (!cognitoUser) {
      reject(`could not find ${username}`);
      return;
    }

    cognitoUser.forgotPassword({
      onSuccess: function (res) {
        resolve(res);
      },
      onFailure: function (err) {
        reject(err);
      },
    });
  }).catch((err) => {
    throw err;
  });
}

export async function forgotPassword(
  username: string,
  code: string,
  password: string
) {
  return new Promise(function (resolve, reject) {
    const cognitoUser = getCognitoUser(username);

    if (!cognitoUser) {
      reject(`could not find ${username}`);
      return;
    }

    cognitoUser.confirmPassword(code, password, {
      onSuccess: function () {
        resolve("password updated");
      },
      onFailure: function (err) {
        reject(err);
      },
    });
  });
}

export async function changePassword(oldPassword: string, newPassword: string) {
  return new Promise(function (resolve, reject) {
    currentUser.changePassword(
      oldPassword,
      newPassword,
      function (err: any, res: any) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
    );
  });
}
