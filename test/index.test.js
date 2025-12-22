import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import { TaiDate } from '../src/index.js'

const JAN = 0
const OCT = 9

describe('TaiDate', () => {
  it('TAI', () => {
    assert.equal(TaiDate.TAI(1961, JAN, 1, 0, 0, 1, 423), -283996798577)
    assert.equal(TaiDate.TAI(1968, JAN, 1, 0, 0, 1, 423), -63158398577)
    assert.equal(TaiDate.TAI(1972, JAN, 1, 0, 0, 10), 63072010000)
    assert.equal(TaiDate.TAI(1972, JAN, 1, 0, 0, 10, 1), 63072010001)
    assert.equal(TaiDate.TAI(2016, 9, 27, 21, 15), 1477602900000)
  })

  it('0-argument constructor', () => {
    assert.throws(() => new TaiDate(), Error('Don\'t know the current TAI time, you have to provide it'))
  })

  it('1-argument constructor', () => {
    assert.equal(new TaiDate(-283996798577).getTime(), -283996798577)
    assert.equal(new TaiDate(63072010000).getTime(), 63072010000)
    assert.equal(new TaiDate(1477602900000).getTime(), 1477602900000)
    assert.throws(() => new TaiDate('1970-01-01'), Error('String date parsing is not supported'))
  })

  it('2- to 7-argument constructors', () => {
    assert.equal(new TaiDate(1961, JAN, 1, 0, 0, 1, 423).getTime(), -283996798577)
    assert.equal(new TaiDate(1972, JAN, 1, 0, 0, 10).getTime(), 63072010000)
    assert.equal(new TaiDate(1972, JAN, 1, 0, 0, 10, 1).getTime(), 63072010001)
    assert.equal(new TaiDate(2016, OCT, 27, 21, 15).getTime(), 1477602900000)
  })

  it('getters', () => {
    assert.equal(new TaiDate(2016, OCT, 27, 21, 15, 16, 774).getTAIDate(), 27)
    assert.equal(new TaiDate(2016, OCT, 27, 21, 15, 16, 774).getTAIDay(), 4)
    assert.equal(new TaiDate(2016, OCT, 27, 21, 15, 16, 774).getTAIFullYear(), 2016)
    assert.equal(new TaiDate(2016, OCT, 27, 21, 15, 16, 774).getTAIHours(), 21)
    assert.equal(new TaiDate(2016, OCT, 27, 21, 15, 16, 774).getTAIMilliseconds(), 774)
    assert.equal(new TaiDate(2016, OCT, 27, 21, 15, 16, 774).getTAIMinutes(), 15)
    assert.equal(new TaiDate(2016, OCT, 27, 21, 15, 16, 774).getTAIMonth(), 9)
    assert.equal(new TaiDate(2016, OCT, 27, 21, 15, 16, 774).getTAISeconds(), 16)
  })

  it('toString', () => {
    assert.equal(new TaiDate(1000000000000).toString(), 'Sun 09 Sep 2001 01:46:40 TAI')
  })
})
