// @flow

import { API, STATUS, Cookie } from '@vezeeta/web-utils';

import authenticate from './Authenticate';

class AuthApi extends API {
  getAuthHeader = (): string => Cookie.get(Cookie.AUTH_TOKEN);
  getCulture = (): string => Cookie.get(Cookie.CULTURE);

  /**
   * @override General wrapper for fetch method
   * @param {string} type
   * @param {string} url
   * @param {obj} body
   * @param {array} reqHeaders
   */
  makeRequest = (
    type: string,
    body: ?Object,
    url: string,
    reqHeaders: Array<Object>,
    shouldCache: Boolean,
  ): Promise<any> => {
    const reqHeadersFinal = reqHeaders || [];

    reqHeadersFinal.push(
      {
        key: 'Language',
        value: this.getCulture(),
      },
      {
        key: 'ActionSource',
        value: process.env.REACT_APP_ACTION_SOURCE,
      },
      {
        key: 'x-vzt-authentication',
        value: this.getAuthHeader(),
      },
    );

    return new Promise((resolve, reject) =>
      super
        .makeRequest(type, body, url, reqHeadersFinal, shouldCache)
        .then(response => {
          if (STATUS.isNotAuthorized(response.status) || STATUS.isForbidden(response.status)) {
            authenticate(resolve(response), response.status);
          } else {
            resolve(response);
          }
        })
        .catch(error => {
          reject(error);
        }),
    );
  };
}

export default AuthApi;
