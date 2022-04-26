// @flow

import { API, Cookie, Urls } from '@vezeeta/web-utils';

const signOut = async () => {
  const token = Cookie.get(Cookie.AUTH_TOKEN);
  const signOutCall = new API();
  const signOutBody = {
    Token: token,
  };

  signOutCall.post(Urls.signOut, signOutBody);
  sessionStorage.removeItem('session');
  Cookie.getAllCookies().forEach(cookie =>
    Cookie.remove(cookie, { domain: process.env.REACT_APP_TOKEN_DOMAIN }),
  );

  Cookie.set(Cookie.RETURN_URL, window.location.origin);
  window.location.href = process.env.REACT_APP_ACCOUNTS_URL;
};

export default signOut;
