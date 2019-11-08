import Generator from 'yeoman-generator';
import chalk from 'chalk';
import * as _ from 'lodash';
var yosay = require('yosay');

export default class VerdaccioPluginGenerator extends Generator {
  private pkg: any;
  private props: object;
  constructor(args, opts) {
    super(args, opts);
    this.pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    this.props = {};
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        'Welcome to ' +
          chalk.red('generator-verdaccio-plugin') +
          ' auth plugin generator!'
      )
    );

    var prompts = [
      {
        type: 'input',
        name: 'name',
        require: true,
        message: 'What is the name of your plugin?',
        default: 'verdaccio-plugin-auth-custom',
        validate: function(input) {
          return input.indexOf('verdaccio-plugin-auth') === 0;
        }
      },
      {
        type: 'input',
        name: 'description',
        message: 'Please, describe your plugin',
        default: 'An amazing verdaccio auth plugin'
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
      function(props) {
        // To access props later use this.props.someAnswer;
        // @ts-ignore
        this.props = props;
        // @ts-ignore
        this.props.license = '';
        if (props.githubUsername) {
          // @ts-ignore
          this.props.repository = props.githubUsername + '/' + this.props.name;
        }
      }.bind(this)
    );
  }

  packageJSON() {
    this.fs.copyTpl(
      this.templatePath('auth/_package.json'),
      this.destinationPath('package.json'),
      this.props
    );
  }

  writing() {
    this.fs.copy(
      this.templatePath('auth/gitignore'),
      this.destinationPath('.gitignore')
    );
    this.fs.copy(
      this.templatePath('auth/npmignore'),
      this.destinationPath('.npmignore')
    );
    this.fs.copy(
      this.templatePath('auth/babelrc'),
      this.destinationPath('.babelrc')
    );
    this.fs.copy(
      this.templatePath('auth/travis.yml'),
      this.destinationPath('.travis.yml')
    );
    this.fs.copy(
      this.templatePath('auth/travis.yml'),
      this.destinationPath('.travis.yml')
    );
    this.fs.copyTpl(
      this.templatePath('auth/README.md'),
      this.destinationPath('README.md'),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('auth/eslintrc'),
      this.destinationPath('.eslintrc'),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('auth/eslintignore'),
      this.destinationPath('.eslintignore'),
      this.props
    );
    this.fs.copy(
      this.templatePath('auth/src/index.js'),
      this.destinationPath('src/index.js'),
      this.props
    );
    this.fs.copy(
      this.templatePath('auth/index.js'),
      this.destinationPath('index.js'),
      this.props
    );
    this.fs.copy(
      this.templatePath('auth/editorconfig'),
      this.destinationPath('.editorconfig'),
      this.props
    );
  }
  destinationPath(arg0: string): any {
    throw new Error('Method not implemented.');
  }

  install() {
    this.installDependencies({ npm: true, bower: false });
  }
}
