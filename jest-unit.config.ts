import { compilerOptions } from './tsconfig.json'
import { Config } from '@jest/types'
import { pathsToModuleNameMapper } from 'ts-jest/utils'

export default async (): Promise<Config.InitialOptions> => ({
	testMatch: ['**/*.spec.ts'],
	transform: {
		'.+\\.ts$': 'ts-jest'
	},
	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
		prefix: '<rootDir>/src/app'
	})
})
