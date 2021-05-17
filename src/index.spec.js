/* eslint-env jest */

const { TaiDate } = require('.')

const JAN = 0
const OCT = 9

describe('TaiDate', () => {
  it('TAI', () => {
    expect(TaiDate.TAI(1961, JAN, 1, 0, 0, 1, 423)).toBe(-283996798577)
    expect(TaiDate.TAI(1968, JAN, 1, 0, 0, 1, 423)).toBe(-63158398577)
    expect(TaiDate.TAI(1972, JAN, 1, 0, 0, 10)).toBe(63072010000)
    expect(TaiDate.TAI(1972, JAN, 1, 0, 0, 10, 1)).toBe(63072010001)
    expect(TaiDate.TAI(2016, 9, 27, 21, 15)).toBe(1477602900000)
  })

  it('0-argument constructor', () => {
    expect(() => new TaiDate()).toThrowError('Don\'t know the current TAI time, you have to provide it')
  })

  it('1-argument constructor', () => {
    expect(new TaiDate(-283996798577).getTime()).toBe(-283996798577)
    expect(new TaiDate(63072010000).getTime()).toBe(63072010000)
    expect(new TaiDate(1477602900000).getTime()).toBe(1477602900000)
    expect(() => new TaiDate('1970-01-01')).toThrowError('String date parsing is not supported')
  })

  it('2- to 7-argument constructors', () => {
    expect(new TaiDate(1961, JAN, 1, 0, 0, 1, 423).getTime()).toBe(-283996798577)
    expect(new TaiDate(1972, JAN, 1, 0, 0, 10).getTime()).toBe(63072010000)
    expect(new TaiDate(1972, JAN, 1, 0, 0, 10, 1).getTime()).toBe(63072010001)
    expect(new TaiDate(2016, OCT, 27, 21, 15).getTime()).toBe(1477602900000)
  })

  it('getters', () => {
    expect(new TaiDate(2016, OCT, 27, 21, 15, 16, 774).getTAIDate()).toBe(27)
    expect(new TaiDate(2016, OCT, 27, 21, 15, 16, 774).getTAIDay()).toBe(4)
    expect(new TaiDate(2016, OCT, 27, 21, 15, 16, 774).getTAIFullYear()).toBe(2016)
    expect(new TaiDate(2016, OCT, 27, 21, 15, 16, 774).getTAIHours()).toBe(21)
    expect(new TaiDate(2016, OCT, 27, 21, 15, 16, 774).getTAIMilliseconds()).toBe(774)
    expect(new TaiDate(2016, OCT, 27, 21, 15, 16, 774).getTAIMinutes()).toBe(15)
    expect(new TaiDate(2016, OCT, 27, 21, 15, 16, 774).getTAIMonth()).toBe(9)
    expect(new TaiDate(2016, OCT, 27, 21, 15, 16, 774).getTAISeconds()).toBe(16)
  })

  it('toString', () => {
    expect(new TaiDate(1000000000000).toString()).toBe('Sun 09 Sep 2001 01:46:40 TAI')
  })
})
