import path from 'node:path';
import { describe, it } from 'vitest';
import helpers from 'yeoman-test';

describe('generator-verdaccio-plugin (auth)', () => {
  const generatorPath = path.join(__dirname, '../generators/app');
  let runResult: any;
  it('runs generator', async () => {
    runResult = await helpers.run(generatorPath).withAnswers({
      pluginType: 'auth',
      name: 'my-plugin',
      githubUsername: 'testuser',
    });

    // const packageJSON = runResult.fs.readJSON('verdaccio-my-plugin/package.json');
    // console.log('result files:', packageJSON);
    // console.log('result files:', runResult.askedQuestions);

    const expectedFiles = [
      'verdaccio-my-plugin/package.json',
      'verdaccio-my-plugin/.gitignore',
      'verdaccio-my-plugin/.npmignore',
      'verdaccio-my-plugin/README.md',
      'verdaccio-my-plugin/src/index.ts',

      'verdaccio-my-plugin/tsconfig.json',
      'verdaccio-my-plugin/types/index.ts',
      'verdaccio-my-plugin/.editorconfig',
    ];
    expectedFiles.forEach((file) => {
      runResult.assertFile(file);
    });
  });
});
