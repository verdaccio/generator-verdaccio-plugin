const path = require('path');
const os = require('os');
const fs = require('fs');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const constants = require('./constants');

describe('template generator', function() {
  const name = 'test';
  const  description = 'An amazing verdaccio plugin';
  const  githubUsername = 'testing';
  const  authorName = 'test';
  const  authorEmail = 'test';
  const  keywords = ['verdaccio, plugin, typescript'];
  const  license = 'MIT';
  const  repository = 'verdaccio/generator-test';
  const getBuildAsset = (tempRoot, pluginType, item) => {
    const prefixPath = path.join(tempRoot, `/verdaccio-${name}`);
    return `${prefixPath}/${item}`;
  }

  describe('generate app', function() {
    const tempRoot = fs.mkdtempSync(path.join(fs.realpathSync(os.tmpdir()), 'generator-app'));

    describe('typescript', function() {
      const  lang = 'typescript';

      it('should check storage files', function(done) {
        pluginType = 'storage';
        helpers.run(path.join(__dirname, '../generators/app')).inDir(tempRoot).withPrompts({
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
              ...constants.map(item => getBuildAsset(tempRoot, pluginType, item)),
              getBuildAsset(tempRoot, pluginType, '/index.ts'),
              getBuildAsset(tempRoot, pluginType, '/types/index.ts'),
              getBuildAsset(tempRoot, pluginType, '/tsconfig.json'),
              getBuildAsset(tempRoot, pluginType, '/src/index.ts'),
              getBuildAsset(tempRoot, pluginType, '/src/plugin.ts'),
              getBuildAsset(tempRoot, pluginType, '/src/PackageStorage.ts'),
            ])
            done();
          });
      });

      it('should check auth files', function(done) {
        pluginType = 'auth';
        helpers.run(path.join(__dirname, '../generators/app')).inDir(tempRoot).withPrompts({
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
              ...constants.map(item => getBuildAsset(tempRoot, pluginType, item)),
              getBuildAsset(tempRoot, pluginType, '/src/index.ts'),
              getBuildAsset(tempRoot, pluginType, '/index.ts'),
              getBuildAsset(tempRoot, pluginType, '/types/index.ts'),
              getBuildAsset(tempRoot, pluginType, '/tsconfig.json'),
            ])
            done();
          });
      });

      it('should check middleware files', function(done) {
        pluginType = 'middleware';
        helpers.run(path.join(__dirname, '../generators/app')).inDir(tempRoot).withPrompts({
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
              ...constants.map(item => getBuildAsset(tempRoot, pluginType, item)),
              getBuildAsset(tempRoot, pluginType, '/src/index.ts'),
              getBuildAsset(tempRoot, pluginType, '/index.ts'),
              getBuildAsset(tempRoot, pluginType, '/types/index.ts'),
              getBuildAsset(tempRoot, pluginType, '/tsconfig.json'),
            ])
            done();
          });
      });
    });

    describe('javascript', function() {
      const  lang = 'javascript';
      let pluginType;

      it('should check storage files', function(done) {
        pluginType = 'storage';
        helpers.run(path.join(__dirname, '../generators/app')).inDir(tempRoot).withPrompts({
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
              ...constants.map(item => getBuildAsset(tempRoot, pluginType, item)),
              getBuildAsset(tempRoot, pluginType, '/src/index.js'),
              getBuildAsset(tempRoot, pluginType, '/index.js'),
              getBuildAsset(tempRoot, pluginType, '/src/plugin.js'),
              getBuildAsset(tempRoot, pluginType, '/src/PackageStorage.js'),
            ])
            done();
          });
      });

      it('should check auth files', function(done) {
        pluginType = 'auth';
        helpers.run(path.join(__dirname, '../generators/app')).inDir(tempRoot).withPrompts({
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
              ...constants.map(item => getBuildAsset(tempRoot, pluginType, item)),
              getBuildAsset(tempRoot, pluginType, '/src/index.js'),
              getBuildAsset(tempRoot, pluginType, '/index.js'),
            ])
            done();
          });
      });


      it('should check middleware files', function(done) {
        pluginType = 'middleware';
        helpers.run(path.join(__dirname, '../generators/app')).inDir(tempRoot).withPrompts({
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
              ...constants.map(item => getBuildAsset(tempRoot, pluginType, item)),
              getBuildAsset(tempRoot, pluginType, '/src/index.js'),
              getBuildAsset(tempRoot, pluginType, '/index.js'),
            ])
            done();
          });
      });
    });
  });
});
