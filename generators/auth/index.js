'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var _ = require('lodash');
var yosay = require('yosay');

module.exports = class extends Generator {

	initializing() {
		this.pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
		this.props = {};
	}

	prompting() {
		// Have Yeoman greet the user.
		this.log(yosay(
			'Welcome to ' + chalk.red('generator-verdaccio-plugin') + ' auth plugin generator!'
		));

		var prompts = [{
			type: 'input',
			name: 'name',
			require: true,
			message: 'What is the name of your plugin?',
			default: 'verdaccio-plugin-auth-custom',
			validate: function (input) {
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
			validate: function (input) {
				return input !== '';
			}
		},
		{
			name: 'authorName',
			message: 'Author\'s Name',
			store: true
		}, {
			name: 'authorEmail',
			message: 'Author\'s Email',
			store: true
		},
		{
			name: 'keywords',
			message: 'Key your keywords (comma to split)',
			filter: function (keywords) {
				return _.uniq(_.words(keywords).concat(['verdaccio-plugin']));
			}
		}
		];

		return this.prompt(prompts).then(function (props) {
			// To access props later use this.props.someAnswer;
			this.props = props;
			this.props.license = '';
			if (props.githubUsername) {
				this.props.repository = props.githubUsername + '/' + this.props.name;
			}
		}.bind(this));
	}

	packageJSON() {
		this.fs.copyTpl(
			this.templatePath('_package.json'),
			this.destinationPath('package.json'),
			this.props
		);
	}

	writing() {
		this.fs.copy(
			this.templatePath('gitignore'),
			this.destinationPath('.gitignore')
		);
		this.fs.copy(
			this.templatePath('npmignore'),
			this.destinationPath('.npmignore')
		);
		this.fs.copy(
			this.templatePath('babelrc'),
			this.destinationPath('.babelrc')
		);
		this.fs.copy(
			this.templatePath('travis.yml'),
			this.destinationPath('.travis.yml')
		);
		this.fs.copy(
			this.templatePath('travis.yml'),
			this.destinationPath('.travis.yml')
		);
		this.fs.copyTpl(
			this.templatePath('README.md'),
			this.destinationPath('README.md'),
			this.props
		);
		this.fs.copyTpl(
			this.templatePath('eslintrc'),
			this.destinationPath('.eslintrc'),
			this.props
		);
		this.fs.copyTpl(
			this.templatePath('eslintignore'),
			this.destinationPath('.eslintignore'),
			this.props
		);
		this.fs.copy(
			this.templatePath('src/index.js'),
			this.destinationPath('src/index.js'),
			this.props
		);
		this.fs.copy(
			this.templatePath('index.js'),
			this.destinationPath('index.js'),
			this.props
		);
		this.fs.copy(
			this.templatePath('editorconfig'),
			this.destinationPath('.editorconfig'),
			this.props
		);
	}

	install() {
		this.installDependencies({npm: true, bower: false});
	}
};
