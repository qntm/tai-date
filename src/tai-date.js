/**
	A `TaiDate` object represents a single instant in TAI in the same
	way that a `Date` object represents a single instant in UTC.
*/

"use strict";

var tai = require("t-a-i");
var build = require("./build.js");

module.exports = build(tai);
