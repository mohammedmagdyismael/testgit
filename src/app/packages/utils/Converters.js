// TODO: deprecate these methods and move to https://github.com/sindresorhus/query-string

/**
 * Convert Object to query string
 * @param {Object} params
 * @returns {string}
 */
export const jsonToQueryString = (params: Object): string => {
  const esc = encodeURIComponent;
  const query = Object.keys(params)
    .map(k => `${esc(k)}=${esc(params[k])}`)
    .join('&');
  return query;
};

/**
 * Converts query string to an Object
 * @param {string} url
 * @returns {Object}
 */
export const parseQueryString = (url: string = ''): Object => {
  const urlParams = {};
  url.replace(new RegExp('([^?=&]+)(=([^&]*))?', 'g'), ($0, $1, $2, $3) => {
    urlParams[$1] = $3;
  });
  return urlParams;
};
