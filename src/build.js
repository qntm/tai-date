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
    getTime = this._date.getTime.bind(this._date)

    // Modelled on the `Date.prototype.get[UTC]*` methods.
    getDate = this._date.getUTCDate.bind(this._date)
    getDay = this._date.getUTCDay.bind(this._date)
    getFullYear = this._date.getUTCFullYear.bind(this._date)
    getHours = this._date.getUTCHours.bind(this._date)
    getMilliseconds = this._date.getUTCMilliseconds.bind(this._date)
    getMinutes = this._date.getUTCMinutes.bind(this._date)
    getMonth = this._date.getUTCMonth.bind(this._date)
    getSeconds = this._date.getUTCSeconds.bind(this._date)

    /**
      Convert this `TaiDate` to a `Date` representing the same instant
      in time. Go many-to-one here to avoid exceptions during a leap second,
      but round trips will not work
    */
    toDate = () =>
      new Date(tai.oneToMany.atomicToUnix(this.getTime()))

    /**
      Modelled after `Date.prototye.toUTCString`.
      Return e.g. "Mon, 03 Jul 2006 21:44:38 TAI"
    */
    toString = () => [
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
