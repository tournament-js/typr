# Typr :: Mutually Exclusive JS Type Testring

The aim of this module is to completely partition the set of JS objects uniquely into exactly one type.

Mathematically;

∀X⊂JSObjects ∀x∈X ∃!t ∈ types s.t. typr["is"+t] where

types = [Function, Object, Date, Number, String, Boolean, RegExp, Undefined, Arguments, Null, Array]

I.e. for any set of JS objects, every element in this set has exactly one unique type
where typr returns true for its typecheck.

Additionally, anything for which isNumber is true can be partitioned into 3 sub-types:

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
