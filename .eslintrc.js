module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  ignorePatterns: [
    'service-worker.js',
    'serviceWorkerRegistration.js',
    'setupTests.js',
    'reportWebVitals.js',
    '**/vendor/*.js',
  ],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.ts', '.js'] }],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'implicit-arrow-linebreak': 0,
    'operator-linebreak': 0,
    'import/extensions': 0,
    'react/require-default-props': 0,
    'object-curly-newline': 0,
    'function-paren-newline': 0,
    'comma-dangle': 0,
    'react/jsx-one-expression-per-line': 'off',
  },
};
