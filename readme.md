# Kowaseru

## How to use

Configure env vars or create .env file.

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

For `SESSION_SECRET`, use the command below or somehow generate **32 bytes of full-entropy key**.

```
openssl rand -hex 32
```

## Development

### Add table

```
npm run migration:make -- $NAME
```
