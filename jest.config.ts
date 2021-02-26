import { compilerOptions } from './tsconfig.json'
import { pathsToModuleNameMapper } from 'ts-jest/utils'

export default {
	preset: 'ts-jest',
	roots: ['<rootDir>/src'],
	collectCoverageFrom: [
		'<rootDir>/src/**/*.ts',
		'!<RootDir>/src/main/**',
		'!<RootDir>/src/presentations/protocols/**'
	],
	coverageDirectory: 'coverage',
	coverageProvider: 'v8',
	testEnvironment: 'node',
	transform: {
		'.+\\.ts$': 'ts-jest'
	},
	watchPathIgnorePatterns: ['globalConfig'],
	coveragePathIgnorePatterns: ['node_modules'],
	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
		prefix: '<rootDir>/src/app'
	})
}
