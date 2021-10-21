import { resolvePath, getAppPaths } from '@react-and-express/monorepo-utils';
import * as jest from 'jest';

process.env.BABEL_ENV = 'test';
process.env.NODE_ENV = 'test';
process.env.PUBLIC_URL = '';

const paths = getAppPaths({
  appDir: process.cwd(),
});
const getLocalPath = (localPath: string) => resolvePath(__dirname, localPath);

export default () => {
  const config = {
    projects: [
      {
        roots: ['<rootDir>/src'],
        testEnvironment: 'jsdom',
        testRunner: 'jest-circus/runner',
        resetMocks: true,
        modulePaths: [paths.srcPath],
        setupFiles: [getLocalPath('setup-tests.ts')],
        setupFilesAfterEnv: [getLocalPath('setup-tests-after.ts')],
        watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
        transform: {
          '^.+\\.(js|jsx|ts|tsx)$': getLocalPath('config/transform/babel.ts'),
          '^.+\\.css$': getLocalPath('config/transform/css.ts'),
        },
        moduleNameMapper: {
          '^src/(.*)$': '<rootDir>/src/$1',
        },
      },
    ],
  };

  jest
    .runCLI({ config: JSON.stringify(config) }, [process.cwd()])
    .then(() => console.log('run-programmatically-mutiple-projects completed'))
    .catch((err) => {
      console.error(err);
      process.exitCode = 1;
    });
};
