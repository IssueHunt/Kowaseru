import http from 'http'

import router from './router'

const port = process.env.PORT
const baseUrl = process.env.BASE_URL

process.on('uncaughtException', error => {
  console.error(error)
  process.exit(1)
})

process.on('unhandledRejection', reason => {
  console.error(reason)
  process.exit(1)
})

async function run() {
  const server = http.createServer(router)

  server.on('error', error => {
    console.error(error)
    process.exit(1)
  })

  server.listen(port, () => {
    console.log(`Listening... ${baseUrl}:${port}`)
  })
}

run().catch(error => {
  console.error(error)
  process.exit(1)
})
