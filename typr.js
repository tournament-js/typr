var toStr = Object.prototype.toString
  , t = {};

['Function', 'Object', 'Date', 'Number', 'String', 'Boolean', 'RegExp', 'Arguments']
.forEach(function (type) {
  var expected = '[object ' + type + ']';
  t['is' + type] = function (o) {
    return toStr.call(o) === expected;
  };
});

t.isArray = Array.isArray;
t.isNaN = Number.isNaN;
t.isNumeric = Number.isFinite;

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

t.hasKeys = function (o) {
  return Object(o) === o;
};

module.exports = t;
