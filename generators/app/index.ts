import { resolve } from "path";

import Generator from "yeoman-generator";
import chalk from "chalk";
import _ from "lodash";

import { propsTypes } from "./types";

const yosay = require("yosay");

export default class VerdaccioPluginGenerator extends Generator {
  private props: propsTypes;
  private projectName: string = "verdaccio-plugin";
  private destinationPathName: string = "verdaccio-plugin";
  constructor(args, opts) {
    super(args, opts);
    this.props = {};
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        "Welcome to " +
          chalk.red("generator-verdaccio-plugin") +
          " plugin generator!"
      )
    );

    const prompts = [
      {
        type: "input",
        name: "name",
        require: true,
        message: "What is the name of your plugin?",
        default: "customname",
        validate: function(input) {
          return input !== "";
        }
      },
      {
        type: "list",
        name: "lang",
        require: true,
        message: "Select Language",
        default: "typescript",
        store: true,
        choices: [{ value: "typescript" }, { value: "javascript" }]
      },
      {
        type: "list",
        name: "pluginType",
        require: true,
        message: "What kind of plugin you want to create?",
        store: true,
        choices: [
          { value: "auth" },
          { value: "storage" },
          { value: "middleware" }
        ]
      },
      {
        type: "input",
        name: "description",
        message: "Please, describe your plugin",
        default: "An amazing verdaccio plugin"
      },
      {
        name: "githubUsername",
        message: "GitHub username or organization",
        validate: function(input) {
          return input !== "";
        }
      },
      {
        name: "authorName",
        message: "Author's Name",
        store: true
      },
      {
        name: "authorEmail",
        message: "Author's Email",
        store: true
      },
      {
        name: "keywords",
        message: "Key your keywords (comma to split)",
        filter: function(keywords) {
          return _.uniq(_.words(keywords).concat(["verdaccio-plugin"]));
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
        this.props.license = "MIT";
        if (githubUsername) {
          // @ts-ignore
          this.props.repository = githubUsername + "/" + name;
        }

        // @ts-ignore
        this.projectName = `verdaccio-plugin-${pluginType}-${name}`;

        // @ts-ignore
        this.destinationPathName = resolve(this.projectName);
        // @ts-ignore
        this.props.name = this.projectName;
      }.bind(this)
    );
  }

  packageJSON() {
    const { lang, pluginType } = this.props;
    const pkgJsonLocation = `${lang}/${pluginType}/_package.json`;
    this.fs.copyTpl(
      this.templatePath(pkgJsonLocation),
      this.destinationPath(resolve(this.destinationPathName, "package.json")),
      this.props
    );
  }

  writing() {
    const { lang } = this.props;
    this.fs.copy(
      this.templatePath(`${lang}/common/gitignore`),
      this.destinationPath(resolve(this.destinationPathName, ".gitignore"))
    );
    this.fs.copy(
      this.templatePath(`${lang}/common/npmignore`),
      this.destinationPath(resolve(this.destinationPathName, ".npmignore"))
    );
    this.fs.copy(
      this.templatePath(`${lang}/common/jest.config.js`),
      this.destinationPath(resolve(this.destinationPathName, "jest.config.js"))
    );
    this.fs.copy(
      this.templatePath(`${lang}/common/babelrc`),
      this.destinationPath(resolve(this.destinationPathName, ".babelrc"))
    );
    this.fs.copy(
      this.templatePath(`${lang}/common/travis.yml`),
      this.destinationPath(resolve(this.destinationPathName, ".travis.yml"))
    );
    this.fs.copy(
      this.templatePath(`${lang}/common/travis.yml`),
      this.destinationPath(resolve(this.destinationPathName, ".travis.yml"))
    );
    this.fs.copyTpl(
      this.templatePath(`${lang}/common/README.md`),
      this.destinationPath(resolve(this.destinationPathName, "README.md")),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath(`${lang}/common/eslintrc`),
      this.destinationPath(resolve(this.destinationPathName, ".eslintrc")),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath(`${lang}/common/eslintignore`),
      this.destinationPath(resolve(this.destinationPathName, ".eslintignore")),
      this.props
    );

    this.fs.copy(
      this.templatePath(`${lang}/${this.props.pluginType}/src`),
      this.destinationPath(resolve(this.destinationPathName, "src")),
      this.props
    );

    this.fs.copy(
      this.templatePath(
        `${lang}/common/index.${lang == "typescript" ? "ts" : "js"}`
      ),
      this.destinationPath(
        resolve(
          this.destinationPathName,
          `index.${lang == "typescript" ? "ts" : "js"}`
        )
      ),
      this.props
    );

    if (lang == "typescript") {
      this.fs.copy(
        this.templatePath(`${lang}/common/tsconfig.json`),
        this.destinationPath(
          resolve(this.destinationPathName, "tsconfig.json")
        ),
        this.props
      );
      this.fs.copy(
        this.templatePath(`${lang}/${this.props.pluginType}/types`),
        this.destinationPath(resolve(this.destinationPathName, "types")),
        this.props
      );
    }

    this.fs.copy(
      this.templatePath(`${lang}/common/editorconfig`),
      this.destinationPath(resolve(this.destinationPathName, ".editorconfig")),
      this.props
    );
  }

  install() {
    process.chdir(this.projectName);
    this.installDependencies({ npm: true, bower: false });
  }
}
