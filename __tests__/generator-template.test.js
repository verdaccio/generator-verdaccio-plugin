const path = require('path');
const os = require('os');
const fs = require('fs');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const constants = require('../helpers/constants');

describe('template generator', function() {
  // jest.setTimeout(10000);
  const name = 'test';
  const description = 'An amazing verdaccio plugin';
  const githubUsername = 'testing';
  const authorName = 'test';
  const authorEmail = 'test';
  const keywords = ['verdaccio, plugin, typescript'];
  const license = 'MIT';
  const repository = 'verdaccio/generator-test';
  const getBuildAsset = (tempRoot, item) => {
    const prefixPath = path.join(tempRoot, `/verdaccio-${name}`);
    return `${prefixPath}/${item}`;
  };

  describe('generate app', function() {
    const tempRoot = fs.mkdtempSync(path.join(fs.realpathSync(os.tmpdir()), 'generator-app'));

    describe('typescript', function() {
      const lang = 'typescript';

      test('should check storage files', function(done) {
        helpers.run(path.join(__dirname, '../src/app')).inDir(tempRoot).withPrompts({
          name,
          lang,
          pluginType: 'storage',
          description,
          githubUsername,
          authorName,
          authorEmail,
          keywords,
          license,
          repository,
        }).then(function() {
          assert.file([
            ...constants.map((item) => getBuildAsset(tempRoot, item)),
            getBuildAsset(tempRoot, '/index.js'),
            getBuildAsset(tempRoot, '/types/index.ts'),
            getBuildAsset(tempRoot, '/tsconfig.json'),
            getBuildAsset(tempRoot, '/src/index.ts'),
            getBuildAsset(tempRoot, '/src/plugin.ts'),
            getBuildAsset(tempRoot, '/src/PackageStorage.ts'),
          ]);
          done();
        });
      });

      test('should check auth files', function(done) {
        helpers.run(path.join(__dirname, '../src/app')).inDir(tempRoot).withPrompts({
          name,
          lang,
          pluginType: 'auth',
          description,
          githubUsername,
          authorName,
          authorEmail,
          keywords,
          license,
          repository,
        }).then(function() {
          assert.file([
            ...constants.map((item) => getBuildAsset(tempRoot, item)),
            getBuildAsset(tempRoot, '/src/index.ts'),
            getBuildAsset(tempRoot, '/index.js'),
            getBuildAsset(tempRoot, '/types/index.ts'),
            getBuildAsset(tempRoot, '/tsconfig.json'),
          ]);
          done();
        });
      });

      test('should check middleware files', function(done) {
        helpers.run(path.join(__dirname, '../src/app')).inDir(tempRoot).withPrompts({
          name,
          lang,
          pluginType: 'middleware',
          description,
          githubUsername,
          authorName,
          authorEmail,
          keywords,
          license,
          repository,
        }).then(function() {
          assert.file([
            ...constants.map((item) => getBuildAsset(tempRoot, item)),
            getBuildAsset(tempRoot, '/src/index.ts'),
            getBuildAsset(tempRoot, '/index.js'),
            getBuildAsset(tempRoot, '/types/index.ts'),
            getBuildAsset(tempRoot, '/tsconfig.json'),
          ]);
          done();
        });
      });
    });
  });
});
