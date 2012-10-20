# Typr API
Assume `var t = require('typr')`, then every function attached to `t` is a function from `x` to a `Boolean`.

## Type Partitioning
Of the following tests, EXACTLY ONE is true for any JavaScript object `x`.
### t.isFunction(x) :: Bool
### t.isObject(x) :: Bool
### t.isNumber(x) :: Bool
### t.isDate(x) :: Bool
### t.isString(x) :: Bool
### t.isRegExp(x) :: Bool
### t.isArguments(x) :: Bool
### t.isArray(x) :: Bool
### t.isNull(x) :: Bool
### t.isUndefined(x) :: Bool

## Object-likeness
Even if `t.isObject(x)` is `false`, `x` may still have keys in some cases that can be looped over.
### t.hasKeys(o) :: Bool

## Number Partitioning
Every Number is one of three sub-types:
### t.isNaN(x) :: Bool
### t.isInfinite(x) :: Bool
### t.isNumeric(x) :: Bool

