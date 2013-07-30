'use strict';

var expect = require('chai').expect;

describe('dalek-reporter-json', function() {

  it('should be ok', function () {
    var JSONReporter = require('../index')({
      events: {emit: function () {}, on: function () {}, off: function () {}},
      config: {get: function () {}}
    });
    expect(JSONReporter).to.be.ok;
  });


  it('can store browser string', function () {
    var JSONReporter = require('../index')({
      events: {emit: function () {}, on: function () {}, off: function () {}},
      config: {get: function () {}}
    });

    JSONReporter.runBrowser('Chrome');
    expect(JSONReporter.browser).to.equal('Chrome');

    JSONReporter.runBrowser('PhantomJS');
    expect(JSONReporter.browser).to.equal('PhantomJS');
  });

  it('can store action', function () {
    var JSONReporter = require('../index')({
      events: {emit: function () {}, on: function () {}, off: function () {}},
      config: {get: function () {}}
    });

    JSONReporter.actionQueue = [];
    JSONReporter.action({name: 'an action', type: 'val'});
    expect(JSONReporter.actionQueue[0]).to.deep.equal({name: 'an action', type: 'val', kind: 'action'});
  });

  it('can store assertions', function () {
    var JSONReporter = require('../index')({
      events: {emit: function () {}, on: function () {}, off: function () {}},
      config: {get: function () {}}
    });

    JSONReporter.actionQueue = [];
    JSONReporter.assertion({name: 'an assertions', type: 'val'});
    expect(JSONReporter.actionQueue[0]).to.deep.equal({name: 'an assertions', type: 'val', kind: 'assertion'});
  });

  it('can store testStarted information', function () {
    var JSONReporter = require('../index')({
      events: {emit: function () {}, on: function () {}, off: function () {}},
      config: {get: function () {}}
    });

    JSONReporter.actionQueue = ['foobar'];
    JSONReporter.testStarted({name: 'xxxx', type: 'yyyy'});
    expect(JSONReporter.actionQueue).to.be.empty;
    expect(JSONReporter.currentTest).to.deep.equal({name: 'xxxx', type: 'yyyy'});
  });

  it('can store testFinished information', function () {
    var JSONReporter = require('../index')({
      events: {emit: function () {}, on: function () {}, off: function () {}},
      config: {get: function () {}}
    });

    JSONReporter.runBrowser('Chrome');
    JSONReporter.actionQueue = [];
    JSONReporter.testFinished({id: '1', name: 'val', status: true, passedAssertions: 1, failedAssertions: 0});
    expect(JSONReporter.data.tests[0]).to.deep.equal({id: '1', name: 'val', status: true, passedAssertions: 1, failedAssertions: 0, browser: 'Chrome', actions: []});
  });

});
