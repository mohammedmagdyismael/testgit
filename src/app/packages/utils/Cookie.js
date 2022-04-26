import Cookies from 'js-cookie';

const addCookiePrefix = cookieName => `${cookieName}`;

class Cookie {
  static AUTH_TOKEN = addCookiePrefix('TOKEN');
  static TEMP_AUTH_TOKEN = addCookiePrefix('TEMP_TOKEN');
  static CULTURE = addCookiePrefix('CULTURE');
  static LANGUAGE = addCookiePrefix('LANGUAGE');

  static getAllCookies = () => [
    Cookie.AUTH_TOKEN,
    Cookie.CULTURE,
    Cookie.LANGUAGE,
    Cookie.TEMP_AUTH_TOKEN,
  ];

  static set = (name, value, options) => {
    Cookies.set(name, value, {
      expires: parseInt(process.env.REACT_APP_DEFAULT_COOKIE_EXPIRY_DATE),
      secure: process.env.REACT_APP_FORCE_HTTPS === 'true',
      domain: process.env.REACT_APP_TOKEN_DOMAIN,
      ...options,
    });
  };

  static get = name => Cookies.get(name);

  static remove = (name, options) =>
    Cookies.remove(name, {
      ...options,
      domain: process.env.REACT_APP_TOKEN_DOMAIN,
    });
}

export default Cookie;
