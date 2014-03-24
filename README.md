dalek-reporter-json
===================

> DalekJS reporter plugin for JSON output

[![Build Status](https://travis-ci.org/dalekjs/dalek-reporter-json.png)](https://travis-ci.org/dalekjs/dalek-reporter-json)
[![Build Status](https://drone.io/github.com/dalekjs/dalek-reporter-json/status.png)](https://drone.io/github.com/dalekjs/dalek-reporter-json/latest)
[![Dependency Status](https://david-dm.org/dalekjs/dalek-reporter-json.png)](https://david-dm.org/dalekjs/dalek-reporter-json)
[![devDependency Status](https://david-dm.org/dalekjs/dalek-reporter-json/dev-status.png)](https://david-dm.org/dalekjs/dalek-reporter-json#info=devDependencies)
[![NPM version](https://badge.fury.io/js/dalek-reporter-json.png)](http://badge.fury.io/js/dalek-reporter-json)
[![Coverage](http://dalekjs.com/package/dalek-reporter-json/master/coverage/coverage.png)](http://dalekjs.com/package/dalek-reporter-json/master/coverage/index.html)
[![unstable](https://rawgithub.com/hughsk/stability-badges/master/dist/unstable.svg)](http://github.com/hughsk/stability-badges)
[![Stories in Ready](https://badge.waffle.io/dalekjs/dalek.png?label=ready)](https://waffle.io/dalekjs/dalek-reporter-json)
[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/dalekjs/dalek-reporter-json/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

[![NPM](https://nodei.co/npm/dalek-reporter-json.png)](https://nodei.co/npm/dalek-reporter-json/)
[![NPM](https://nodei.co/npm-dl/dalek-reporter-json.png)](https://nodei.co/npm/dalek-reporter-json/)

## Ressources

[API Docs](http://dalekjs.com/package/dalek-reporter-json/master/api/index.html) -
[Trello](https://trello.com/b/wpindMWl/dalek-reporter-json) -
[Code coverage](http://dalekjs.com/package/dalek-reporter-json/master/coverage/index.html) -
[Code complexity](http://dalekjs.com/package/dalek-reporter-json/master/complexity/index.html) -
[Contributing](https://github.com/dalekjs/dalek-reporter-json/blob/master/CONTRIBUTING.md) -
[User Docs](http://dalekjs.com/docs/json.html) -
[Homepage](http://dalekjs.com) -
[Twitter](http://twitter.com/dalekjs)

## Docs

The JSON reporter can produce a file with the results of your testrun.

The reporter can be installed with the following command:
```
$ npm install dalek-reporter-json --save-dev
```

The file will follow the following format. This is a first draft and will
definitly change in future versions.

```javascript
{
  "tests": [
        {
          "id": "test806",
          "name": "Can get !url (OK, TDD style, message, chained)",
          "browser": "Chrome",
          "status": true,
          "passedAssertions": 1,
          "failedAssertions": 0,
          "actions": [
              {
                  "value": "http://localhost:5000/index.html",
                  "type": "open",
                  "uuid": "6ea84fc0-58bf-4e1f-bb9c-f035c6e6fae2",
                  "kind": "action",
                  "isAction": true
              },
              {
                  "success": true,
                  "expected": "http://localhost:5000/guinea.html",
                  "value": "http://localhost:5000/index.html",
                  "message": "Url is not whatever",
                  "type": "url",
                  "kind": "assertion",
                  "isAssertion": true
              }
          ]
      }
  ],
  "elapsedTime": {
      "minutes": 1,
      "seconds": 43.328535046
  },
  "status": true,
  "assertions": 1,
  "assertionsFailed": 0,
  "assertionsPassed": 1
}
```

By default the file will be written to `report/dalek.json`,
you can change this by adding a config option to the your Dalekfile

```javascript
"json-reporter": {
  "dest": "your/folder/your_file.json"
}
```

## Help Is Just A Click Away

### #dalekjs on FreeNode.net IRC

Join the `#daleksjs` channel on [FreeNode.net](http://freenode.net) to ask questions and get help.

### [Google Group Mailing List](https://groups.google.com/forum/#!forum/dalekjs)

Get announcements for new releases, share your projects and ideas that are
using DalekJS, and join in open-ended discussion that does not fit in
to the Github issues list or StackOverflow Q&A.

**For help with syntax, specific questions on how to implement a feature
using DalekJS, and other Q&A items, use StackOverflow.**

### [StackOverflow](http://stackoverflow.com/questions/tagged/dalekjs)

Ask questions about using DalekJS in specific scenarios, with
specific features. For example, help with syntax, understanding how a feature works and
how to override that feature, browser specific problems and so on.

Questions on StackOverflow often turn in to blog posts or issues.

### [Github Issues](//github.com/dalekjs/dalek-reporter-json/issues)

Report issues with DalekJS, submit pull requests to fix problems, or to
create summarized and documented feature requests (preferably with pull
requests that implement the feature).

**Please don't ask questions or seek help in the issues list.** There are
other, better channels for seeking assistance, like StackOverflow and the
Google Groups mailing list.

![DalekJS](https://raw.github.com/dalekjs/dalekjs.com/master/img/logo.png)

## Legal FooBar (MIT License)

Copyright (c) 2013 Sebastian Golasch

Distributed under [MIT license](https://github.com/dalekjs/dalek-reporter-json/blob/master/LICENSE-MIT)