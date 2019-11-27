const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const rimraf = require('rimraf');

describe('generator-verdaccio-plugin app', function() {
  var name = 'test',
    lang = 'javascript',
    pluginType = 'storage',
    description = 'An amazing verdaccio plugin',
    githubUsername = 'testing',
    authorName = 'test',
    authorEmail = 'test',
    keywords = ['verdaccio-plugin'],
    license = 'MIT',
    repository = 'verdaccio/generator-test';

  before(function() {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .inDir(path.join(__dirname, 'tmp'))
      .withPrompts({
        name,
        lang,
        pluginType,
        description,
        githubUsername,
        authorName,
        authorEmail,
        keywords,
        license,
        repository
      })
      .toPromise();
  });

  it('creates files', function(done) {
    assert.file([
      path.join(
        __dirname,
        `tmp/verdaccio-plugin-${pluginType}-${name}/src/index.js`
      ),
      path.join(
        __dirname,
        `tmp/verdaccio-plugin-${pluginType}-${name}/src/storageManager.js`
      ),
      path.join(
        __dirname,
        `tmp/verdaccio-plugin-${pluginType}-${name}/index.js`
      )
    ])


    done();
  });

  after(function() {
    rimraf.sync(path.join(__dirname, 'tmp'));
  });
});
