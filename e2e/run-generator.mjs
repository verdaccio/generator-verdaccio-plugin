import { cpSync } from 'node:fs';
import { join, resolve } from 'node:path';
import helpers from 'yeoman-test';

const pluginType = process.argv[2] || 'auth';
const outputDir = process.argv[3] || resolve('e2e-output');
const pluginName = 'test-plugin';
const generatorPath = resolve('generators/app');

console.log(`Generating ${pluginType} plugin...`);

const result = await helpers.run(generatorPath).withAnswers({
  pluginType,
  name: pluginName,
  githubUsername: 'e2e-test',
  description: 'E2E test plugin',
  authorName: 'CI',
  authorEmail: 'ci@test.com',
  keywords: 'test',
});

const expectedFiles = [
  `verdaccio-${pluginName}/package.json`,
  `verdaccio-${pluginName}/src/index.ts`,
  `verdaccio-${pluginName}/tsconfig.json`,
  `verdaccio-${pluginName}/types/index.ts`,
  `verdaccio-${pluginName}/.gitignore`,
  `verdaccio-${pluginName}/.editorconfig`,
  `verdaccio-${pluginName}/README.md`,
];

expectedFiles.forEach((file) => result.assertFile(file));

// Copy generated plugin to the output directory for subsequent CI steps
const source = join(result.cwd, `verdaccio-${pluginName}`);
cpSync(source, outputDir, { recursive: true });

console.log(`Generated ${pluginType} plugin successfully at ${outputDir}`);
