// @flow

import {
  decodeJwtToken,
  getNumberOfDaysBetweenTwoDates,
  addDaysToDate,
  Cookie,
} from '@vezeeta/web-utils';

import Cookies from 'js-cookie';

const signIn = (token: string) => {
  const expireDate = addDaysToDate(
    decodeJwtToken(token).payLoad.exp,
    parseInt(process.env.REACT_APP_SSO_COOKIE_EXPIRY_DATE),
  );
  const expireDateDays = getNumberOfDaysBetweenTwoDates(new Date(), expireDate);
  const returnUrl = Cookie.get(Cookie.RETURN_URL);

  Cookie.remove(Cookie.RETURN_URL);
  // Cookie.set(Cookie.AUTH_TOKEN, token, {
  //   expires: expireDateDays,
  // });

  Cookies.set('VZT_TOKEN', token, {
    expires: expireDateDays,
    secure: process.env.REACT_APP_FORCE_HTTPS === 'true',
    domain: process.env.REACT_APP_TOKEN_DOMAIN,
  });

  window.location = returnUrl || process.env.REACT_APP_SCHEDULE_URL;
};

export default signIn;
