const { compilerOptions }  = require('./tsconfig.json');
const { pathsToModuleNameMapper } = require('ts-jest/utils');

module.exports = async () => {
  return {
    verbose: true,
    rootDir: './',
    roots: ['<rootDir>/src/tests'],
    setupFiles: ["dotenv/config"],
    preset: 'ts-jest',
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>' })
  };
};