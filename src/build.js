/**
	Build an atomic date object such as `TaiDate`
*/

"use strict";

module.exports = function(tai) {
	/**
		Constructor.
		We secretly use an internal UTC `Date` object to do all of
		this stuff.
	*/
	var TaiDate = function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
		var atomic;

		// No arguments: TaiDate for the current time.
		if(arguments.length === 0) {
			atomic = TaiDate.now();
		}

		// One argument: a number of TAI milliseconds <OR> a Date
		else if(arguments.length === 1) {
			if(arg0 instanceof Date) {
				atomic = tai.unixToAtomic(arg0.getTime());
			} else if(typeof arg0 === "string") {
				// NO STRING PARSING!
				throw new Error("String date parsing is not supported");
			} else {
				atomic = arg0;
			}
		}

		// 2 to 7 arguments: that's a year, month, etc. in TAI.
		else if(2 <= arguments.length && arguments.length <= 7) {
			atomic = TaiDate.TAI.apply(TaiDate, arguments);
		}

		// 8+ arguments
		else {
			throw new Error("Too many arguments for constructor");
		}

		if(tai.atomicTooEarly(atomic)) {
			throw new Error("This atomic time is not defined.");
		}
		this._date = new Date(atomic);
	};

	/**
		After `Date.now`.
		Take right now, and convert it to TAI milliseconds.
	*/
	TaiDate.now = function() {
		return tai.unixToAtomic(Date.now());
	};

	/**
		After `Date.UTC`.
		Takes a year, month etc. as representing a TAI calendar date and time,
		and convert it to TAI milliseconds.
	*/
	TaiDate.TAI = function(/* year, month[, day[, ...]] */) {
		var atomic = Date.UTC.apply(Date, arguments);
		if(tai.atomicTooEarly(atomic)) {
			throw new Error("This atomic time is not defined.");
		}
		return atomic;
	};

	/**
		Return a `TaiDate` representing the same instant
		in time as the original `Date`.
	*/
	TaiDate.fromDate = function(date) {
		return new TaiDate(date);
	};

	/**
		After `Date.prototype.getTime`.
		Converts this instant to TAI milliseconds.
	*/
	TaiDate.prototype.getTime = function() {
		return this._date.getTime();
	};

	// Modelled on the `Date.prototype.get[UTC]*` methods.
	TaiDate.prototype.getDate         = function() { return this._date.getUTCDate        (); };
	TaiDate.prototype.getDay          = function() { return this._date.getUTCDay         (); };
	TaiDate.prototype.getFullYear     = function() { return this._date.getUTCFullYear    (); };
	TaiDate.prototype.getHours        = function() { return this._date.getUTCHours       (); };
	TaiDate.prototype.getMilliseconds = function() { return this._date.getUTCMilliseconds(); };
	TaiDate.prototype.getMinutes      = function() { return this._date.getUTCMinutes     (); };
	TaiDate.prototype.getMonth        = function() { return this._date.getUTCMonth       (); };
	TaiDate.prototype.getSeconds      = function() { return this._date.getUTCSeconds     (); };

	/**
		Convert this `TaiDate` to a `Date` representing the same instant
		in time.
	*/
	TaiDate.prototype.toDate = function() {
		return new Date(tai.atomicToUnix(this.getTime()));
	};

	/**
		Modelled after `Date.prototye.toUTCString`.
		Return e.g. "Mon, 03 Jul 2006 21:44:38 TAI"
	*/
	TaiDate.prototype.toString = function() {
		// OH NOOOOO
		var leftPad0 = function(str, len) {
			return str.length === len ? str : leftPad0("0" + str, len);
		};
		var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
		var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

		return [
			days[this.getDay()] + ",",               // "Mon,"
			leftPad0(String(this.getDate()), 2),     // "03"
			months[this.getMonth()],                 // "Jul"
			leftPad0(String(this.getFullYear()), 4), // "2006"
			[
				leftPad0(String(this.getHours()), 2),   // "21"
				leftPad0(String(this.getMinutes()), 2), // "44"
				leftPad0(String(this.getSeconds()), 2)  // "38"
			].join(":"),                             // "21:44:38"
			"TAI"                                    // "TAI"
		].join(" ");
	};

	return TaiDate;
};
