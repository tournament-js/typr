# Typr :: Mutually Exclusive JS Type Testring [![Build Status](https://secure.travis-ci.org/clux/typr.png)](http://travis-ci.org/clux/typr)

The aim of this module is to completely partition the set of JS objects into a set of types T:

````
T = [Function, Object, Date, Number, String, Boolean, RegExp, Undefined, Arguments, Null, Array]
````

*Prop. 1* For every JS object x, x has exactly one type in T where [typr] returns true for its typecheck.

*Prop. 2* Whether or not an Object has keys and can be looped over is determined by `t.hasKeys` and is completely independent of the type found in prop 1.

*Prop. 3* Number types can be partitioned into 3 sub-types:

- isNaN
- isInfinite
- isNumeric i.e. !isNaN && !isInfinite


These properties are tested extensively.

## Usage
Basic usage:

````javascript
var typr = require('typr');
typr.isFunction(el); // true iff el is a function
````

Read the very short [API](https://github.com/clux/typr/master/api.md).

### Object Keys
The reason for prop 2 is that Objects can masquerade othes instances like
Functions, Strings, RegExps, Dates. Object.keys() (and for-in) will actually work on some
of these. This does not mean they will have interesting keys, but they sometimes
do!

A common trick in node modules to export a function, but additionally attach
properties to it. Such an object will only be a Function by our partitioning
(as that was its original construction), but it is Object-like.

If you would rather test for enumerability of properties, use the extra test for Object-likeness: `hasKeys`.

Note again that this may not be super intuitive:

````javascript
var dualThing = new String("wee");
dualThing.prop = "hi";
Object.keys(dualThing); // [ '0', '1', '2', 'prop' ]

t.isObject(dualThing); // false
t.isString(dualThing); // true
t.hasKeys(dualThing); // true
````

## Installation

```bash
$ npm install typr
```

## Running tests
Install development dependencies

```bash
$ npm install
```

Run the tests

```bash
$ npm test
```

## License
MIT-Licensed. See LICENSE file for details.
