'use strict';

var expect = require('chai').expect;

describe('dalek-reporter-json', function() {

  it('should be ok', function(){
    var JSONReporter = require('../index')({
      events: {emit: function () {}, on: function () {}, off: function () {}},
      config: {get: function () {}}
    });
    expect(JSONReporter).to.be.ok;
  });

});
