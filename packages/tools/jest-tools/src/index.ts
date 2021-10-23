import { getStandardPackagePaths, getExistingPath } from '@package/monorepo-tools';
import setupTests from 'setup-tests';
import * as jest from 'jest';

process.env.BABEL_ENV = 'test';
process.env.NODE_ENV = 'test';

const standardPackagePaths = getStandardPackagePaths(process.cwd());
const getRelativePath = getExistingPath(process.cwd());
const getLocalPath = getExistingPath(__dirname);
const customJestConfig = getRelativePath('jest.config.js');

export default async () => {
  const { default: defaultFileConfig, ...fileConfig } = customJestConfig
    ? await import(customJestConfig)
    : { default: {} };

  const config = {
    projects: [
      {
        clearMocks: true,
        resetModules: true,
        roots: ['<rootDir>/src'],
        testEnvironment: 'jsdom',
        testRunner: 'jest-circus/runner',
        modulePaths: [standardPackagePaths.srcPath],
        setupFiles: [getLocalPath('setup-tests.ts')],
        setupFilesAfterEnv: [getLocalPath('setup-tests-after.ts')],
        watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
        transform: {
          '^.+\\.(js|jsx|ts|tsx)$': getLocalPath('config/transform/babel.ts'),
          '^.+\\.css$': getLocalPath('config/transform/css.ts'),
        },
        moduleNameMapper: {
          '^@/(.*)$': '<rootDir>/src/$1',
        },
        ...(defaultFileConfig || fileConfig || {}),
      },
    ],
  };

  jest
    .runCLI({ config: JSON.stringify(config), _: [], $0: '' }, [process.cwd()])
    .then(() => console.log('run-programmatically-mutiple-projects completed'))
    .catch((err) => {
      console.error(err);
      process.exitCode = 1;
    });
};
