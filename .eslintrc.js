/** eslint-ignore */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
  },
  extends: [
    'next',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
  ],
  ignorePatterns: ['.eslintrc.js'],
  plugins: ['unused-imports', '@typescript-eslint'],
  rules: {
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'unused-imports/no-unused-imports': 'error',
  },
};
