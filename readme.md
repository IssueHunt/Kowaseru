
# Kowaseru

<img src='./assets/kowaseru.jpg' width="400">

A vulnerable server to practice pen testing.

## Existing Vulnerabilities

[Check here](./vulnerabilities.md)

## How to run

### Requirements

- [Node.js LTS](https://nodejs.org/en)
- (Optional) [Docker Desktop](https://docs.docker.com/compose/install/) : If you want to use your own db, you don't need this.

### Steps

0 - Clone or download this project

```
git clone git@github.com:IssueHunt/Kowaseru.git
```

1 - Prepare DB

Run the script below inside from the project directory.
(You can skip this if you want to use an existing postgres server.)

```
docker-compose up -d
```


2 - Configure env vars or create .env file.

Make sure the db info is correct and don't forget to set `SESSION_SECRET`.

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

> For `SESSION_SECRET`, use the command below or somehow generate **32 bytes of full-entropy key**.
>
> ```
> openssl rand -hex 32
> ```

3 - Install all deps.

```
npm i
```

4 - Run DB migration

```
npm run migration:up
```

5 - Run the server.

```
npm start
```

## Development

### Add table

```
npm run migration:make -- $NAME
```
