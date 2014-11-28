/*!
 *
 * Copyright (c) 2013 Sebastian Golasch
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 *
 */

'use strict';

// ext. libs
var fs = require('fs');
var path = require('path');

// int. global
var reporter = null;

/**
 * The JSON reporter can produce a file with the results of your testrun.
 *
 * The reporter can be installed with the following command:
 * ```
 * $ npm install dalek-reporter-json --save-dev
 * ```
 *
 * The file will follow the following format. This is a first draft and will
 * definitly change in future versions.
 *
 * ```javascript
 * {
 *   "tests": [
 *         {
 *           "id": "test806",
 *           "name": "Can get !url (OK, TDD style, message, chained)",
 *           "browser": "Chrome",
 *           "status": true,
 *           "passedAssertions": 1,
 *           "failedAssertions": 0,
 *           "actions": [
 *               {
 *                   "value": "http://localhost:5000/index.html",
 *                   "type": "open",
 *                   "uuid": "6ea84fc0-58bf-4e1f-bb9c-f035c6e6fae2",
 *                   "kind": "action",
 *                   "isAction": true
 *               },
 *               {
 *                   "success": true,
 *                   "expected": "http://localhost:5000/guinea.html",
 *                   "value": "http://localhost:5000/index.html",
 *                   "message": "Url is not whatever",
 *                   "type": "url",
 *                   "kind": "assertion",
 *                   "isAssertion": true
 *               }
 *           ]
 *       }
 *   ],
 *   "elapsedTime": {
 *       "minutes": 1,
 *       "seconds": 43.328535046
 *   },
 *   "status": true,
 *   "assertions": 1,
 *   "assertionsFailed": 0,
 *   "assertionsPassed": 1
 * }
 * ```
 *
 * By default the file will be written to `report/dalek.json`,
 * you can change this by adding a config option to the your Dalekfile
 *
 * ```javascript
 * "json-reporter": {
 *   "dest": "your/folder/your_file.json"
 * }
 * ```
 *
 * @class Reporter
 * @constructor
 * @part JSON
 * @api
 */

function Reporter (opts) {
  this.events = opts.events;
  this.config = opts.config;
  this.data = {};
  this.actionQueue = [];
  this.data.tests = [];
  this.browser = null;

  var defaultReportFolder = 'report';
  this.dest = this.config.get('json-reporter') && this.config.get('json-reporter').dest ? this.config.get('json-reporter').dest : defaultReportFolder;

  this.startListening();
}

/**
 * @module Reporter
 */

module.exports = function (opts) {
  if (reporter === null) {
    reporter = new Reporter(opts);
  }

  return reporter;
};

Reporter.prototype = {

  /**
   * Connects to all the event listeners
   *
   * @method startListening
   * @chainable
   */

  startListening: function () {
    this.events.on('report:run:browser', this.runBrowser.bind(this));
    this.events.on('report:assertion', this.assertion.bind(this));
    this.events.on('report:action', this.action.bind(this));
    this.events.on('report:test:started', this.testStarted.bind(this));
    this.events.on('report:test:finished', this.testFinished.bind(this));
    this.events.on('report:runner:finished', this.runnerFinished.bind(this));
    this.events.on('report:log:user',this.messageLog.bind(this));
    this.events.on('report:screenshot',this.screenshot.bind(this));
    return this;
  },

  /**
   * Stores the current browser name
   *
   * @method runBrowser
   * @param {string} browser Browser name
   * @chainable
   */

  runBrowser: function (browser) {
    this.browser = browser;
    return this;
  },

  /**
   * Generates JSON for an action
   *
   * @method action
   * @param {object} data Event data
   * @chainable
   */

  action: function (data) {
    data.kind = 'action';
    this.actionQueue.push(data);
    return this;
  },

  /**
   * Generates JSON for an assertion
   *
   * @method assertion
   * @param {object} data Event data
   * @chainable
   */

  assertion: function (data) {
    data.kind = 'assertion';
    this.actionQueue.push(data);
    return this;
  },

  /**
   * Sets up a new testcase
   *
   * @method testStarted
   * @param {object} data Event data
   * @chainable
   */

  testStarted: function (data) {
    this.currentTest = data;
    this.actionQueue = [];
    return this;
  },

  /**
   * Writes data for a finished testcase
   *
   * @method testFinished
   * @param {object} data Event data
   * @chainable
   */

  testFinished: function (data) {
    this.data.tests.push({
      id: data.id,
      name: data.name,
      browser: this.browser,
      status: data.status,
      passedAssertions: data.passedAssertions,
      failedAssertions: data.failedAssertions,
      actions: this.actionQueue
    });
    return this;
  },

  /**
   * Serializes JSON and writes file to the file system
   *
   * @method runnerFinished
   * @param {object} data Event data
   * @chainable
   */

  runnerFinished: function (data) {
    this.data.elapsedTime = data.elapsedTime;
    this.data.status = data.status;
    this.data.assertions = data.assertions;
    this.data.assertionsFailed = data.assertionsFailed;
    this.data.assertionsPassed = data.assertionsPassed;

    var contents = JSON.stringify(this.data, false, 4);

    if (path.extname(this.dest) !== '.json') {
      this.dest = this.dest + '/dalek.json';
    }

    this.events.emit('report:written', {type: 'json', dest: this.dest});
    this._recursiveMakeDirSync(path.dirname(this.dest.replace(path.basename(this.dest, ''))));
    fs.writeFileSync(this.dest, contents, 'utf8');
    return this;
  },

   /**
    * Generates JSON for a message.log
    *
    * @method assertion
    * @param {object} data Event data
    * @chainable
    */

  messageLog: function(data) {
    var logData = {
      kind: 'message',
      message: data
    };
    this.actionQueue.push(logData);
    return this;
  },

  /**
   * Generates JSON for a screenshot
   *
   * @method assertion
   * @param {object} data Event data
   * @chainable
   */

  screenshot : function(data) {
    data.kind = 'screenshot';
    this.actionQueue.push(data);
    return this;
  },


  /**
   * Helper method to generate deeper nested directory structures
   *
   * @method _recursiveMakeDirSync
   * @param {string} path PAth to create
   */

  _recursiveMakeDirSync: function (path) {
    var pathSep = require('path').sep;
    var dirs = path.split(pathSep);
    var root = '';

    while (dirs.length > 0) {
      var dir = dirs.shift();
      if (dir === '') {
        root = pathSep;
      }
      if (!fs.existsSync(root + dir)) {
        fs.mkdirSync(root + dir);
      }
      root += dir + pathSep;
    }
  }
};
