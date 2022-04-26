// @flow

import CryptoJS from 'crypto-js';
import atob from 'atob';

const key = '8C6A5A98C796D1293C2129FE89E51';

/**
 * Encrypt a string
 * @param {string} data
 * @returns {string}
 */
export const encrypt = (data: string): string => CryptoJS.AES.encrypt(data, key);

/**
 * Decrypt a string
 * @param {string} data
 * @returns {string}
 */
export const decrypt = (data: string): string => {
  const bytes = CryptoJS.AES.decrypt(data.toString(), key);
  return bytes.toString(CryptoJS.enc.Utf8);
};

/**
 * Decode the JWT token
 * @param {string} token
 * @returns {Object}
 */
export const decodeJwtToken = (token: string): Object => {
  const header = JSON.parse(atob(token.split('.')[0]));
  const payLoad = JSON.parse(atob(token.split('.')[1]));

  return {
    header,
    payLoad,
  };
};
