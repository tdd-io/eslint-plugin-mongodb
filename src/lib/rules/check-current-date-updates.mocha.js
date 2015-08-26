'use strict';

var linter = require('eslint').linter;
var RuleTester = require('eslint').RuleTester;
var rule = require('./check-current-date-updates');

var ruleTester = new RuleTester(linter);

ruleTester.run('check-current-date-updates', rule, {
  valid: [
    "db.collection('users').update({}, { $currentDate: true });",
    "mongoClient.db.collection('users').update({}, { $currentDate: { $type: 'timestamp' } });",
    "mongoClient.db.collection('users').update({}, { $currentDate: { $type: 'date' } });",
    "mongoClient.db.collection('users').update({}, { $currentDate: !mybool });",
  ],
  invalid: [{
    code: "db.collection('users').update({}, { $currentDate: 'true' });",
    errors: [{
      message: 'Expected $currentDate operator value to be a boolean or an object.',
    }],
  }, {
    code: "mongoClient.db.collection('users').update({}, { $currentDate: { $type: 'date',  type: '1664' } });",
    errors: [{
      message: '$currentDate operator should only have a $type modifier (found: type).',
    }],
  }, {
    code: "mongoClient.db.collection('users').update({}, { $currentDate: { $type: '1664' } });",
    errors: [{
      message: '$currentDate operator $type modifier value can be only "date" or "timestamp" (got: 1664).',
    }],
  }],
});
