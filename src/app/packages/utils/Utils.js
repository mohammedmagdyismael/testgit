// @flow

/**
 * Converts an image to base64
 * @param {string} url
 * @param {Function} callback
 * @param {string} outputFormat
 */
const convertImgToBase64 = (url: string, callback: Function, outputFormat: string) => {
  const img = new Image();
  img.crossOrigin = 'Anonymous';
  img.onload = () => {
    let canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.height = img.height;
    canvas.width = img.width;
    ctx.drawImage(img, 0, 0);
    const dataURL = canvas.toDataURL(outputFormat);
    callback(dataURL);
    canvas = null;
  };

  img.onerror = () => {
    callback();
  };

  img.src = url;
};

/**
 * Return false if the passed array is empty or have null values
 * @param {array} result
 * @returns {boolean}
 */
const isFound = (result: Array<any>): boolean => result.length !== 0 && result[0] !== null;

/**
 * Fix float digits to a specific number of digits
 * @param {number} number
 * @param {number} numberOfDigits
 * @returns {string}
 */
const fixFloat = (number: number, numberOfDigits: number): string => {
  const RE = new RegExp(`^-?\\d+(?:.\\d{0,${numberOfDigits || -1}})?`);
  // $FlowFixMe
  return number.toString().match(RE)[0];
};

export { isFound, convertImgToBase64, fixFloat };
