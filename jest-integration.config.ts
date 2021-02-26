import { Config } from '@jest/types'
import { compilerOptions } from './tsconfig.json'
import { pathsToModuleNameMapper } from 'ts-jest/utils'

export default async (): Promise<Config.InitialOptions> => ({
	testMatch: ['**/*.test.ts'],
	transform: {
		'.+\\.ts$': 'ts-jest'
	},
	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
		prefix: '<rootDir>/src/app'
	})
})
