/**
  Build an atomic date object such as `TaiDate`
*/

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// We secretly use an internal UTC `Date` object to do all of
// this stuff.
module.exports = function (tai) {
  class TaiDate {
    constructor () {
      let atomic

      if (0 in arguments) {
        if (1 in arguments) {
          // 2 to 7 arguments: that's a year, month, etc. in TAI.
          atomic = TaiDate.TAI(...arguments)
        } else {
          // One argument: a number of TAI milliseconds <OR> a Date
          const arg0 = arguments[0]
          if (arg0 instanceof Date) {
            atomic = tai.oneToOne.unixToAtomic(arg0.getTime())
          } else if (typeof arg0 === 'string') {
            // NO STRING PARSING!
            throw new Error('String date parsing is not supported')
          } else {
            // A number or something which will be coerced to a number
            atomic = arg0
          }
        }
      } else {
        // No arguments: TaiDate for the current time.
        atomic = TaiDate.now()
      }

      this._date = new Date(atomic)
    }

    /**
      After `Date.prototype.getTime`.
      Converts this instant to TAI milliseconds.
    */
    getTime () {
      return this._date.getTime()
    }

    // Modelled on the `Date.prototype.get[UTC]*` methods.
    getDate () { return this._date.getUTCDate() }
    getDay () { return this._date.getUTCDay() }
    getFullYear () { return this._date.getUTCFullYear() }
    getHours () { return this._date.getUTCHours() }
    getMilliseconds () { return this._date.getUTCMilliseconds() }
    getMinutes () { return this._date.getUTCMinutes() }
    getMonth () { return this._date.getUTCMonth() }
    getSeconds () { return this._date.getUTCSeconds() }

    /**
      Convert this `TaiDate` to a `Date` representing the same instant
      in time. Go many-to-one here to avoid exceptions during a leap second,
      but round trips will not work
    */
    toDate () {
      return new Date(tai.oneToMany.atomicToUnix(this.getTime()))
    }

    /**
      Modelled after `Date.prototye.toUTCString`.
      Return e.g. "Mon, 03 Jul 2006 21:44:38 TAI"
    */
    toString () {
      return [
        days[this.getDay()] + ',', // "Mon,"
        String(this.getDate()).padStart(2, '0'), // "03"
        months[this.getMonth()], // "Jul"
        String(this.getFullYear()).padStart(4, '0'), // "2006"
        [
          String(this.getHours()).padStart(2, '0'), // "21"
          String(this.getMinutes()).padStart(2, '0'), // "44"
          String(this.getSeconds()).padStart(2, '0') // "38"
        ].join(':'), // "21:44:38"
        'TAI' // "TAI"
      ].join(' ')
    }
  }

  /**
    After `Date.now`.
    Take right now, and convert it to TAI milliseconds.
    If the current Unix time falls during a leap second, assume we're past it
  */
  TaiDate.now = () =>
    tai.oneToOne.unixToAtomic(Date.now())

  /**
    After `Date.UTC`.
    Takes a year, month etc. as representing a TAI calendar date and time,
    and convert it to TAI milliseconds. No bounds checking.
  */
  TaiDate.TAI = Date.UTC.bind(Date)

  return TaiDate
}
