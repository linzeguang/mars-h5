module.exports = {
  extends: ['mantine'],
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['simple-import-sort'],
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
    'import/extensions': 'off',
    'no-restricted-exports': 'off',
    'react/jsx-fragments': 'off',
    'react/no-unknown-property': ['error', { ignore: ['css'] }],
    'react/react-in-jsx-scope': 'off',
  },
};
