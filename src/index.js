const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

class TaiDate {
  // We secretly use an internal UTC `Date` object to do all of
  // this stuff.

  constructor () {
    let atomic

    if (0 in arguments) {
      if (1 in arguments) {
        // 2 to 7 arguments: that's a year, month, etc. in TAI.
        atomic = TaiDate.TAI(...arguments)
      } else {
        // One argument: a number of TAI milliseconds
        const arg0 = arguments[0]
        if (typeof arg0 === 'string') {
          // NO STRING PARSING!
          throw Error('String date parsing is not supported')
        } else {
          // A number or something which will be coerced to a number
          atomic = Number(arg0)
        }
      }
    } else {
      throw Error('Don\'t know the current TAI time, you have to provide it')
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
  getTAIDate () { return this._date.getUTCDate() }
  getTAIDay () { return this._date.getUTCDay() }
  getTAIFullYear () { return this._date.getUTCFullYear() }
  getTAIHours () { return this._date.getUTCHours() }
  getTAIMilliseconds () { return this._date.getUTCMilliseconds() }
  getTAIMinutes () { return this._date.getUTCMinutes() }
  getTAIMonth () { return this._date.getUTCMonth() }
  getTAISeconds () { return this._date.getUTCSeconds() }

  /**
    Modelled after `Date.prototye.toUTCString`.
    Return e.g. "Mon, 03 Jul 2006 21:44:38 TAI"
  */
  toString () {
    return [
      days[this.getTAIDay()], // "Mon"
      String(this.getTAIDate()).padStart(2, '0'), // "03"
      months[this.getTAIMonth()], // "Jul"
      String(this.getTAIFullYear()).padStart(4, '0'), // "2006"
      [
        String(this.getTAIHours()).padStart(2, '0'), // "21"
        String(this.getTAIMinutes()).padStart(2, '0'), // "44"
        String(this.getTAISeconds()).padStart(2, '0') // "38"
      ].join(':'), // "21:44:38"
      'TAI' // "TAI"
    ].join(' ')
  }
}

/**
  After `Date.UTC`.
  Takes a year, month etc. as representing a TAI calendar date and time,
  and convert it to TAI milliseconds. No bounds checking.
*/
TaiDate.TAI = Date.UTC.bind(Date)

module.exports.TaiDate = TaiDate
