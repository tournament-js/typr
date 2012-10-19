var t = {}
  , toStr = Object.prototype.toString;

[
  'Function'
, 'Object'    // Object(obj) === obj is not simply true for basetype Object elements
, 'Date'
, 'Number'    // Note: Number includes {NaN, Infinity, -Infinity} (but these can be tested for specifically below)
, 'String'
, 'Boolean'
, 'RegExp'
, 'Arguments' // should probably not use this - arguments going away
]
.forEach(function (type) {
  var expected = '[object ' + type + ']';
  t['is' + type] = function (o) {
    return toStr.call(o) === expected;
  };
});

// Do this faster
t.isArray = Array.isArray;
t.isNaN = Number.isNaN;
t.isNumeric = Number.isFinite;

// +- Infinity is also a Number so this is also an extra test
t.isInfinite = function (n) {
  return Math.abs(n) === Infinity;
};

t.isNull = function (o) {
  return o === null;
};

t.isUndefined = function (o) {
  var undef;
  return o === undef;
};

// does not follow the partition, but sometimes this is rather what we want
// functions can have properties => they are Object like, with keys() defined
t.hasKeys = function (o) {
  return Object(o) === o;
};

module.exports = t;
