import toArray from '../../utils/toArray';

describe('toArray', () => {
  let withArray = null;
  let withObject = null;
  let withNull = null;
  let withUndefined = null;
  let withValue = null;

  beforeEach(() => {
    withArray = ['foo', 'bar'];
    withObject = { foo: 'bar' };
    withNull = null;
    withUndefined = undefined;
    withValue = 'foobar';
  });

  afterEach(() => {
    withArray = null;
    withObject = null;
    withNull = null;
    withUndefined = null;
    withValue = null;
  });

  test('with array', () => {
    expect(toArray(withArray)).toBe(withArray);
  });

  test('with object', () => {
    expect(toArray(withObject)).toEqual([withObject]);
  });

  test('with null', () => {
    expect(toArray(withNull)).toEqual([withNull]);
  });

  test('with undefined', () => {
    expect(toArray(withUndefined)).toEqual([withUndefined]);
  });

  test('with value', () => {
    expect(toArray(withValue)).toEqual([withValue]);
  });
});
