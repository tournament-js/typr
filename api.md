# Typr API
Assume `var t = require('typr')`, then every function attached to `t` is a function from `x` to a `Boolean`.

## Type Partitioning
Of the following tests, EXACTLY ONE is true for any JavaScript object `x`.
### t.isFunction(x)
### t.isObject(x)
### t.isNumber(x)
### t.isDate(x)
### t.isString(x)
### t.isRegExp(x)
### t.isArguments(x)
### t.isArray(x)
### t.isNull(x)
### t.isUndefined(x)

## Object-likeness
Even if `t.isObject(x)` is `false`, `x` may still have keys in some cases that can be looped over.
### t.hasKeys(o)

## Number Partitioning
Every Number is one of three sub-types:
### t.isNaN(x)
### t.isInfinite(x)
### t.isNumeric(x)

