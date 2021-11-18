import { build } from '@package/webpack-tools';

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
