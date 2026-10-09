# Pokemon Manager API

API REST desenvolvida em TypeScript para gerenciamento de um catálogo local de Pokémons.

Projeto criado para a disciplina de Tópicos Especiais em Engenharia de Software, seguindo uma arquitetura em camadas com separação entre domínio, aplicação, infraestrutura e configuração principal.

## Tecnologias

- Node.js
- TypeScript
- Express
- Swagger / OpenAPI 3.0
- ESLint
- Prettier

## Funcionalidades

- Listar Pokémons cadastrados
- Filtrar Pokémons por tipo
- Buscar Pokémon por ID
- Cadastrar Pokémon manualmente
- Atualizar dados de um Pokémon
- Remover Pokémon do catálogo local
- Acessar documentação interativa via Swagger

## Endpoints

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/v1/pokemons` | Lista todos os Pokémons cadastrados |
| GET | `/api/v1/pokemons?type=fire` | Lista Pokémons filtrando por tipo |
| GET | `/api/v1/pokemons/:id` | Busca um Pokémon pelo ID |
| POST | `/api/v1/pokemons` | Cadastra um novo Pokémon |
| PUT | `/api/v1/pokemons/:id` | Atualiza um Pokémon existente |
| DELETE | `/api/v1/pokemons/:id` | Remove um Pokémon existente |
| GET | `/api/docs` | Abre a documentação Swagger |

## Estrutura Do Projeto

```txt
src
├── application
│   └── use-cases
├── domain
│   ├── entities
│   └── repositories
├── infrastructure
│   ├── database
│   │   └── in-memory
│   └── http
│       ├── controllers
│       └── routes
└── main
    ├── config
    ├── factories
    └── server.ts
```

## Como Executar

Instale as dependências:

```bash
npm install
```

Execute o projeto em modo desenvolvimento:

```bash
npm run dev
```

A API ficará disponível em:

```txt
http://localhost:3000
```

A documentação Swagger ficará disponível em:

```txt
http://localhost:3000/api/docs
```

## Scripts

```bash
npm run dev
```

Gera a documentação Swagger e inicia o servidor em modo desenvolvimento.

```bash
npm run build
```

Gera a documentação Swagger e compila o projeto TypeScript.

```bash
npm run lint
```

Executa o ESLint nos arquivos TypeScript.

```bash
npm run swagger
```

Gera o arquivo `swagger-output.json` usado pela documentação.

## Exemplo De Cadastro

Requisição:

```http
POST /api/v1/pokemons
Content-Type: application/json
```

Body:

```json
{
  "name": "Charmander",
  "type": ["fire"],
  "level": 5,
  "evolution": 1
}
```

Resposta esperada:

```json
{
  "message": "Pokémon criado com sucesso!",
  "data": {
    "id": "uuid-gerado",
    "name": "Charmander",
    "type": ["fire"],
    "level": 5,
    "evolution": 1
  }
}
```

## Observação

Os dados são armazenados em memória usando `InMemoryPokemonRepository`. Portanto, ao reiniciar o servidor, os Pokémons cadastrados são perdidos.
