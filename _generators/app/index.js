'use strict';
const chalk = require('chalk');
const _ = require('lodash');
const node_path = require('node:path');
const Generator = require('yeoman-generator');
const yosay = require('yosay');
class PluginGenerator extends Generator {
  props = {};
  projectName = 'verdaccio-';
  destinationPathName = '';
  constructor(args, opts) {
    super(args, opts);
  }
  async prompting() {
    this.log(yosay(`Welcome to ${chalk.red('generator-verdaccio-plugin')} plugin generator!`));
    const answers = await this.prompt([
      {
        type: 'list',
        name: 'pluginType',
        message: 'What kind of plugin do you want to create?',
        choices: [
          {name: 'Auth', value: 'auth'},
          {name: 'Storage', value: 'storage'},
          {name: 'Middleware', value: 'middleware'},
        ],
      },
      {
        type: 'input',
        name: 'name',
        message: 'What\'s the plugin name? The prefix (verdaccio-xxx) will be added automatically',
        default: 'customname',
        validate: (input) => {
          if (!input) {
            return 'Name cannot be empty';
          }
          if (input.startsWith('verdaccio-')) {
            return 'Do not include the verdaccio- prefix';
          }
          return true;
        },
      },
      {
        type: 'input',
        name: 'description',
        message: 'Please, describe your plugin',
        default: 'An amazing verdaccio plugin',
      },
      {
        type: 'input',
        name: 'githubUsername',
        message: 'GitHub username or Organization',
        validate: (input) => Boolean(input) || 'GitHub username is required',
      },
      {
        type: 'input',
        name: 'authorName',
        message: 'Author\'s Name',
        store: true,
      },
      {
        type: 'input',
        name: 'authorEmail',
        message: 'Author\'s Email',
        store: true,
      },
      {
        type: 'input',
        name: 'keywords',
        message: 'Type your keywords (comma separated)',
        filter: (keywords) => _.uniq(_.words(keywords).concat(['verdaccio'])),
      },
    ]);
    this.props = {
      ...answers,
      license: 'MIT',
    };
    this.projectName = `verdaccio-${answers.name}`;
    this.destinationPathName = node_path.resolve(this.projectName);
    this.props.name = this.projectName;
    if (answers.githubUsername) {
      this.props.repository = `${answers.githubUsername}/${answers.name}`;
    }
  }
  packageJSON() {
    const {pluginType} = this.props;
    if (!pluginType) {
      this.log.error('pluginType is required');
      return;
    }
    this.fs.copyTpl(
        this.templatePath(`${pluginType}/_package.json`),
        this.destinationPath(node_path.resolve(this.destinationPathName, 'package.json')),
        this.props,
    );
  }
  writing() {
    const dest = (path) => this.destinationPath(node_path.resolve(this.destinationPathName, path));
    this.fs.copy(this.templatePath('common/gitignore'), dest('.gitignore'));
    this.fs.copy(this.templatePath('common/npmignore'), dest('.npmignore'));
    this.fs.copy(this.templatePath('common/jest.config.js'), dest('jest.config.js'));
    this.fs.copyTpl(this.templatePath('common/README.md'), dest('README.md'), this.props);
    this.fs.copyTpl(this.templatePath('common/eslintrc'), dest('.eslintrc'), this.props);
    this.fs.copyTpl(this.templatePath('common/eslintignore'), dest('.eslintignore'), this.props);
    this.fs.copy(this.templatePath(`${this.props.pluginType}/src`), dest('src'));
    this.fs.copy(this.templatePath('common/index.js'), dest('index.js'));
    this.fs.copy(this.templatePath('common/tsconfig.json'), dest('tsconfig.json'));
    this.fs.copy(this.templatePath(`${this.props.pluginType}/types`), dest('types'));
    this.fs.copy(this.templatePath('common/editorconfig'), dest('.editorconfig'));
  }
  install() {
    this.destinationRoot(this.projectName);
  }
}
module.exports = PluginGenerator;
