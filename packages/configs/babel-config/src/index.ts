export default {
  babelrc: false,
  configFile: false,
  compact: false,
  presets: [
    ['@babel/typescript'],
    ['@babel/env'],
    [
      '@babel/react',
      {
        runtime: 'automatic',
      },
    ],
  ],
  plugins: [
    ['@babel/plugin-transform-runtime', { regenerator: true }],
    ['@babel/proposal-class-properties'],
    ['@babel/proposal-object-rest-spread'],
  ],
};
