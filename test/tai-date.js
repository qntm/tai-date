"use strict";

var TaiDate = require("./../src/tai-date.js");

// .TAI()
try {
	TaiDate.TAI(1972, 0, 1, 0, 0, 9, 999);
	console.log(false);
} catch(e) {
	console.log(true);
}
console.log(TaiDate.TAI(1972, 0, 1, 0, 0, 10) === 63072010000);
console.log(TaiDate.TAI(1972, 0, 1, 0, 0, 10, 1) === 63072010001);
console.log(TaiDate.TAI(2016, 9, 27, 21, 15) === 1477602900000);

// 1-argument constructor
try {
	new TaiDate("2016-07-08");
	console.log(false);
} catch(e) {
	console.log(true);
}
try {
	new TaiDate(63072009999);
	console.log(false);
} catch(e) {
	console.log(true);
}
console.log(new TaiDate(63072010000).getTime() === 63072010000);
console.log(new TaiDate(1477602900000).getTime() === 1477602900000);

// 2- to 7-argument constructors
try {
	new TaiDate(1972, 0, 1, 0, 0, 9, 999);
	console.log(false);
} catch(e) {
	console.log(true);
}
console.log(new TaiDate(1972, 0, 1, 0, 0, 10).getTime() === 63072010000);
console.log(new TaiDate(1972, 0, 1, 0, 0, 10, 1).getTime() === 63072010001);
console.log(new TaiDate(2016, 9, 27, 21, 15).getTime() === 1477602900000);

// 8+-argument constructor
try {
	new TaiDate(0, 1, 2, 3, 4, 5, 6, 7, 8);
	console.log(false);
} catch(e) {
	console.log(true);
}

// Getters
console.log(new TaiDate(2016, 9, 27, 21, 15, 16, 774).getDate        () === 27);
console.log(new TaiDate(2016, 9, 27, 21, 15, 16, 774).getDay         () === 4);
console.log(new TaiDate(2016, 9, 27, 21, 15, 16, 774).getFullYear    () === 2016);
console.log(new TaiDate(2016, 9, 27, 21, 15, 16, 774).getHours       () === 21);
console.log(new TaiDate(2016, 9, 27, 21, 15, 16, 774).getMilliseconds() === 774);
console.log(new TaiDate(2016, 9, 27, 21, 15, 16, 774).getMinutes     () === 15);
console.log(new TaiDate(2016, 9, 27, 21, 15, 16, 774).getMonth       () === 9);
console.log(new TaiDate(2016, 9, 27, 21, 15, 16, 774).getSeconds     () === 16);

// leapSeconds
console.log(TaiDate.leapSeconds.length === 28);
console.log(TaiDate.leapSeconds[0].taiDate.getTime() === 63072010000);
console.log(TaiDate.leapSeconds[1].taiDate.getTime() === 78796811000);
console.log(TaiDate.leapSeconds[0].offset === 10000);
console.log(TaiDate.leapSeconds[1].offset === 11000);
