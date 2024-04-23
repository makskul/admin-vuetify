module.exports = {
  extends: [
    '@vue/eslint-config-typescript'
  ],
  rules: {
    'import/no-named-as-default': 0,
    'vue/no-v-html': 0,
    'vue/multi-word-component-names': 0,
    'no-template-curly-in-string': 0
  },
  overrides: [
    {
      files: ['*.json'],
      rules: {
        'no-invalid-meta': 'off',
      },
    },
  ],
}
