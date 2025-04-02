Este projeto requer a versão 18 do Node.js para evitar [esta issue](https://github.com/prisma/prisma/issues/19151).
Caso queira seguir com uma versão superior, recomendamos atualizar `typescript`, `@prisma/client` e `prisma` para as versões mais recentes.

- Remover o pacote: `npm uninstall @vitest/coverage-c8`
- Atualizar os pacotes: `npm install vitest@latest vite-tsconfig-paths@latest @vitest/ui@latest @vitest/coverage-v8@latest`
- Renomear o arquivo de configuração para `vitest.config.mjs` (devido ao `vite-tsconfig-paths` ser ESM Only)
- Remover os scripts `pretest:e2e`, `test:create-prisma-environment` e `test:install-prisma-environment`
- Remover o arquivo `prisma/vitest-environment-prisma/package.json` pois está configuração não é mais necessária
- No arquivo `prisma-test-environment.ts` corrigir a importação de `Environment` para `vitest/environments`
- No arquivo `prisma-test-environment.ts` adicionar no objeto exportado a configuração `transformMode: 'ssr'`
- No arquivo `vite.config.mjs` deve alterar para utilizar `workspace`:

  ```js
  export default defineConfig({
    plugins: [tsconfigPaths()],
    test: {
      dir: 'src',
      workspace: [
        {
          extends: true,
          test: {
            name: 'e2e',
            dir: 'src/http/controllers',
            environment: `./prisma/vitest-environment-prisma/prisma-test-environment.ts`,
          },
        },
        {
          extends: true,
          test: {
            name: 'unit',
            dir: 'src/use-cases',
          },
        },
      ],
    },
  })
  ```

- No arquivo `package.json` corrigir os scripts abaixo para utilizar `--project`

  ```json
  "test": "vitest run --project unit",
  "test:watch": "vitest --project unit",
  "test:e2e": "vitest run --project e2e",
  "test:e2e:watch": "vitest --project e2e",
  ```
