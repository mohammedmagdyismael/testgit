// @flow

import { isValidNumber } from 'libphonenumber-js';

/**
 * Check fields validation status
 * @param {Array} fields
 * @returns {Object}
 */
const validateFields = (fields: Array<any>): Object => {
  let isValid = true;
  let firstDangerField = -1;

  fields.forEach((field, fieldNo) => {
    if (!field.isValid()) {
      isValid = false;
      field.validate();
      if (firstDangerField === -1) firstDangerField = fieldNo;
    }
  });

  return {
    isValid,
    firstDangerField,
  };
};

/**
 * Check fields validation status
 * @param {string} mobileNumber
 * @param {string} countryCode
 * @param {Array} countries
 * @returns {bool}
 */
const validatePhoneNumber = (
  mobileNumber: string,
  countryCode: string,
  countries: Array<Object>,
) => {
  // If number is not sent, return
  if (!mobileNumber) return;

  let countryIso;
  let isValid = true;
  let regexOverride = false;

  // Loop through countries and check if the country is supported
  countries.forEach(country => {
    countryIso = country.IsoCode;
    if (country.CountyPhoneRegexes !== null) {
      // If country supported, we match the regex
      if (country.DialCode === countryCode) {
        regexOverride = true;
        const regexReg = new RegExp(country.CountyPhoneRegexes);
        if (!regexReg.test(mobileNumber)) {
          isValid = false;
        } else {
          isValid = true;
        }
      }
    } else if (!regexOverride && country.DialCode === countryCode) {
      if (!isValidNumber(mobileNumber, countryIso)) {
        isValid = false;
      } else {
        isValid = true;
      }
      return isValid;
    }
    return undefined;
  });

  return isValid; // eslint-disable-line
};

export { validateFields, validatePhoneNumber };
