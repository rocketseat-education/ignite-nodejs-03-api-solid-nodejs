# API SOLID Node.js

API de uma aplicação no estilo GymPass desenvolvida em Node.js com TypeScript, Fastify e Prisma, seguindo os princípios SOLID para um código limpo, escalável e de fácil manutenção.

## Principais Funcionalidades da Aplicação

- **Usuários (Users):** Podem se cadastrar, autenticar e visualizar seus perfis.
- **Academias (Gyms):** Podem ser cadastradas, buscadas por nome ou proximidade.
- **Check-ins:** Usuários podem realizar check-in em academias, com regras de negócio como validação de distância e limite de check-ins por dia.

## Tecnologias Utilizadas

- **Node.js:** Ambiente de execução do JavaScript no servidor.
- **TypeScript:** Superset do JavaScript que adiciona tipagem estática.
- **Fastify:** Framework web focado em performance e baixo overhead.
- **Prisma:** ORM para Node.js e TypeScript, utilizado para a comunicação com o banco de dados (PostgreSQL).
- **Zod:** Biblioteca para validação de esquemas e tipos.
- **Vitest:** Framework de testes para projetos Vite (e Node.js).
- **Docker:** Utilizado para criar um ambiente de desenvolvimento com PostgreSQL.
- **TSX:** Executa arquivos TypeScript diretamente sem a necessidade de compilação prévia em desenvolvimento.
- **TSUP:** Bundler para bibliotecas TypeScript.

## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [x] Deve ser possível o usuário obter o seu histórico de check-ins;
- [x] Deve ser possível o usuário buscar academias próximas (até 10km);
- [x] Deve ser possível o usuário buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar check-in em uma academia;
- [x] Deve ser possível validar o check-in de um usuário;
- [x] Deve ser possível cadastrar uma academia;

## RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O usuário não pode fazer 2 check-ins no mesmo dia;
- [x] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [x] O check-in só pode ser validado até 20 minutos após ser criado;
- [x] O check-in só pode ser validado por administradores;
- [x] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [x] O usuário deve ser identificado por um JWT (JSON Web Token);

<!--START_SECTION:footer-->

<br />
<br />

<p align="center">
  <a href="https://discord.gg/rocketseat" target="_blank">
    <img align="center" src="https://storage.googleapis.com/golden-wind/comunidade/rodape.svg" alt="banner"/>
  </a>
</p>

<!--END_SECTION:footer-->
