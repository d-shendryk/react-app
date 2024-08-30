module.exports = {
  extends: [
    require.resolve('@vercel/style-guide/eslint/browser'),
    require.resolve('@vercel/style-guide/eslint/react'),
  ],
  rules: {
    'unicorn/filename-case': [
      'error',
      {
        case: 'camelCase',
      },
    ],
  },
  parserOptions: {
    babelOptions: {
      presets: ['@babel/preset-react'],
    },
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: './jsconfig.json',
      },
    },
  },
};
