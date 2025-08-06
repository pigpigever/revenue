import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      'max-len': [
        'warn', {'code': 120, 'ignoreComments': true}
      ],
      'semi': 'error',
      'no-trailing-spaces': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      // 'indent': ['error', 2, { 'SwitchCase': 1 }],
      'key-spacing': 'error',
      'keyword-spacing': 'error',
      'quotes': [2, 'single', 'avoid-escape'],
      'react/self-closing-comp': ['error', {
        'component': true,
        'html': true
      }],
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',
      'react/jsx-indent': [2, 2],
      'react/jsx-boolean-value': [2, 'never'],
      'react/jsx-no-duplicate-props': ['error', { 'ignoreCase': false }],
      'react/jsx-no-target-blank': 'error',
      'react/jsx-wrap-multilines': ['error', {
        'declaration': 'parens-new-line',
        'assignment': 'parens-new-line',
        'return': 'parens-new-line',
        'arrow': 'parens-new-line',
        'condition': 'parens-new-line',
        'logical': 'parens-new-line',
        'prop': 'parens-new-line'
      }],
      'react/jsx-closing-bracket-location': ['error', 'line-aligned'],
      'react/jsx-closing-tag-location': 'error',
      'react/jsx-first-prop-new-line': ['error', 'multiline'],
      'react/jsx-max-props-per-line': ['error', {
        'maximum': 1,
        'when': 'multiline'
      }],
      'react/jsx-no-bind': ['error', {
        'ignoreRefs': true,
        'allowArrowFunctions': true,
        'allowFunctions': false,
        'allowBind': false,
        'ignoreDOMComponents': true
      }],
      'react/no-unknown-property': 'error',
      'react/jsx-tag-spacing': ['error', {
        'closingSlash': 'never',
        'beforeSelfClosing': 'always',
        'afterOpening': 'never',
        'beforeClosing': 'never'
      }],
      'no-multi-spaces': 'error',
      'react/jsx-curly-spacing': ['error', {
        'when': 'never',
        'children': true,
        'spacing': {
          'objectLiterals': 'never'
        }
      }],
      'react/jsx-equals-spacing': ['error', 'never']
    },
  }
];

export default eslintConfig;
