module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    // when opening in the parent folder
    project: './main-react/tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'react-refresh'],
  rules: {
    // eslint
    semi: ['error', 'never'],
    'arrow-body-style': 0,
    'linebreak-style': 0,
    'prefer-template': 'warn',
    'no-console': 0,
    // other
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    '@typescript-eslint/semi': ['error', 'never'],
    'import/extensions': 0,
    'react/react-in-jsx-scope': 0,
  },
}
