/**
  A `TaiDate` object represents a single instant in TAI in the same
  way that a `Date` object represents a single instant in UTC.
*/

'use strict'

const tai = require('t-a-i')
const build = require('./build')

module.exports = build(tai)
