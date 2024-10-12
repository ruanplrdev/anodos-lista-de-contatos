# Projeto de Gerenciamento de Contatos

Este é um projeto de API de gerenciamento de contatos com um frontend desenvolvido em Next.js e backend em Express, utilizando PostgreSQL e TypeORM. A autenticação é feita com JWT e o banco de dados é gerenciado usando Docker Compose.

## Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas no seu ambiente:

- Docker
- Docker Compose

## Como executar o projeto

### Passos

1. Clone o repositório:

   ```bash
   git clone https://github.com/ruanplrdev/anodos-lista-de-contatos
   cd anodos-lista-de-contatos
    ```
2. Crie o arquivo `.env` na raiz do projeto:

   No arquivo `.env`, você precisa definir as variáveis de ambiente do projeto. Um exemplo de configuração seria:

   ```makefile
    POSTGRES_USER=postgres
    POSTGRES_PASSWORD=admin
    POSTGRES_DB=anodos_lista_de_contatos_db
    NEXT_PUBLIC_API_URL=http://localhost:4000/api
   ```
   
3. Suba os containers com Docker Compose:

Para iniciar os containers do backend, frontend e banco de dados, execute o comando abaixo:

```bash
docker-compose up
```

4. Acessar a aplicação:
- O frontend estará disponível em: http://localhost:3000
- O backend estará rodando em: http://localhost:4000
- O Sistema criar por padrão o usuário admin: `user@admin.com:admin`
5. Encerrar os containers:

Para parar os containers, você pode usar:

```bash
docker-compose down
```

## Estrutura do projeto
- backend/ - Contém o código do backend com Express e TypeORM.
- frontend/ - Contém o código do frontend desenvolvido com Next.js.
- db/ - Configurações relacionadas ao banco de dados PostgreSQL, como volumes e migrations.
- docker-compose.yml - Define a configuração dos serviços para Docker Compose.

## Rotas do Backend

- Autenticação:

    - POST /api/register - Cadastro de novos usuários
    - POST /api/login - Login de usuários
- Contatos:
    - GET /api/contacts - Retorna os contatos do usuário autenticado
    - POST /api/contacts - Cria um novo contato
    - PUT /api/contacts/:id - Atualiza um contato existente
    - DELETE /api/contacts/:id - Remove um contato existente (apenas admin)

## Banco de Dados
O projeto usa PostgreSQL como banco de dados, e todas as tabelas são gerenciadas usando TypeORM. O banco de dados é criado automaticamente quando o Docker Compose é iniciado.

### Criando o usuário admin
Um usuário admin é criado automaticamente durante a inicialização da API no primeiro uso.

## Tecnologias Utilizadas
- Frontend: Next.js
- Backend: Express.js com TypeORM
- Banco de Dados: PostgreSQL
- Autenticação: JWT
- Containerização: Docker e Docker Compose
