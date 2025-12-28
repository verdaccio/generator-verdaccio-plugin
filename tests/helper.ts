import path from 'path';

export const name = 'test';
export const description = 'An amazing verdaccio plugin';
export const githubUsername = 'testing';
export const authorName = 'test';
export const authorEmail = 'test';
export const keywords = ['verdaccio, plugin, typescript'];
export const license = 'MIT';
export const repository = 'verdaccio/generator-test';
export const getBuildAsset = (tempRoot: string, item: string) => {
  const prefixPath = path.join(tempRoot, `/verdaccio-${name}`);
  return `${prefixPath}/${item}`;
};
