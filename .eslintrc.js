module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended', // Make this the last element so prettier config overrides other formatting rules
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect the react version
    },
    'import/resolver': {
      alias: {
        map: [['@', './src']],
      },
    },
  },
  plugins: ['react', 'react-hooks', 'simple-import-sort', 'prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {},
      {
        usePrettierrc: true,
        endOfLine: 'auto',
      },
    ],

    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'off',

    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/forbid-prop-types': 'off',
    'react/require-default-props': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/jsx-props-no-spreading': 'off',

    'import/prefer-default-export': 'off',
    'import/extensions': 'off',

    'react/jsx-no-useless-fragment': [
      'warn',
      {
        allowExpressions: true,
      },
    ],
    'react/function-component-definition': 'off',
    'react/no-danger': 'warn',
    'no-underscore-dangle': 'off',
    'no-unused-vars': 'warn',
    'react/display-name': 'off',
    'import/no-unresolved': 'off',
    'no-param-reassign': ['warn', { props: false }],
    'default-param-last': 'off',
    'prefer-regex-literals': 'off',
    semi: ['error', 'never'],
    'react/no-unstable-nested-components': ['off', { allowAsProps: true }],
    'react/destructuring-assignment': 'off',
  },
}
