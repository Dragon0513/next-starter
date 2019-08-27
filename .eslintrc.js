module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
    jest: true
  },
  extends: ['standard', 'standard-react'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['react', 'standard'],
  rules: {
    'react/prop-types': 0
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect'
    }
  }
}
