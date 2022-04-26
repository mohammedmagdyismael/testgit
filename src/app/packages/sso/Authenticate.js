// @flow

import { API, STATUS, decodeJwtToken, Cookie, Urls } from '@vezeeta/web-utils';

import signOut from './SignOut';
import signIn from './SignIn';

const authenticate = async (successCallback: Function = () => {}, responseStatusCode: ?number) => {
  let statusCode = responseStatusCode;
  const jwtToken = Cookie.get(Cookie.AUTH_TOKEN);

  if (!statusCode) {
    const validateToken = new API();
    const validateTokenHeader = [
      {
        key: 'x-vzt-authentication',
        value: jwtToken,
      },
    ];

    const validateTokenResponse = await validateToken.get(Urls.validateToken, validateTokenHeader);
    statusCode = validateTokenResponse.status;
  }

  if (STATUS.isNotAuthorized(statusCode)) {
    const reGenerateToken = new API();
    const reGenerateTokenBody = {
      AccountKey: decodeJwtToken(jwtToken).payLoad.unique_name,
      Token: jwtToken,
    };

    reGenerateToken.post(Urls.reGenerateToken, reGenerateTokenBody).then(responseReGenerate => {
      if (STATUS.isSuccess(responseReGenerate.status)) {
        signIn(responseReGenerate.data);
        sessionStorage.setItem('session', 'true');
        successCallback();
      } else {
        signOut();
      }
    });
  } else if (STATUS.isForbidden(statusCode)) {
    signOut();
  } else if (STATUS.isSuccess(statusCode)) {
    sessionStorage.setItem('session', 'true');
    successCallback();
  }
};

export default authenticate;
