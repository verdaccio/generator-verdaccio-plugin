import {resolve} from 'path';

import Generator from 'yeoman-generator';
import chalk from 'chalk';
import _ from 'lodash';

type propsTypes = {
  name?: string;
  pluginType?: string;
  description?: string;
  githubUsername?: string;
  authorName?: string;
  authorEmail?: string;
  keywords?: string[];
};

const yosay = require('yosay');

class VerdaccioPluginGenerator extends Generator {
  private props: propsTypes;
  private projectName = 'verdaccio-';
  private destinationPathName = 'verdaccio-';
  constructor(args, opts) {
    super(args, opts);
    this.props = {};
  }

  prompting() {
    this.log(
        yosay(
            'Welcome to ' +
          chalk.red('generator-verdaccio-plugin') +
          ' plugin generator!',
        ),
    );

    const prompts = [
      {
        type: 'input',
        name: 'name',
        require: true,
        message: 'What is the name of your plugin?',
        default: 'customname',
        validate: function(input) {
          return input !== '';
        },
      },
      {
        type: 'list',
        name: 'pluginType',
        require: true,
        message: 'What kind of plugin you want to create?',
        store: true,
        choices: [
          {value: 'auth'},
          {value: 'storage'},
          {value: 'middleware'},
        ],
      },
      {
        type: 'input',
        name: 'description',
        message: 'Please, describe your plugin',
        default: 'An amazing verdaccio plugin',
      },
      {
        name: 'githubUsername',
        message: 'GitHub username or Organization',
        validate: function(input) {
          return input !== '';
        },
      },
      {
        name: 'authorName',
        message: 'Author\'s Name',
        store: true,
      },
      {
        name: 'authorEmail',
        message: 'Author\'s Email',
        store: true,
      },
      {
        name: 'keywords',
        message: 'Key your keywords (comma to split)',
        filter: function(keywords) {
          return _.uniq(_.words(keywords).concat(['verdaccio-']));
        },
      },
    ];

    return this.prompt(prompts).then(
        function(_props) {
        // To access props later use this.props.someAnswer;
        // @ts-ignore
          this.props = _props;
          const {name, githubUsername} = _props;
          // @ts-ignore
          this.props.license = 'MIT';
          if (githubUsername) {
          // @ts-ignore
            this.props.repository = githubUsername + '/' + name;
          }

          // @ts-ignore
          this.projectName = `verdaccio-${name}`;

          // @ts-ignore
          this.destinationPathName = resolve(this.projectName);
          // @ts-ignore
          this.props.name = this.projectName;
        }.bind(this),
    );
  }

  packageJSON() {
    const {pluginType} = this.props;
    const pkgJsonLocation = `typescript/${pluginType}/_package.json`;
    this.fs.copyTpl(
        this.templatePath(pkgJsonLocation),
        this.destinationPath(resolve(this.destinationPathName, 'package.json')),
        this.props,
    );
  }

  writing() {
    this.fs.copy(
        this.templatePath(`typescript/common/gitignore`),
        this.destinationPath(resolve(this.destinationPathName, '.gitignore')),
    );
    this.fs.copy(
        this.templatePath(`typescript/common/npmignore`),
        this.destinationPath(resolve(this.destinationPathName, '.npmignore')),
    );
    this.fs.copy(
        this.templatePath(`typescript/common/jest.config.js`),
        this.destinationPath(resolve(this.destinationPathName, 'jest.config.js')),
    );
    this.fs.copyTpl(
        this.templatePath(`typescript/common/README.md`),
        this.destinationPath(resolve(this.destinationPathName, 'README.md')),
        this.props,
    );
    this.fs.copyTpl(
        this.templatePath(`typescript/common/eslintrc`),
        this.destinationPath(resolve(this.destinationPathName, '.eslintrc')),
        this.props,
    );
    this.fs.copyTpl(
        this.templatePath(`typescript/common/eslintignore`),
        this.destinationPath(resolve(this.destinationPathName, '.eslintignore')),
        this.props,
    );

    this.fs.copy(
        this.templatePath(`typescript/${this.props.pluginType}/src`),
        this.destinationPath(resolve(this.destinationPathName, 'src')),
    );

    this.fs.copy(
        this.templatePath(
            `typescript/common/index.js`,
        ),
        this.destinationPath(
            resolve(
                this.destinationPathName,
                `index.js`,
            ),
        ),
    );

    this.fs.copy(
        this.templatePath(`typescript/common/tsconfig.json`),
        this.destinationPath(
            resolve(this.destinationPathName, 'tsconfig.json'),
        ),
    );
    this.fs.copy(
        this.templatePath(`typescript/${this.props.pluginType}/types`),
        this.destinationPath(resolve(this.destinationPathName, 'types')),
    );

    this.fs.copy(
        this.templatePath(`typescript/common/editorconfig`),
        this.destinationPath(resolve(this.destinationPathName, '.editorconfig')),
    );
  }

  install() {
    process.chdir(this.projectName);
    // this.installDependencies({ npm: true, bower: false });
  }
}

module.exports = VerdaccioPluginGenerator;
