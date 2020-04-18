const sinon = require('sinon');
const chai = require('chai');
import { PrettyTime } from "./../PrettyTime";

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

describe('Template', function() {
  it('#dummy', function() {
    console.log('asdf');
  });
});
