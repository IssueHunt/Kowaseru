# Kowaseru

A vulnerable server to practice pen testing.

## How to run

### Requirements

- [Node.js LTS](https://nodejs.org/en)
- (Optional) [Docker Desktop](https://docs.docker.com/compose/install/) : If you want to use your own db, you don't need this.

### Steps

1 - Configure env vars or create .env file.

```
BASE_URL=http://localhost
PORT=4000
DB_HOST=localhost
DB_PORT=5432
DB_USER=root
DB_PASSWORD=root
DB_NAME=kowaseru
SESSION_SECRET=
```

> If you edit db info in `docker-compose.yml`, update .env too.

> For `SESSION_SECRET`, use the command below or somehow generate **32 bytes of full-entropy key**.
>
> ```
> openssl rand -hex 32
> ```

2 - Install all deps.

```
npm i
```

3 - Run DB migration

```
npm run migration:up
```

4 - Run the server.

```
npm start
```

## Development

### Add table

```
npm run migration:make -- $NAME
```
