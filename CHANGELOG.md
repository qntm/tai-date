# CHANGELOG

## 2.x.x

Method `TaiDate.TAI` no longer performs bounds checking and will return an identical result to `Date.UTC` in all cases.

Method `TaiDate.fromDate(date)` is dropped as it is redundant in light of `new TaiDate(date)`.

Support for Node.js 10 is dropped.

## 1.x.x

Initial release.
