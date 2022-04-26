// @flow

/**
 * Generate array maps from array models array
 * Input:
 * [
 *  {
 *   name: 'foo',
 *   desc: 'bar',
 *   languageId: 1
 *  },
 *  {
 *   name: 'bar',
 *   desc: 'foo',
 *   languageId: 2
 *  }
 * ]
 *
 * Output:
 * i.e:
 * {
 *    name: Map(),
 *    desc: Map(),
 * }
 *
 * Each map it's key will be languageId
 *  name.get(1) => 'foo'
 *  name.get(2) => 'bar'
 *
 * @param {array} arrayModels
 * @param {string} key
 * @param {array} fallbackKeys
 * @returns {object} generatedObject
 */
export const generateMapsFromArrayModels = (
  arrayModels: Array<Object> = [],
  key: string,
  fallbackKeys: Array<string> = [],
): Object => {
  const generatedObject = {};

  // If the coming array is empty, create an empty maps
  if (!arrayModels || arrayModels.length === 0) {
    fallbackKeys.forEach(fallbackKey => {
      generatedObject[fallbackKey] = new Map();
    });
    return generatedObject;
  }

  // Looping through all arrayModels
  arrayModels.forEach(item => {
    Object.entries(item).forEach(([itemKey, itemValue]) => {
      // We don't return the compare key
      if (key === itemKey) return;

      // Get the last saved map
      let newValue = generatedObject[itemKey];

      // If the value doesn't exist, we create a new map
      if (!newValue) {
        newValue = new Map();
      }

      generatedObject[itemKey] = newValue.set(item[key], itemValue);
    });
  });

  // Create empty maps for expected fallbackKeys if their value === null
  // in arrayModels
  fallbackKeys.forEach(fallbackKey => {
    const isKeyGenerated = generatedObject[fallbackKey];
    if (!isKeyGenerated) {
      generatedObject[fallbackKey] = new Map();
    }
  });

  return generatedObject;
};

/**
 * Generate array maps from array models array
 * Input:
 * {
 *    name: Map(),
 *    desc: Map(),
 * }
 *
 * Output
 * [
 *  {
 *   name: 'foo',
 *   desc: 'bar',
 *   languageId: 1
 *  },
 *  {
 *   name: 'bar',
 *   desc: 'foo',
 *   languageId: 2
 *  }
 * ]
 *
 * @param {object} object
 * @param {string} key
 * @returns {array} arrayModels
 */
export const generateArrayModelsFromMaps = (maps: Object, key: string): Array<Object> => {
  const arrayModelsMap = new Map();
  const arrayModels = [];
  const sharedModels = {};

  // Loop through maps keys
  Object.entries(maps).forEach(([itemKey, itemValue]) => {
    // If the current item is amp
    if (itemValue instanceof Map) {
      itemValue.forEach((mapValue, mapKey) => {
        // Map key will be the main key for arrayModelsMap
        arrayModelsMap.set(mapKey, {
          ...arrayModelsMap.get(mapKey),
          [itemKey]: mapValue,
        });
      });
    } else {
      // If the item isn't a map, so it's value is shared across arrayModels
      sharedModels[itemKey] = itemValue;
    }
  });

  // Push map items into an Array
  arrayModelsMap.forEach((itemValue, itemKey) => {
    arrayModels.push({
      [key]: itemKey,
      ...itemValue,
      ...sharedModels,
    });
  });

  return arrayModels;
};

/**
 * Convert image url to base64
 * @param {string} url Image url
 * @returns {promise}
 */
const getBase64 = (url: string) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      let canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.height = img.height;
      canvas.width = img.width;
      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL('png');
      resolve(dataURL);
      canvas = null;
    };

    img.onerror = () => {
      reject();
    };

    img.src = url;
  });

/**
 * Converts an array of images urls to base64
 * @param {array<any>} images Array of images
 * @param {Function} iterator Iterator function
 * @returns {array<string>} base64
 */
export const convertURLtoBase64 = async (
  images: Array<any>,
  iterator: Function = photo => photo,
) => {
  const promises = images.map(image => getBase64(iterator(image)));
  const base64 = await Promise.all(promises);
  return base64;
};
