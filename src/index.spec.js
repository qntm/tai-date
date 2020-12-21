/* eslint-env jest */

const TaiDate = require('.')

const DEC = 11

describe('TaiDate', () => {
  it('TAI', () => {
    expect(TaiDate.TAI(1961, 0, 1, 0, 0, 1, 423)).toBe(-283996798577)
    expect(TaiDate.TAI(1968, 0, 1, 0, 0, 1, 423)).toBe(-63158398577)
    expect(TaiDate.TAI(1972, 0, 1, 0, 0, 10)).toBe(63072010000)
    expect(TaiDate.TAI(1972, 0, 1, 0, 0, 10, 1)).toBe(63072010001)
    expect(TaiDate.TAI(2016, 9, 27, 21, 15)).toBe(1477602900000)
  })

  it('0-argument constructor', () => {
    const spy = jest.spyOn(Date, 'now').mockImplementation(() => Date.UTC(2020, DEC, 21))
    expect(new TaiDate().getTime()).toBe(Date.now() + 37_000)
    spy.mockRestore()
  })

  it('1-argument constructor', () => {
    expect(new TaiDate(-283996798577).getTime()).toBe(-283996798577)
    expect(new TaiDate(63072010000).getTime()).toBe(63072010000)
    expect(new TaiDate(1477602900000).getTime()).toBe(1477602900000)
    expect(new TaiDate(new Date(1000000000000)).getTime()).toBe(1000000032000)
    expect(() => new TaiDate('1970-01-01')).toThrow()
  })

  it('2- to 7-argument constructors', () => {
    expect(new TaiDate(1961, 0, 1, 0, 0, 1, 423).getTime()).toBe(-283996798577)
    expect(new TaiDate(1972, 0, 1, 0, 0, 10).getTime()).toBe(63072010000)
    expect(new TaiDate(1972, 0, 1, 0, 0, 10, 1).getTime()).toBe(63072010001)
    expect(new TaiDate(2016, 9, 27, 21, 15).getTime()).toBe(1477602900000)
  })

  it('getters', () => {
    expect(new TaiDate(2016, 9, 27, 21, 15, 16, 774).getDate()).toBe(27)
    expect(new TaiDate(2016, 9, 27, 21, 15, 16, 774).getDay()).toBe(4)
    expect(new TaiDate(2016, 9, 27, 21, 15, 16, 774).getFullYear()).toBe(2016)
    expect(new TaiDate(2016, 9, 27, 21, 15, 16, 774).getHours()).toBe(21)
    expect(new TaiDate(2016, 9, 27, 21, 15, 16, 774).getMilliseconds()).toBe(774)
    expect(new TaiDate(2016, 9, 27, 21, 15, 16, 774).getMinutes()).toBe(15)
    expect(new TaiDate(2016, 9, 27, 21, 15, 16, 774).getMonth()).toBe(9)
    expect(new TaiDate(2016, 9, 27, 21, 15, 16, 774).getSeconds()).toBe(16)
  })

  it('toDate', () => {
    expect(new TaiDate(new Date(1000000000000)).toDate().getTime()).toBe(1000000000000)
  })

  it('toString', () => {
    expect(new TaiDate(1000000000000).toString()).toBe('Sun, 09 Sep 2001 01:46:40 TAI')
  })
})
