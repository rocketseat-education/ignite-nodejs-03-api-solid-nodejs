import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    tsconfigPaths: true
  },
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          include: ['src/use-cases/test/**/*.spec.ts'],
          environment: 'node',
        },
      },
      {
        extends: true,
        test:{
          name: 'e2e',
          include: ['src/http/controllers/**/*.spec.ts'],
          environment: './prisma/vitest-environment-prisma/prisma-environment.ts/prisma-test-enviroment.ts'
        }
      }
    ]
  },
})