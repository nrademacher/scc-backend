import type { InitialOptionsTsJest } from 'ts-jest/dist/types'
import { pathsToModuleNameMapper } from 'ts-jest'

const config: InitialOptionsTsJest = {
    clearMocks: true,
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: pathsToModuleNameMapper(
        {
            '#internal/lib': ['./src/lib/index.ts'],
            '#internal/modules': ['./src/modules/index.ts'],
            '#internal/services': ['./src/services/index.ts'],
            '#internal/types': ['./src/types/index.ts'],
            '#internal/utils': ['./src/utils/index.ts'],
            '#internal/*': ['./src/*.ts'],
        },
        {
            prefix: '<rootDir>',
        }
    ),
}

export default config
