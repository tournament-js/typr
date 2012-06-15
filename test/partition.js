var tap = require('tap')
  , test = tap.test
  , t = require('../typr.js')
  , F = function () {};

// this kind of case is slightly problematic
// it is primarily a function, but will fail isObject even though you can call keys
var twoThing = function () {}; // primarily a function => isObject
twoThing.prop = "hello";

var twoThing2 = new String("wee");
twoThing2.prop = "hi";

test('hasKeys', function (a) {
  a.ok(t.hasKeys(twoThing), "function has keys");
  a.ok(t.hasKeys(twoThing2), "new String has keys");
  a.ok(!t.hasKeys(5), "number still isn't object like'");

  var values = []
  Object.keys(expected).forEach(function (key) {
    expected[key].forEach(function (el) {
      values.push(el);
    });
  });
  values.map(function (el) {
    if (t.hasKeys(el)) {
      a.ok(Object.keys(el), "if hasKeys, keys work..");
    };
  });
  a.end();
});

// We expect the that the following arrays can be partitioned as follows
var expected = {
  'Function'  : [ function () {}, F, twoThing ]
, 'Object'    : [ {}, new F(), {a: [1]} ]
, 'Array'     : [ [], [1, '2'], [1, [2, [3]]], [13], [[[[]]]] ]
, 'Date'      : [ new Date() ]
, 'Number'    : [ 223434, 1 / 0, -Infinity, Infinity, NaN, 0 / 0, Date.now(), Number('123'), 0, 1 ]
, 'String'    : [ "str", String('str'), 5 + "arst" , twoThing2]
, 'Boolean'   : [ true, false, !5, !null, !undefined ]
, 'Null'      : [ null ]
, 'RegExp'    : [ /\//, new RegExp("/") ]
, 'Undefined' : [ F['unknown_prop'], undefined ]
, 'Arguments' : [ arguments ]
};

test('type partitioning', function (a) {
  a.ok(t.isFunction, 't.isFunction exists');

  Object.keys(expected).forEach(function (type) {
    var ary = expected[type];

    // Expect each key to exist on t
    a.ok(t['is' + type], 'is' + type + ' isDefined');
    a.ok(t.isFunction(t['is' + type]), 'isFunction(t.is' + type + ')');

    // Expect each element of ary to satisfy t['is' + type]
    ary.forEach(function (e) {
      a.ok(t['is' + type](e), 't.is' + type + ' of ' + Object.prototype.toString.call(e) + ' (' + e + ') is true');
    });

    // Expect empty call to return true IFF type is 'Undefined'
    if (type === 'Undefined') {
      a.ok(t['is' + type](), "empty call isUndefined");
    }
    else {
      a.ok(!t['is' + type](), "empty call !is" + type);
    }

    Object.keys(expected).forEach(function (innerType) {
      if (innerType === type) {
        return;
      }
      var innerAry = expected[innerType];
      // Expect each element of innerAry to not satisy t['is ' + type]
      innerAry.forEach(function (innerEl) {
        a.ok(!t['is' + type](innerEl), innerEl + ' !is' + type);
      });
    });

  });

  // NaN should ellicit true for isNumber and isNaN only
  Object.keys(expected).forEach(function (type) {
    if (type === 'Number') {
      return
    }
    a.ok(!t['is'+type](NaN), "NaN is not a non-Number type");
  });
  a.ok(t['isNaN'](NaN), "NaN isNaN");

  // isNaN should fail for a number and +-Infinity
  a.ok(!t['isNaN'](5), "5 is not NaN");
  a.ok(!t['isNaN'](-Infinity), "-Infinity is not NaN");
  a.ok(!t['isNaN'](Infinity), "Infinity is not NaN");

  // +-Infinity should ellicit true for isNumber and isInfinite only
  Object.keys(expected).forEach(function (type) {
    if (type === 'Number') {
      return
    }
    a.ok(!t['is'+type](Infinity), "Infinity is not a non-Number type");
    a.ok(!t['is'+type](-Infinity), "-Infinity is not a non-Number type");
  });

  // isInfinite should fail for a Number and NaN
  a.ok(!t.isInfinite(NaN), "NaN is not Infinite");
  a.ok(!t.isInfinite(5), "5 is not Infinite");
  a.end();
});
