import {
  shallowObjectCompare,
  shallowCompareOptionsArray,
  isPlainObject,
} from './index.js';

describe('_utils/shallowObjectCompare', () => {
  it('should return false when objects have different length', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, b: 2, c: 3 };

    expect(shallowObjectCompare(obj1, obj2)).to.eql(false);
  });

  it('should return false when objects have different content', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, b: 3 };

    expect(shallowObjectCompare(obj1, obj2)).to.eql(false);
  });

  it('should return true when objects have same content in different order', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { b: 2, a: 1 };

    expect(shallowObjectCompare(obj1, obj2)).to.eql(true);
  });

  it('should return true when objects have same content in the same order', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, b: 2 };

    expect(shallowObjectCompare(obj1, obj2)).to.eql(true);
  });


  it('should return false if any of the parameters is not an object', () => {
    const obj1 = { a: 1, b: 2 };
    const obj3 = 'foo';
    const obj4 = [1, 2, 3];

    expect(shallowObjectCompare(obj1, obj3)).to.eql(false);
    expect(shallowObjectCompare(obj3, obj1)).to.eql(false);
    expect(shallowObjectCompare(obj4, obj1)).to.eql(false);
    expect(shallowObjectCompare(obj1, obj4)).to.eql(false);
    expect(shallowObjectCompare(obj3, obj4)).to.eql(false);
  });
});

describe('_utils/shallowCompareOptionsArray', () => {
  it('should return false when arrays have different length', () => {
    const arr1 = [{ a: 1, b: 2 }, { a: 1, b: 2 }];
    const arr2 = [{ a: 1, b: 2 }];

    expect(shallowCompareOptionsArray(arr1, arr2)).to.eql(false);
  });

  it('should return false when arrays have different content', () => {
    const arr1 = [{ a: 1, b: 2 }, { a: 1, b: 2 }];
    const arr2 = [{ a: 2, b: 3 }, { a: 2, b: 3 }];

    expect(shallowCompareOptionsArray(arr1, arr2)).to.eql(false);
  });

  it('should return false when arrays have same content in different order', () => {
    const arr1 = [{ a: 1, b: 2 }, { a: 3, b: 4 }];
    const arr2 = [{ a: 3, b: 4 }, { a: 1, b: 2 }];

    expect(shallowCompareOptionsArray(arr1, arr2)).to.eql(false);
  });

  it('should return true when objects have same content in the same order', () => {
    const arr1 = [{ a: 1, b: 2 }, { a: 1, b: 2 }];
    const arr2 = [{ a: 1, b: 2 }, { a: 1, b: 2 }];

    expect(shallowCompareOptionsArray(arr1, arr2)).to.eql(true);
  });
});

describe('_utils/isPlainObject', () => {
  it('should return true for an object', () => {
    expect(isPlainObject({ a: 1, b: 2 })).to.eql(true);
  });

  it('should return false for an array', () => {
    expect(isPlainObject([1, 2, 3])).to.eql(false);
  });

  it('should return false for null', () => {
    expect(isPlainObject(null)).to.eql(false);
  });

  it('should return false for a function', () => {
    expect(isPlainObject(function () { return 5;})).to.eql(false);
  });

  it('should return false for a function returning an object', () => {
    expect(isPlainObject(function () { return { a: 1, b: 2 } })).to.eql(false);
  });

  it('should return false for a string', () => {
    expect(isPlainObject('foo')).to.eql(false);
  });

  it('should return false for a number', () => {
    expect(isPlainObject(5)).to.eql(false);
  });

  it('should return false for undefined', () => {
    expect(isPlainObject(undefined)).to.eql(false);
  });
});