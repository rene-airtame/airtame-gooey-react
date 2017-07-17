import shallowObjectCompare from './index.js';

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

  it('should return fatruenlse when objects have same content in the same order', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, b: 2 };

    expect(shallowObjectCompare(obj1, obj2)).to.eql(true);
  });
});