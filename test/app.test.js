const path = require('path');
const os = require('os');
const fs = require('fs');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

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
  let tempRoot;
  before(function() {
    tempRoot = fs.mkdtempSync(path.join(fs.realpathSync(os.tmpdir()), 'generator-test'));
  });

  it('creates files', function(done) {
    helpers
      .run(path.join(__dirname, '../generators/app'))
      .inDir(tempRoot)
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
      }).then(function() {
        assert.file([
          path.join(
            tempRoot,
            `/verdaccio-plugin-${pluginType}-${name}/src/index.js`
          ),
          path.join(
            tempRoot,
            `/verdaccio-plugin-${pluginType}-${name}/src/storageManager.js`
          ),
          path.join(
            tempRoot,
            `/verdaccio-plugin-${pluginType}-${name}/index.js`
          )
        ])
        done();
      });
  });
});
