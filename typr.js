var t = {}
  , toStr = Object.prototype.toString;

// All JS types that can be simply tested with toStr on node >= 0.4
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
t.isArray = function (o) {
  return Array.isArray(o);
};

// toStr.call fails for null on node 0.4
t.isNull = function (o) {
  return o === null;
};

// toStr.call fails for undefined on node 0.4
t.isUndefined = function (o) {
  var undef;
  return o === undef;
};

// This is an extra test, as NaN is (technically) a Number
// However, NaN is the only value for which === is not reflexive
t.isNaN = function (n) {
  return n !== n;
};

// +- Infinity is also a Number so this is also an extra test
t.isInfinite = function (n) {
  return Math.abs(n) === Infinity;
};

t.isNumeric = function (n) {
  return !t.isInfinite(n) && !t.isNaN(n);
}

// does not follow the partition, but sometimes this is rather what we want
// functions can have properties => they are Object like, with keys() defined
t.hasKeys = function (o) {
  return Object(o) === o;
};

module.exports = t;
