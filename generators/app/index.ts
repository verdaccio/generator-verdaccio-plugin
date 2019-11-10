import Generator from 'yeoman-generator';
import chalk from 'chalk';
import * as _ from 'lodash';
import { resolve } from 'path';
var yosay = require('yosay');

import { propsTypes } from './types';

export default class VerdaccioPluginGenerator extends Generator {
  private pkg: any;
  private props: propsTypes;
  private projectName: string = 'verdaccio-plugin';
  private destinationPathName: string = 'verdaccio-plugin';
  constructor(args, opts) {
    super(args, opts);
    this.props = {};
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        'Welcome to ' +
          chalk.red('generator-verdaccio-plugin') +
          ' plugin generator!'
      )
    );

    var prompts = [
      {
        type: 'input',
        name: 'name',
        require: true,
        message: 'What is the name of your plugin?',
        default: 'customname',
        validate: function(input) {
          return input !== '';
        }
      },
      {
        type: 'list',
        name: 'pluginType',
        require: true,
        message: 'What kind of plugin you want to create?',
        store: true,
        choices: [
          { value: 'auth' },
          { value: 'storage' },
          { value: 'middleware' }
        ]
      },
      {
        type: 'input',
        name: 'description',
        message: 'Please, describe your plugin',
        default: 'An amazing verdaccio plugin'
      },
      {
        name: 'githubUsername',
        message: 'GitHub username or organization',
        validate: function(input) {
          return input !== '';
        }
      },
      {
        name: 'authorName',
        message: "Author's Name",
        store: true
      },
      {
        name: 'authorEmail',
        message: "Author's Email",
        store: true
      },
      {
        name: 'keywords',
        message: 'Key your keywords (comma to split)',
        filter: function(keywords) {
          return _.uniq(_.words(keywords).concat(['verdaccio-plugin']));
        }
      }
    ];

    return this.prompt(prompts).then(
      function(_props) {
        // To access props later use this.props.someAnswer;
        // @ts-ignore
        this.props = _props;
        const { name, pluginType, githubUsername } = _props;
        // @ts-ignore
        this.props.license = '';

        if (githubUsername) {
          // @ts-ignore
          this.props.repository = githubUsername + '/' + name;
        }

        // @ts-ignore
        this.projectName = `verdaccio-plugin-${pluginType}-${name}`;

        // @ts-ignore
        this.destinationPathName = resolve(this.projectName);
      }.bind(this)
    );
  }

  packageJSON() {
    this.fs.copyTpl(
      this.templatePath('common/_package.json'),
      this.destinationPath(resolve(this.destinationPathName, 'package.json')),
      this.props
    );
  }

  writing() {
    this.fs.copy(
      this.templatePath('common/gitignore'),
      this.destinationPath(resolve(this.destinationPathName, '.gitignore'))
    );
    this.fs.copy(
      this.templatePath('common/npmignore'),
      this.destinationPath(resolve(this.destinationPathName, '.npmignore'))
    );
    this.fs.copy(
      this.templatePath('common/babelrc'),
      this.destinationPath(resolve(this.destinationPathName, '.babelrc'))
    );
    this.fs.copy(
      this.templatePath('common/travis.yml'),
      this.destinationPath(resolve(this.destinationPathName, '.travis.yml'))
    );
    this.fs.copy(
      this.templatePath('common/travis.yml'),
      this.destinationPath(resolve(this.destinationPathName, '.travis.yml'))
    );
    this.fs.copyTpl(
      this.templatePath('common/README.md'),
      this.destinationPath(resolve(this.destinationPathName, 'README.md')),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('common/eslintrc'),
      this.destinationPath(resolve(this.destinationPathName, '.eslintrc')),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('common/eslintignore'),
      this.destinationPath(resolve(this.destinationPathName, '.eslintignore')),
      this.props
    );
    this.fs.copy(
      this.templatePath(`${this.props.pluginType}/src/index.js`),
      this.destinationPath(resolve(this.destinationPathName, 'src/index.js')),
      this.props
    );
    this.fs.copy(
      this.templatePath('common/index.js'),
      this.destinationPath(resolve(this.destinationPathName, 'index.js')),
      this.props
    );
    this.fs.copy(
      this.templatePath('common/editorconfig'),
      this.destinationPath(resolve(this.destinationPathName, '.editorconfig')),
      this.props
    );
  }

  install() {
    process.chdir(this.projectName);
    this.installDependencies({ npm: true, bower: false });
  }
}
