import type { Config } from '@jest/types';
// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  coveragePathIgnorePatterns: ['./node_modules', './src/Config'],
  globalSetup: './src/Config/jest.setup.ts',
};
export default config;
