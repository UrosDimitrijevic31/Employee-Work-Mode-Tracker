module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['@typescript-eslint', 'react-refresh'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  ignorePatterns: ['dist', 'node_modules'],
  settings: {},
  overrides: [
    {
      files: ['*.cjs', 'vite.config.ts', 'postcss.config.cjs', 'tailwind.config.ts'],
      env: { node: true, browser: false },
      rules: {
        'no-undef': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
      },
    },
  ],
  rules: {
    '@typescript-eslint/consistent-type-imports': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
