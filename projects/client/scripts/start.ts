import { devServer } from '@react-and-express/webpack-tool';

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

process.on('unhandledRejection', (err) => {
  throw err;
});

try {
  devServer();

  // ['SIGINT', 'SIGTERM'].forEach(function (sig) {
  //   process.on(sig, function () {
  //     ???.close();
  //     process.exit();
  //   });
  // });
} catch (err) {
  console.error(err);
  process.exit(1);
}
