module.exports = {
  overrides: [
    {
      files: '**/*.{js,jsx,mjs,ts,tsx}',
      options: {
        semi: true,
        printWidth: 120,
        parser: 'typescript',
        singleQuote: true,
        arrowParens: 'always',
        trailingComma: 'all',
      },
    },
    {
      files: '**/*.json',
      options: {
        parser: 'json',
        printWidth: 80,
        singleQuote: false,
      },
    },
    {
      files: '**/*.{yml,yaml}',
      options: {
        parser: 'yaml',
        printWidth: 80,
        singleQuote: false,
      },
    },
    {
      files: '**/*.{md}',
      options: {
        parser: 'markdown',
      },
    },
  ],
};
