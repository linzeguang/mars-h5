module.exports = {
  extends: ['mantine'],
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['react-hooks', 'simple-import-sort'],
  overrides: [
    {
      files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
      rules: {
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              // Side effect imports
              ['^\\u0000', '^.+\\.s?css$'],
              // `react` first, `next` second, then packages starting with a character
              ['^react', '^[a-z]', '^@(?!/)'],
              // alias starting with `@/`
              ['^@/'],
              // Imports starting with `../`
              ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
              // Imports starting with `./`
              ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            ],
          },
        ],
      },
    },
  ],
  rules: {
    'consistent-return': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/extensions': 'off',
    'import/no-cycle': 'off',
    'no-param-reassign': 'off',
    'no-restricted-exports': 'off',
    // 'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-fragments': 'off',
    'react/no-unknown-property': ['error', { ignore: ['css'] }],
    'react/no-unused-prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-throw-literal': 'off',
  },
};
