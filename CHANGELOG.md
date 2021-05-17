# CHANGELOG

## 3.x.x

Removed TAI's dependency on [`t-a-i`](https://github.com/qntm/t-a-i) and all of its methods for converting `TaiDate`s to `Date` and *vice versa*. `TaiDate` can't perform these conversions without knowing precisely what conversion model you want to use, and there's no elegant way to expose that API. Instead, I suggest taking an existing Unix millisecond count and performing the conversions using `t-a-i`.

Also the getters are all renamed. `getFullYear` is now `getTAIFullYear`, for example. Finally, `tai-date` no longer exports the `TaiDate` constructor directly, but an object with the `TaiDate` constructor as a property of it.

`tai-date@2` code like:

```js
const TaiDate = require('tai-date')

// Get current TAI count
const atomic = TaiDate.now()

// 0-argument constructor
const taiDate = new TaiDate()

// Get year
const taiFullYear = taiDate.getFullYear()

// Conversion from `TaiDate` to `Date`
const date = taiDate.toDate()
```

should be replaced with `tai-date@3` code like:

```js
const { TaiConverter, MODELS } = require('t-a-i')
const { TaiDate } = require('tai-date')

const taiConverter = TaiConverter(MODELS.STALL)

// Get current TAI count
const atomic = taiConverter.unixToAtomic(Date.now())

// Use current TAI count in constructor instead
const taiDate = new TaiDate(atomic)

// Get year
const taiFullYear = taiDate.getTAIFullYear()

// Conversion from `TaiDate` to `Date`
const date = new Date(taiConverter.atomicToUnix(taiDate.getTime()))
```

## 2.x.x

Method `TaiDate.TAI` no longer performs bounds checking and will return an identical result to `Date.UTC` in all cases.

Method `TaiDate.fromDate(date)` is dropped as it is redundant in light of `new TaiDate(date)`.

Round trip behaviour is improved: Unix to TAI conversions are one-to-one, while TAI to Unix conversions are many-to-one, avoiding exceptions in either direction.

Support for Node.js 10 is dropped.

## 1.x.x

Initial release.
