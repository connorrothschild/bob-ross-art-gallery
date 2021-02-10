module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: [
    'eslint:recommended',
    'standard'
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off'
  }
}
