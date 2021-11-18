import { devServer } from '@package/webpack-tools';

process.on('unhandledRejection', (err) => {
  throw err;
});

try {
  devServer();
} catch (err) {
  console.error(err);
  process.exit(1);
}
