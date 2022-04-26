import { Cookie } from '@vezeeta/web-utils';

let language;
if (Cookie.get(Cookie.LANGUAGE)) {
  language = Cookie.get(Cookie.LANGUAGE);
} else {
  Cookie.set(Cookie.LANGUAGE, 'en');
  language = 'en';
}

export default {
  language,
};
