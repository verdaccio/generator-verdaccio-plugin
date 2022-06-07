module.exports = {
  "extends": [
    'eslint:recommended',
    'google',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
  ],
  "plugins": ["prettier"],
  "env": {
    "es6": true,
    "node": true,
  },
  "parserOptions": {
    "allowImportExportEverywhere": true,
    "sourceType": "module",
    "ecmaVersion": 11,
    "ecmaFeatures": {
      "impliedStrict": true,
    },
  },
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".ts"],
      },
    },
  },
  "parser": "@typescript-eslint/parser",
  "rules": {
    "no-console": 0,
  }
}
