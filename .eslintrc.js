module.exports = {
  root: true,
  ignorePatterns: ['.history', 'dist', 'build', 'node_modules'],
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'react-hooks', 'jest', '@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    // 'plugin:cypress/recommended',
  ],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    // project: './tsconfig.json',
    createDefaultProgram: true,
    sourceType: 'module',
    ecmaVersion: 2021,
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
      {
        usePrettierrc: true,
      },
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    'react/display-name': 'off',
    'no-console': 'off',
    'no-debugger': 'off',
  },
  settings: {
    // 'import/resolver': {
    //   node: {
    //     moduleDirectory: ['node_modules'],
    //   },
    // },
    react: {
      version: 'detect',
    },
  },
};
