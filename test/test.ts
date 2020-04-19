const sinon = require('sinon');
const chai = require('chai');
import { PrettyTime } from "./../PrettyTime";
import { StartParameter } from "./../StartParameter";
import { Display } from "./../Display";
import { TimeLeft } from "./../TimeLeft";

describe('PrettyTime', () => {

  const assertTime = (expected: string, actual: string) => {
    chai.expect(expected).to.equal(actual);
  }

  it('#predicteTime next day', () => {
    assertTime('15:45', new PrettyTime().predictedTime('14.03.2020 15:45+0'));
  });
  it('#predicteTime delay leading zero', () => {
    assertTime('15:49', new PrettyTime().predictedTime('15:45+04'));
  });
  it('#predicteTime delay no leading zero', () => {
    assertTime('15:49', new PrettyTime().predictedTime('15:45+4'));
  });
  it('#predicteTime delay in next hour', () => {
    assertTime('16:02', new PrettyTime().predictedTime('15:59+3'));
  });
  it('#predicteTime simple', () => {
    assertTime('15:45', new PrettyTime().predictedTime('15:45'));
  });
});

describe('TimeLeft', () => {
  const assertMinutes = (expected: number, actual: number) => {
    chai.expect(expected).to.equal(actual);
  }

  it('#minutes returns the minutes without delay on the same day', function() {
    const fakeDate = new Date(1577876400 * 1000);
    sinon.useFakeTimers(fakeDate.getTime());
    const timeLeft = new TimeLeft();
    assertMinutes(10, timeLeft.minutes('12:10+0'));
  });

  it('#minutes returns the minutes without delay on the same day', function() {
    const fakeDate = new Date(1577876400 * 1000);
    sinon.useFakeTimers(fakeDate.getTime());
    const timeLeft = new TimeLeft();
    assertMinutes(5, timeLeft.minutes('12:05+0'));
  });

  it('#minutes returns the minutes with delay on the same day', function() {
    const fakeDate = new Date(1577876400 * 1000);
    sinon.useFakeTimers(fakeDate.getTime());
    const timeLeft = new TimeLeft();
    assertMinutes(7, timeLeft.minutes('12:05+2'));
  });

  it('#minutes returns the minutes with delay on the same day', function() {
    const fakeDate = new Date(1577876400 * 1000);
    sinon.useFakeTimers(fakeDate.getTime());
    const timeLeft = new TimeLeft();
    assertMinutes(80, timeLeft.minutes('12:05+75'));
  });

  it('#writeStatus too long time', function() {
    const display = sinon.createStubInstance(Display, {
      stayHome: sinon.spy()
    });
    const timeLeft = new TimeLeft();
    timeLeft.writeStatus(15, display);
    sinon.assert.called(display.stayHome);
  });
  it('#writeStatus get ready', function() {
    const display = sinon.createStubInstance(Display, {
      getReady: sinon.spy()
    });
    const timeLeft = new TimeLeft();
    timeLeft.writeStatus(12, display);
    sinon.assert.called(display.getReady);
  });
  it('#writeStatus get gogogo', function() {
    const display = sinon.createStubInstance(Display, {
      leaveHouse: sinon.spy()
    });
    const timeLeft = new TimeLeft();
    timeLeft.writeStatus(7, display);
    sinon.assert.called(display.leaveHouse);
  });
  it('#writeStatus get too late', function() {
    const display = sinon.createStubInstance(Display, {
      stayHome: sinon.spy()
    });
    const timeLeft = new TimeLeft();
    timeLeft.writeStatus(5, display);
    sinon.assert.called(display.stayHome);
  });
});

describe('StartParemeter', () => {
  it('#validate throws an error when env variable is not set', () => {
    chai.expect(() => { new StartParameter({}).validate() }).to.throw(Error);
  });
  it('#validate passes when all env variables are set', () => {
    chai.expect(() => { new StartParameter({
      'RNV_API_TOKEN': 'test'
    }).validate() }).not.to.throw(Error);
  });
});

describe('Template', () => {
  it('#dummy', () => {
    console.log('asdf');
  });
});
