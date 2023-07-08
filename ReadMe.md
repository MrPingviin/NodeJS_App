# NodeJS App - Solution

### Technologies:
- Backend Framework: Express ( https://expressjs.com/ )
- ORM: Sequelize ( https://sequelize.org/ )
- DB: MariaDB ( https://mariadb.org/ )

## Description

The task is to build a server with the following main functionalities:
- Store and provide a paginated list of articles publicly through an API (the model only contains the article's title and ID).
- Retrieve the articles by their ID, but only with a valid token (details explained below) (the model contains all article data).
- Upload new articles with a title (max 100 characters) and description (max 5000 characters) using a valid token.

### Token acquisition and renewal process:
- The token format is UUID.
- Anybody can request a token by making an API call, providing the platform type (ANDROID, IOS, WEB). The token is valid for 5 requests by default, after which an error should be returned when using it.
- Token renewal happens through a separate endpoint by sending the token. In this case, the remaining request count is reset to 5, and the token remains the same.

### Other requirements:
- API documentation should be done using Swagger.
- Implementation should be done in Node.js using Express with any ORM and any SQL database. Optionally, NestJS framework can be used.
- The API should communicate in JSON format.

## Endpoints

The following are the required endpoints:

### Create article:
- In: { title: "string", description: "string" }
- Out: { title: "string", description: "string", id: number }

### List:
- In: pageSize, page
- Out: { list: [{ title: "string", id: 0}], meta: {pageSize: 0,pageCount: 0, page:0, count: 0} }

### Detailed:
- In: id, token
- Out: { title: "string", description: "string", id: number }

### Create token:
- In: platform type
- Out: { token: "string", remaining: number }

### Renew token:
- In: token
- Out: { remaining: 0 }
