# Estrutura de Pastas

```
project
├── /src # código da aplicação
│   ├── /database     # configuração do banco de dados
│   ├── /entities     # entidades da nossa aplicação
│   ├── /repositories # regra de negócio do banco de dados
│   ├── /modules      # casos de uso da aplicação 
│   │   └── /any-module
│   │       ├── /any-use-case.ts        # regra de negócio geral
│   │       ├── /any-use-case.spec.ts   # testes do usecase
│   │       ├── /any-controller.ts      # tratativas das requisições HTTP
│   │       └── /any-controller.spec.ts # testes do controller
│   ├── /routes      # rotas da aplicação
│   ├── /app.ts      # configurações do server HTTP (ou WS)
│   └── /server.ts   # inicialização da aplicação
├── /.editorconfig   # configurações do Editor Config
├── /.gitignore      # configurações do .gitignore
├── /.eslintrc.json  # configurações do ESLint
├── /jest.config.ts  # configurações do Jest
├── /tsconfig.json   # configurações do TS
├── /package.json    # configurações do NPM
├── /README.md       # guia da aplicação
├── /ARCHITECTURE.md # arquitetura da aplicação
```