# Typr :: Mutually Exclusive JS Type Testring

The aim of this module is to completely partition the set of JS objects into a set of types T:

````
T = [Function, Object, Date, Number, String, Boolean, RegExp, Undefined, Arguments, Null, Array]
````

*Prop. 1* For any set X of JS objects, every element in X has exactly one unique type in T
where typr returns true for its typecheck.

*Prop. 2* Additionally, anything for which isNumber is true can be partitioned into 3 sub-types:

- isNaN
- isInfinite
- !isNaN && !isInfinite

These properties are tested extensively.

## Usage
Basic usage:

````javascript
var typr = require('typr');
typr.isFunction(el); // true iff el is a function
````

## Installation

````bash
$ npm install typr
````

## Running tests
Install development dependencies

````bash
$ npm install
````

Run the tests

````bash
$ npm test
````

## License
MIT-Licensed. See LICENSE file for details.
