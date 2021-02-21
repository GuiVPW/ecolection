import { compilerOptions } from './tsconfig.json'
import { pathsToModuleNameMapper } from 'ts-jest/utils'

module.exports = {
	roots: ['<rootDir>/src'],
	coveragePathIgnorePatterns: ['node_modules'],
	collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
	coverageDirectory: 'coverage',
	coverageProvider: 'v8',
	testEnvironment: 'node',
	transform: {
		'.+\\.ts$': 'ts-jest'
	},
	watchPathIgnorePatterns: ['globalConfig'],
	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
		prefix: '<rootDir>/src/app'
	})
}
