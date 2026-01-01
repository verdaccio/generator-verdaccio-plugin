import chalk from 'chalk';
import _ from 'lodash';
import { resolve } from 'node:path';
import Generator from 'yeoman-generator';
import yosay from 'yosay';

import rootPackageJSON from '../../package.json';

interface Props {
  name?: string;
  pluginType?: 'auth' | 'storage' | 'middleware' | 'filter';
  description?: string;
  githubUsername?: string;
  authorName?: string;
  authorEmail?: string;
  keywords?: string[];
  license?: string;
  repository?: string;
}

export default class PluginGenerator extends Generator {
  private props: Props = {};
  private projectName = 'verdaccio-';
  private destinationPathName = '';

  constructor(args: string | string[], opts: Record<string, unknown>) {
    super(args, opts);
  }

  async prompting(): Promise<void> {
    this.log(yosay(`Welcome to ${chalk.red('generator-verdaccio-plugin')} plugin generator!`));

    const answers = await this.prompt<Props>([
      {
        type: 'list',
        name: 'pluginType',
        message: 'What kind of plugin do you want to create?',
        default: process.env.PLUGIN_TYPE ?? 'auth',
        choices: [
          { name: 'Auth', value: 'auth' },
          { name: 'Storage', value: 'storage' },
          { name: 'Middleware', value: 'middleware' },
          { name: 'Filter', value: 'filter' },
        ],
      },
      {
        type: 'input',
        name: 'name',
        message: "What's the plugin name? The prefix (verdaccio-xxx) will be added automatically",
        default: process.env.PLUGIN_NAME ?? 'my-plugin',
        validate: (input: string) => {
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
        message: "Author's Name",
        store: true,
      },
      {
        type: 'input',
        name: 'authorEmail',
        message: "Author's Email",
        store: true,
      },
      {
        type: 'input',
        name: 'keywords',
        message: 'Type your keywords (comma separated)',
        filter: (keywords: string) => _.uniq(_.words(keywords).concat(['verdaccio'])),
      },
    ]);

    this.props = {
      ...answers,
      license: 'MIT',
    };

    this.projectName = `verdaccio-${answers.name}`;
    this.destinationPathName = resolve(this.projectName);
    this.props.name = this.projectName;

    if (answers.githubUsername) {
      this.props.repository = `${answers.githubUsername}/${answers.name}`;
    }
  }

  packageJSON(): void {
    const { pluginType } = this.props;

    if (!pluginType) {
      this.log.error('pluginType is required');
      return;
    }

    const pkg = this.fs.readJSON(this.templatePath(`${pluginType}/_package.json`));

    // devDependencies
    pkg.devDependencies['@types/node'] =  rootPackageJSON.devDependencies['@types/node'];
    pkg.devDependencies['@types/express'] = rootPackageJSON.devDependencies['@types/express'];
    pkg.devDependencies['@types/debug'] = rootPackageJSON.devDependencies['@types/debug'];
    pkg.devDependencies['typescript'] = rootPackageJSON.devDependencies['typescript'];
    pkg.devDependencies['@verdaccio/types'] = rootPackageJSON.devDependencies['@verdaccio/types'];
    // required by verdaccio types
    pkg.devDependencies['@types/jsonwebtoken'] = rootPackageJSON.devDependencies['@types/jsonwebtoken'];
    // dependencies
    pkg.dependencies['@verdaccio/core'] = rootPackageJSON.dependencies['@verdaccio/core'];
    pkg.dependencies['@verdaccio/config'] = rootPackageJSON.dependencies['@verdaccio/config'];
    pkg.dependencies['debug'] = rootPackageJSON.dependencies['debug'];
    if (pluginType === 'auth') {
      pkg.devDependencies['@verdaccio/auth'] = rootPackageJSON.devDependencies['@verdaccio/auth'];
    } else if (pluginType === 'middleware') {
      pkg.dependencies['express'] = rootPackageJSON.dependencies['express'];
    }

    this.fs.writeJSON(this.templatePath(`${pluginType}/_package.json`), pkg);

    this.fs.copyTpl(
      this.templatePath(`${pluginType}/_package.json`),
      this.destinationPath(resolve(this.destinationPathName, 'package.json')),
      this.props
    );
  }

  writing(): void {
    const dest = (path: string) => this.destinationPath(resolve(this.destinationPathName, path));

    this.fs.copy(this.templatePath('common/gitignore'), dest('.gitignore'));
    this.fs.copy(this.templatePath('common/npmignore'), dest('.npmignore'));
    this.fs.copy(this.templatePath('common/nvmrc'), dest('.nvmrc'));

    this.fs.copyTpl(this.templatePath('common/README.md'), dest('README.md'), this.props);

    this.fs.copy(this.templatePath(`${this.props.pluginType}/src`), dest('src'));
    // this.fs.copy(this.templatePath('common/index.ts'), dest('index.ts'));
    this.fs.copy(this.templatePath('common/tsconfig.json'), dest('tsconfig.json'));

    this.fs.copy(this.templatePath(`${this.props.pluginType}/types`), dest('types'));

    this.fs.copy(this.templatePath('common/editorconfig'), dest('.editorconfig'));
  }

  install(): void {
    this.destinationRoot(this.projectName);
  }
}
