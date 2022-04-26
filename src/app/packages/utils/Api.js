// @flow
import STATUS from './Status';

class Api {
  /**
   * Convert response to json
   * @private
   * @param {object} response
   * @returns {Promise}
   */
  convertToJson = async (response: Object): Object => {
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.indexOf('application/json') !== -1) {
      return response.json();
    }
    return response.text();
  };

  /**
   * Perform a post request
   * @param {string} url
   * @param {object} body
   * @param {array} reqHeaders
   * @param {boolean} shouldCache
   * @returns {Promise}
   */
  post(url: string, body: ?Object, reqHeaders: Array<Object>, shouldCache: Boolean) {
    return this.makeRequest('post', body, url, reqHeaders, shouldCache);
  }

  /**
   * Perform a put request
   * @param {string} url
   * @param {object} body
   * @param {array} reqHeaders
   * @param {boolean} shouldCache
   * @returns {Promise}
   */
  put(url: string, body: ?Object, reqHeaders: Array<Object>, shouldCache: Boolean) {
    return this.makeRequest('put', body, url, reqHeaders, shouldCache);
  }

  /**
   * Perform a delete request
   * @param {string} url
   * @param {object} body
   * @param {array} reqHeaders
   * @param {boolean} shouldCache
   * @returns {Promise}
   */
  delete(url: string, reqHeaders: Array<Object>, shouldCache: Boolean) {
    return this.makeRequest('delete', undefined, url, reqHeaders, shouldCache);
  }

  /**
   * Perform a get request
   * @param {string} url
   * @param {array} reqHeaders
   * @param {boolean} shouldCache
   * @returns {Promise}
   */
  get(url: string, reqHeaders: Array<Object>, shouldCache: Boolean) {
    return this.makeRequest('get', undefined, url, reqHeaders, shouldCache);
  }

  /**
   * General wrapper for fetch method
   * @private
   * @param {string} type
   * @param {Object} body
   * @param {string} url
   * @param {Array} reqHeaders
   * @param {boolean} shouldCache
   * @returns {Promise}
   */
  makeRequest(
    type: string,
    body: ?Object,
    url: string,
    reqHeaders: Array<Object>,
    shouldCache: Boolean,
  ): Promise<any> {
    const headers = new Headers();

    if (type !== 'get') {
      headers.append('Content-Type', 'application/json');
    }

    if (reqHeaders) {
      reqHeaders.map(header => headers.append(header.key, header.value));
    }

    const reqObj = {
      method: type,
      headers,
      body: undefined,
    };

    if (body) {
      reqObj.body = JSON.stringify(body);
    }

    if (shouldCache) {
      // Check if the browser supports localStorage API
      if (window.localStorage) {
        const responseCache = window.localStorage.getItem(url);

        if (responseCache) {
          return new Promise(resolve => {
            resolve(JSON.parse(responseCache));
            this.fetchApi(url, reqObj, shouldCache);
          });
        }
      }
    }

    return this.fetchApi(url, reqObj, shouldCache);
  }

  /**
   * Make the actual request
   * @param {string} url
   * @param {Object} reqObj
   * @param {boolean} shouldCache
   * @returns {Object}
   */
  fetchApi = async (url: string, reqObj: Object, shouldCache: Boolean): Promise<any> => {
    let response = await fetch(url, reqObj);
    const statusCode = response.status;
    response = await this.convertToJson(response);
    const returnResponse = {
      status: statusCode,
      data: response.Data || response.data,
      response,
    };

    if (shouldCache && STATUS.isSuccess(statusCode)) {
      window.localStorage.setItem(url, JSON.stringify(returnResponse));
      return returnResponse;
    }

    return returnResponse;
  };
}

export default Api;
