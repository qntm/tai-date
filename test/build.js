"use strict";

var tai = require("t-a-i");
var build = require("./../src/build.js");

//                  inserted       removed
//                       \/         \/
// TAI:          [3][4][5][6][ 7][ 8][ 9][...]
// Unix: [...][6][7][8][9][9][10][11]
//                               [12][13][...]
var odd = tai.build([
	{atomic: 3, offset: -4},
	{atomic: 6, offset: -3}, // inserted leap millisecond
	{atomic: 9, offset: -4}  // removed leap millisecond
]);

var OddDate = build(odd);

// .TAI()
try {
	OddDate.TAI(1970, 0, 1, 0, 0, 0, 2);
	console.log(false);
} catch(e) {
	console.log(true);
}
console.log(OddDate.TAI(1970, 0, 1, 0, 0, 0, 3) === 3);
console.log(OddDate.TAI(1970, 0, 1, 0, 0, 0, 4) === 4);
console.log(OddDate.TAI(2007, 5, 3, 13, 14, 15, 999) === 1180876455999);

// 1-argument constructor
try {
	new OddDate("asafdasd");
	console.log(false);
} catch(e) {
	console.log(true);
}
try {
	new OddDate(2);
	console.log(false);
} catch(e) {
	console.log(true);
}
console.log(new OddDate(3).getTime() === 3);
console.log(new OddDate(435897346).getTime() === 435897346);

// 2- to 7-argument constructors
try {
	new OddDate(1970, 0, 1, 0, 0, 0, 2);
	console.log(false);
} catch(e) {
	console.log(true);
}
console.log(new OddDate(1970, 0, 1, 0, 0, 0, 3).getTime() === 3);
console.log(new OddDate(1970, 0, 1, 0, 0, 0, 4).getTime() === 4);
console.log(new OddDate(2007, 5, 3, 13, 14, 15, 999).getTime() === 1180876455999);

// 8+-argument constructor
try {
	new OddDate(0, 1, 2, 3, 4, 5, 6, 7, 8);
	console.log(false);
} catch(e) {
	console.log(true);
}

// Getters
console.log(new OddDate(2007, 5, 3, 13, 14, 15, 999).getDate        () === 3);
console.log(new OddDate(2007, 5, 3, 13, 14, 15, 999).getDay         () === 0);
console.log(new OddDate(2007, 5, 3, 13, 14, 15, 999).getFullYear    () === 2007);
console.log(new OddDate(2007, 5, 3, 13, 14, 15, 999).getHours       () === 13);
console.log(new OddDate(2007, 5, 3, 13, 14, 15, 999).getMilliseconds() === 999);
console.log(new OddDate(2007, 5, 3, 13, 14, 15, 999).getMinutes     () === 14);
console.log(new OddDate(2007, 5, 3, 13, 14, 15, 999).getMonth       () === 5);
console.log(new OddDate(2007, 5, 3, 13, 14, 15, 999).getSeconds     () === 15);

console.log(new OddDate(2007, 5, 3, 13, 14, 15, 999).toString() === "Sun, 03 Jun 2007 13:14:15 TAI");
