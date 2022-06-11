# tai-date

A `TaiDate` object represents an instant in [International Atomic Time (TAI)](https://en.wikipedia.org/wiki/International_Atomic_Time), in the same way that a conventional JavaScript [`Date`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date) object represents an instant in Unix time.

To convert `TaiDate`s to and from `Date`s, use the [`t-a-i`](https://github.com/ferno/t-a-i), which provides methods for converting TAI milliseconds to Unix milliseconds.

## Installation

```
npm install tai-date
```

## Usage

```javascript
import { TaiConverter } from 't-a-i'
import { TaiDate } from 'tai-date'

const taiConverter = TaiConverter(tai.MODELS.STALL)

const date = new Date(2016, 9, 30, 14, 45, 49)
// Sun Oct 30 2016 14:45:49 GMT+0000 (GMT Standard Time)

const taiDate = new TaiDate(taiConverter.unixToAtomic(date.getTime()))
// Sun Oct 30 2016 14:46:25 TAI

console.log(taiDate.getTime() - date.getTime())
// 36000; TAI was 36 seconds ahead of Unix at this time
```

## Why can't I just use a `Date` for this purpose?

A `Date` object specifically represents an instant in Unix time. Its method names and method behaviours reflect this. For example

* the names of the methods [`Date.UTC`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/UTC), [`Date.prototype.getUTCFullYear`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCFullYear), [`Date.prototype.getUTCMonth`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCMonth) and so on
* the behaviour of e.g. [`Date.now()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now) and [`Date.prototype.getTime()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime), which are documented as returning Unix milliseconds, not TAI milliseconds
* locale conversion behaviour of [`Date.prototype.getHours`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getHours), [`Date.prototype.getMinutes`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getMinutes) and so on
* stringification methods such as [`Date.prototype.toISOString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString) which return e.g. `"2011-10-05T14:48:00.000Z"` - note the trailing "Z" indicating Zulu time i.e. UTC

## API

### new TaiDate()
Throws an exception. `TaiDate` has to be told what instant in TAI it represents, it isn't able to convert Unix time to TAI by itself.

### new TaiDate(atomic)
`atomic` is a number of TAI milliseconds. Constructs a `TaiDate` object representing this instant in time.
```javascript
new TaiDate(1000000000000)
// Sun, 09 Sep 2001 01:46:40 TAI
```

### new TaiDate(string)
Throws an exception. `TaiDate` has no string-parsing capability.

### new TaiDate(year, month[, day[, hours[, minutes[, seconds[, milliseconds]]]]])
Construct a `TaiDate` object representing the instant described by `year`, `month` and so on in the TAI calendar. `day` defaults to `1` if omitted, everything else defaults to `0`.
```javascript
new TaiDate(2016, 9, 30, 14, 46, 25)
// Sun Oct 30 2016 14:46:25 TAI
```

### TaiDate.TAI(year, month[, day[, hours[, minutes[, seconds[, milliseconds]]]]])
Take the year, month *etc.* as representing a TAI calendar date and time, and convert it to TAI milliseconds. `day` defaults to `1` if omitted, everything else defaults to `0`. Note that this method has exactly identical behaviour to `Date.UTC`.
```javascript
TaiDate.TAI(2012, 11, 12, 23, 59, 59, 999)
// 1355356799999
```

### TaiDate.prototype.getTime()
Convert a `TaiDate` object to TAI milliseconds.
```javascript
new TaiDate(2012, 11, 12, 23, 59, 59, 999).getTime()
// 1355356799999
```

### TaiDate.prototype.getTAIDate()
### TaiDate.prototype.getTAIDay()
### TaiDate.prototype.getTAIFullYear()
### TaiDate.prototype.getTAIHours()
### TaiDate.prototype.getTAIMilliseconds()
### TaiDate.prototype.getTAIMonth()
### TaiDate.prototype.getTAISeconds()

The above are all getter methods, analogous to the equivalent getters on `Date` but always returning TAI figures.

### TaiDate.prototype.toString()
Return a string representing this instant in TAI.
```javascript
new TaiDate(2006, 6, 3, 21, 44, 38).toString()
// "Mon 03 Jul 2006 21:44:38 TAI"
```
