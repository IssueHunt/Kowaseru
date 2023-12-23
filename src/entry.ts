import http from 'http'

import router from './router'

const port = process.env.PORT
const baseUrl = process.env.BASE_URL

async function run() {
  const server = http.createServer(router)

  server.listen(port, () => {
    console.log(`Listening... ${baseUrl}:${port}`)
  })
}

run().catch(error => {
  console.error(error)
  process.exit(1)
})
