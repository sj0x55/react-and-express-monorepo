import runTests from '@package/jest-tools';

process.on('unhandledRejection', (err) => {
  throw err;
});

try {
  runTests();
} catch (err) {
  console.error(err);
  process.exit(1);
}
