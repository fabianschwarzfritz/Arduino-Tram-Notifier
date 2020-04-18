const sinon = require('sinon');
const chai = require('chai');
import { PrettyTime } from "./../PrettyTime";
import { StartParameter } from "./../StartParameter";

describe('PrettyTime', () => {

  const assertTime = (expected: string, actual: string) => {
    chai.expect(expected).to.equal(actual);
  }

  it('#predicteTime next day', () => {
    assertTime('15:45', new PrettyTime().predictedTime('14.03.2020 15:45+0'));
  });
  it('#predicteTime delay', () => {
    assertTime('15:49', new PrettyTime().predictedTime('15:45+04'));
  });
  it('#predicteTime delay', () => {
    assertTime('15:49', new PrettyTime().predictedTime('15:45+4'));
  });
  it('#predicteTime simple', () => {
    assertTime('15:45', new PrettyTime().predictedTime('15:45'));
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
