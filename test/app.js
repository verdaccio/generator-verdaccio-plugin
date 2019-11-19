'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-verdaccio-plugin:app', function() {
  before(function() {
    return helpers
      .run(path.join(__dirname, '../generators/app/templates/javascript/auth'))
      .withPrompts({
        name: 'verdaccio-plugin-auth-custom',
        description: 'test',
        githubUsername: 'verdaccio'
      })
      .toPromise();
  });

  it('creates files', function() {
    assert.file(['README.md']);
  });
});
