import * as jest from 'jest';
import dotenv from '@package/dotenv';
import { getStandardPackagePaths, getStandardPackageFiles, getExistingPath } from '@package/monorepo-tools';

const standardPackagePaths = getStandardPackagePaths(process.cwd());
const standardPackageFiles = getStandardPackageFiles(process.cwd());
const paths = { ...standardPackagePaths, ...standardPackageFiles };
const getRelativePath = getExistingPath(process.cwd());
const getLocalPath = getExistingPath(__dirname);
const customJestConfig = getRelativePath('jest.config.js');

export default async () => {
  if (paths.dotenvFilePath) {
    dotenv(paths.dotenvFilePath);
  }

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
        modulePaths: [paths.srcPath],
        setupFiles: [getLocalPath('setup-tests.ts')],
        setupFilesAfterEnv: [getLocalPath('setup-tests-after.ts')],
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
