const path = require('path');
const os = require('os');
const fs = require('fs');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-verdaccio-plugin app', function() {
  const name = 'test';
  const  lang = 'javascript';
  const  pluginType = 'storage';
  const   description = 'An amazing verdaccio plugin';
  const  githubUsername = 'testing';
  const  authorName = 'test';
  const  authorEmail = 'test';
  const  keywords = ['verdaccio-plugin'];
  const  license = 'MIT';
  const  repository = 'verdaccio/generator-test';

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
