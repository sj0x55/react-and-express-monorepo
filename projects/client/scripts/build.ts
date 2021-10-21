import { build } from '@react-and-express/webpack-tool';

process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

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
