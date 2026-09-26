// @ts-check
import {defineConfig} from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    coverage: {
      exclude: ['tests/**'],
    },
    globals: true,
  },
});
