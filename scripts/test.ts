import path from 'path';
import { getPackages } from '@package/monorepo-tools';
import runTests from '@package/jest-tools';

process.on('unhandledRejection', (err) => {
  throw err;
});

try {
  runTests(
    getPackages(path.resolve(__dirname, '..')).map((pkgPath: string) => ({
      rootDir: process.cwd(),
      roots: [`<rootDir>/${pkgPath}/src`],
    })),
  );
} catch (err) {
  console.error(err);
  process.exit(1);
}
