var assert = require('assert')
  , t = require('../typr.js')
  , F = function () {};

exports['test type#partitioning'] = function () {
  // We expect the that the following arrays can be partitioned as follows
  var expected = {
    'Function'  : [ function () {}, F ]
  , 'Object'    : [ {}, new F(), {a: [1]} ]
  , 'Array'     : [ [], [1, '2'], [1, [2, [3]]], [13], [[[[]]]] ]
  , 'Date'      : [ new Date() ]
  , 'Number'    : [ 223434, 1 / 0, -Infinity, Infinity, NaN, 0 / 0, Date.now(), Number('123'), 0, 1 ]
  , 'String'    : [ "str", String('str'), 5 + "arst" ]
  , 'Boolean'   : [ true, false, !5, !null, !undefined ]
  , 'Null'      : [ null ]
  , 'RegExp'    : [ /\//, new RegExp("/") ]
  , 'Undefined' : [ F['unknown_prop'], undefined ]
  , 'Arguments' : [ arguments ]
  };

  assert.ok(t.isFunction, 't.isFunction exists');
  var testCount = 1;

  Object.keys(expected).forEach(function (type) {
    var ary = expected[type];

    // Expect each key to exist on t
    assert.isDefined(t['is' + type], 'is' + type + ' isDefined');
    assert.ok(t.isFunction(t['is' + type]), 'isFunction(t.is' + type + ')');
    testCount += 2;

    // Expect each element of ary to satisfy t['is' + type]
    ary.forEach(function (e) {
      assert.ok(t['is' + type](e), 't.is' + type + ' of ' + Object.prototype.toString.call(e) + ' (' + e + ') is true');
      testCount += 1;
    });

    // Expect empty call to return true IFF type is 'Undefined'
    if (type === 'Undefined') {
      assert.ok(t['is' + type](), "empty call isUndefined");
    }
    else {
      assert.ok(!t['is' + type](), "empty call !is" + type);
    }
    testCount += 1;

    Object.keys(expected).forEach(function (innerType) {
      if (innerType === type) {
        return;
      }
      var innerAry = expected[innerType];
      // Expect each element of innerAry to not satisy t['is ' + type]
      innerAry.forEach(function (innerEl) {
        assert.ok(!t['is' + type](innerEl), innerEl + ' !is' + type);
        testCount += 1;
      });
    });

  });

  // NaN should ellicit true for isNumber and isNaN only
  Object.keys(expected).forEach(function (type) {
    if (type === 'Number') {
      return
    }
    assert.ok(!t['is'+type](NaN), "NaN is not a non-Number type");
    testCount += 1;
  });
  assert.ok(t['isNaN'](NaN), "NaN isNaN");
  testCount += 1;

  // isNaN should fail for a number and +-Infinity
  assert.ok(!t['isNaN'](5), "5 is not NaN");
  assert.ok(!t['isNaN'](-Infinity), "-Infinity is not NaN");
  assert.ok(!t['isNaN'](Infinity), "Infinity is not NaN");
  testCount += 3;

  // +-Infinity should ellicit true for isNumber and isInfinite only
  Object.keys(expected).forEach(function (type) {
    if (type === 'Number') {
      return
    }
    assert.ok(!t['is'+type](Infinity), "Infinity is not a non-Number type");
    assert.ok(!t['is'+type](-Infinity), "-Infinity is not a non-Number type");
    testCount += 2;
  });

  // isInfinite should fail for a Number and NaN
  assert.ok(!t.isInfinite(NaN), "NaN is not Infinite");
  assert.ok(!t.isInfinite(5), "5 is not Infinite");
  testCount += 2;

  // finish with the count
  console.log('typr: ' + testCount + ' type partitioning tests completed');
};
