import { build } from '@package/webpack-tools';

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

process.on('unhandledRejection', (err) => {
  throw err;
});

(async () => {
  try {
    console.log(await build());
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
