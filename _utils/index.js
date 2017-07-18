/**
 * This file is not intended to be imported by the user, but for the purpose of storing reusable
 * functions needed by components in this library to work properly.
 */

 /**
  * Makes a shallow comparisson between 2 arrays containing plain objects. Returns true if the
  * shallow comparisson between the objects in the array is true. This also evaluates that they are
  * in the same order in the array
  *
  * @param {any} arr1 - The options array to compare
  * @param {any} arr2 - The options array to compare with
  * @return {Boolean} - Whether the array contents and order are the same or not
  */
export function shallowCompareOptionsArray(arr1, arr2) {
  if (arr1.length === arr2.length) {
    return arr1.every((el, i) => shallowObjectCompare(arr1[i], arr2[i]));
  } else {
    return false;
  }
}

/**
 * Makes a shallow comparison between 2 objects
 *
 * @param {Object} obj1 - The object to compare
 * @param {Object} obj2 - The object to compare with
 * @return {Boolean} - Whether the object contents are same or not
 */
export function shallowObjectCompare(obj1, obj2) {
  if (!isPlainObject(obj1) || !isPlainObject(obj2)) {
    return false;
  }

  const obj1Keys = Object.keys(obj1);
  if (obj1Keys.length === Object.keys(obj2).length) {
    return obj1Keys.every(key => obj1[key] === obj2[key]);
  } else {
    return false;
  }
}

/**
 * Verifies if a value is a plain object
 *
 * @param {any} obj - The value to validate
 * @returns {Boolean} - Whether the value is a plain object or not
 */
export function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}
