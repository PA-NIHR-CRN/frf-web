import type { Config } from 'jest'

import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

const config: Config = {
  verbose: true,
  setupFiles: ['<rootDir>/src/config/jest/jest.env.js'],
  setupFilesAfterEnv: ['<rootDir>/src/config/jest/jest.setup.js'],
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  reporters: ['default', 'jest-junit'],
  coverageReporters: ['json-summary', 'text', 'html'],
  coveragePathIgnorePatterns: ['node_modules'],
  coverageThreshold: {
    global: {
      lines: 100,
      functions: 100,
      branches: 95,
      statements: 95,
    },
  },
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)
