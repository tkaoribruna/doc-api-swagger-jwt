# API Tasks e Receitas — Documentação com Swagger e Autenticação JWT

## Disciplina: Programação Web Back-End - 2026 / 1º Semestre
API REST construída em Node.js com Express, com autenticação via JWT (JSON Web Token) e documentação interativa gerada com Swagger (OpenAPI 3.0).
O projeto expõe operações de CRUD (criar, listar, buscar, atualizar e excluir) para três recursos: usuários, receitas e categorias, sendo que todas as rotas — exceto o login — exigem um token JWT válido para serem acessadas.

## Tecnologias Utilizadas
# API Tasks e Receitas — Documentação com Swagger e Autenticação JWT

API REST construída em **Node.js** com **Express**, com autenticação via **JWT (JSON Web Token)** e documentação interativa gerada com **Swagger (OpenAPI 3.0)**.

O projeto expõe operações de CRUD (criar, listar, buscar, atualizar e excluir) para três recursos: **usuários**, **receitas** e **categorias**, sendo que todas as rotas — exceto o login — exigem um token JWT válido para serem acessadas.

---

## Tecnologias utilizadas
* **Node.js**: Ambiente de execução.
* **Express**: Framework do servidor HTTP e roteamento.
* **jsonwebtoken**: Geração e verificação de tokens JWT.
* **swagger-ui-express**: Renderização da documentação Swagger (OpenAPI).

---

## Estrutura do projeto

```
doc-swagger-jwt/
├── app.js                          # Inicialização do servidor Express
├── routes.js                       # Definição de todas as rotas da API
├── swagger.json                    # Especificação OpenAPI 3.0 (documentação)
├── package.json
├── controllers/
│   ├── authController.js           # Login e geração de token JWT
│   ├── userController.js           # CRUD de usuários
│   ├── receitaController.js        # CRUD de receitas
│   └── categoriaController.js      # CRUD de categorias
├── middleware/
│   └── authenticateToken.js        # Middleware que valida o token JWT
├── testes-postman/                 # Prints dos testes feitos no Postman
└── testes-swagger/                 # Prints dos testes feitos no Swagger UI
```

> Os dados de usuários, receitas e categorias são armazenados **em memória** (arrays dentro dos controllers), ou seja, são reiniciados sempre que o servidor é reiniciado. Não há conexão com banco de dados.

---

## Como executar

**Pré-requisito:** Node.js instalado.

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Inicie o servidor:
   ```bash
   node app.js
   ```

3. A aplicação ficará disponível em:
   ```
   http://localhost:3000
   ```

> A porta pode ser alterada através da variável de ambiente `PORT`.

---

## Autenticação

A autenticação é feita via `POST /login`, usando um usuário fixo definido no código (não há cadastro de credenciais de login):

| Campo | Valor |
|---|---|
| `login` | `admin` |
| `senha` | `1234` |

**Exemplo de requisição:**
```json
POST /login
{
  "login": "admin",
  "senha": "1234"
}
```

**Resposta:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

O token gerado tem validade de **1 hora** e deve ser enviado no cabeçalho `Authorization` de todas as demais requisições, no formato:

```
Authorization: Bearer <seu_token_aqui>
```

Requisições sem token, com token inválido ou mal formatado recebem `401 Unauthorized` (ou `403 Forbidden`, dependendo do middleware acionado), bloqueando o acesso ao recurso.

---

## Endpoints da API

### Login
| Método | Rota | Descrição | Autenticação |
|---|---|---|---|
| POST | `/login` | Autentica o usuário e retorna o token JWT | Não |

### Usuários
| Método | Rota | Descrição | Autenticação |
|---|---|---|---|
| GET | `/usuarios` | Lista todos os usuários | Sim |
| POST | `/usuarios` | Cria um novo usuário | Sim |
| GET | `/usuarios/:id` | Busca um usuário pelo ID | Sim |
| PUT | `/usuarios/:id` | Atualiza um usuário existente | Sim |
| DELETE | `/usuarios/:id` | Remove um usuário | Sim |

### Receitas
| Método | Rota | Descrição | Autenticação |
|---|---|---|---|
| GET | `/receitas` | Lista todas as receitas | Sim |
| POST | `/receitas` | Cria uma nova receita | Sim |
| GET | `/receitas/:id` | Busca uma receita pelo ID | Sim |
| PUT | `/receitas/:id` | Atualiza uma receita existente | Sim |
| DELETE | `/receitas/:id` | Remove uma receita | Sim |
| GET | `/categorias/:id/receitas` | Lista as receitas de uma categoria específica | Sim |

### Categorias
| Método | Rota | Descrição | Autenticação |
|---|---|---|---|
| GET | `/categorias` | Lista todas as categorias | Sim |
| POST | `/categorias` | Cria uma nova categoria | Sim |
| GET | `/categorias/:id` | Busca uma categoria pelo ID | Sim |
| PUT | `/categorias/:id` | Atualiza uma categoria existente | Sim |
| DELETE | `/categorias/:id` | Remove uma categoria | Sim |

---

## Documentação Swagger

Com o servidor em execução, a documentação interativa (OpenAPI 3.0) fica disponível em:

```
http://localhost:3000/api-docs
```

Nela é possível visualizar todos os endpoints, seus parâmetros, exemplos de requisição/resposta e também **autenticar-se diretamente na interface** clicando no botão **"Authorize"** e informando o token JWT obtido no `/login`. Isso permite testar as rotas protegidas sem precisar de uma ferramenta externa como o Postman.

---

## Testes realizados

O projeto inclui evidências de testes manuais em duas pastas:

- **`testes-postman/`** — prints demonstrando o fluxo completo via Postman: login, criação/listagem/atualização/exclusão de usuário, busca por ID, e os cenários de erro (sem token e com token inválido).
- **`testes-swagger/`** — prints demonstrando o mesmo fluxo realizado diretamente pela interface do Swagger UI, incluindo a autorização com o token e o comportamento das rotas com e sem token.

---
