/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: ['plugin:vue/vue3-recommended', 'eslint:recommended', '@vue/eslint-config-typescript'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'vue/multi-word-component-names': ['off'],
    'vue/max-attributes-per-line': ['off'],
    'vue/singleline-html-element-content-newline': ['off'],
    'no-undef': ['off'],
    'no-useless-escape': ['off'],
  },
}
