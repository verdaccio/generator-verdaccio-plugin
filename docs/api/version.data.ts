import { createRequire } from 'module';

const require = createRequire(import.meta.url);

export default {
  load() {
    const { version } = require('../../node_modules/@verdaccio/core/package.json');
    return { version };
  },
};
