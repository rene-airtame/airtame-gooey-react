/**
 * This file is not intended to be imported by the user, but for the purpose of storing reusable
 * functions needed by components in this library to work properly.
 */

/**
 * Makes a shallow comparison between 2 objects
 * @param {Object} obj1 - The object to compare
 * @param {Object} obj2 - The object to compare with
 * @return {Boolean} - Whether the object contents and the order of its keys are the same or not
 */
export default function shallowObjectCompare(obj1, obj2) {
  const obj1Keys = Object.keys(obj1);
  if (obj1Keys.length === Object.keys(obj2).length) {
    return obj1Keys.every(key => obj1[key] === obj2[key]);
  } else {
    return false;
  }
}

