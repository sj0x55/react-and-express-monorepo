import runTests from '@react-and-express/jest-tools';

process.env.BABEL_ENV = 'test';
process.env.NODE_ENV = 'test';

process.on('unhandledRejection', (err) => {
  throw err;
});

try {
  runTests();
} catch (err) {
  console.error(err);
  process.exit(1);
}
