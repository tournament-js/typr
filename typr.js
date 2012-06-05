var toStr = Object.prototype.toString;

// All JS types that can be simply tested with toStr on node 0.4 and node >=0.6
var types = [
  'Function'
, 'Object'    // Object(obj) === obj used in underscore is also true for other things like noop
, 'Date'
, 'Number'    // Note: Number includes {NaN, Infinity, -Infinity} (but these can be tested for specifically below)
, 'String'    // string can  be literal and Object
, 'Boolean'
, 'RegExp'
, 'Arguments' // should probably not use this - arguments going away
];

types.forEach(function (type) {
  var expected = '[object ' + type + ']';
  exports['is' + type] = function (o) {
    return toStr.call(o) === expected;
  };
});

// Do this faster
exports.isArray = function (o) {
  return Array.isArray(o);
};

// toStr.call fails for null on node 0.4
exports.isNull = function (o) {
  return o === null;
};

// toStr.call fails for undefined on node 0.4
exports.isUndefined = function (o) {
  var undef;
  return o === undef;
};

// This is an extra test, as NaN is (technically) a Number
// However, NaN is the only value for which === is not reflexive
exports.isNaN = function (n) {
  return n !== n;
};

// +- Infinity is also a Number so this is also an extra test
exports.isInfinite = function (n) {
  return Math.abs(n) === Infinity;
};

// does not follow the partition, but sometimes this is rather what we want
// functions can have properties => they are Object like, with keys() defined
exports.hasKeys = function (o) {
  return Object(o) === o;
};
