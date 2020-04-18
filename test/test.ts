const sinon = require('sinon');
const chai = require('chai');
import { PrettyTime } from "./../PrettyTime";
import { StartParameter } from "./../StartParameter";

describe('PrettyTime', function() {

  function assertTime(expected: string, actual: string) {
    chai.expect(expected).to.equal(actual);
  }

  it('#predicteTime next day', function() {
    assertTime('15:45', new PrettyTime().predictedTime('14.03.2020 15:45+0'));
  });
  it('#predicteTime delay', function() {
    assertTime('15:49', new PrettyTime().predictedTime('15:45+04'));
  });
  it('#predicteTime delay', function() {
    assertTime('15:49', new PrettyTime().predictedTime('15:45+4'));
  });
  it('#predicteTime simple', function() {
    assertTime('15:45', new PrettyTime().predictedTime('15:45'));
  });
});

describe('StartParemeter', function() {
  it('#validate throws an error when env variable is not set', function() {
    chai.expect(() => { new StartParameter({}).validate() }).to.throw(Error);
  });
  it('#validate passes when all env variables are set', function() {
    chai.expect(() => { new StartParameter({
      'RNV_API_TOKEN': 'test'
    }).validate() }).not.to.throw(Error);
  });
});

describe('Template', function() {
  it('#dummy', function() {
    console.log('asdf');
  });
});
