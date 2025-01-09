/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: ['eslint:recommended', 'airbnb'],
  // overrides: [
  //   {
  //     files: ['cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}', 'cypress/support/**/*.{js,ts,jsx,tsx}'],
  //     extends: ['plugin:cypress/recommended']
  //   }
  // ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'prettier/prettier': [
      'warn',
      {
        endOfLine: 'auto'
      }
    ],
    // rules for jsdoc: https://github.com/gajus/eslint-plugin-jsdoc
    'jsdoc/require-hyphen-before-param-description': 1,
    'jsdoc/require-jsdoc': [
      'warn',
      { require: { FunctionDeclaration: true, ClassExpression: true, MethodDefinition: true } }
    ],
    'jsdoc/require-description': 1,
    'jsdoc/require-description-complete-sentence': [
      'warn',
      {
        abbreviations: ['ie', 'eg']
      }
    ],
    'jsdoc/tag-lines': ['warn', 'any', { startLines: 0 }],
    'jsdoc/require-param-description': 1,
    'jsdoc/check-alignment': 1,
    'jsdoc/check-param-names': 1,
    'jsdoc/check-property-names': 1,
    'jsdoc/check-tag-names': 1,
    'jsdoc/check-types': 1,
    'jsdoc/check-values': 1,
    'jsdoc/empty-tags': 1,
    'jsdoc/implements-on-classes': 1,
    'jsdoc/match-description': 1,
    'jsdoc/multiline-blocks': 1,
    'jsdoc/no-multi-asterisks': 1,
    'jsdoc/no-undefined-types': 1,
    'jsdoc/require-asterisk-prefix': 1,
    'jsdoc/require-param': 1,
    'jsdoc/require-param-name': 1,
    'jsdoc/require-param-type': 1,
    'jsdoc/require-property': 1,
    'jsdoc/require-property-description': 1,
    'jsdoc/require-property-name': 1,
    'jsdoc/require-property-type': 1,
    'jsdoc/require-returns-check': 1,
    'jsdoc/require-returns-description': 1,
    'jsdoc/require-yields': 1,
    'jsdoc/require-yields-check': 1,
    'jsdoc/valid-types': 1
  }
}
