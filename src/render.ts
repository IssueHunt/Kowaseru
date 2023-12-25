import pug from 'pug'
import path from 'path'
import { middleware, res } from 'prismy'
import { AsyncLocalStorage } from 'async_hooks'
import { sessionSelector } from './session'

const rendererLocalGlobalStorage = new AsyncLocalStorage()

export function render(viewFileName: string, locals?: any) {
  const localGlobal = rendererLocalGlobalStorage.getStore()
  console.log(localGlobal)
  const rendered = pug.renderFile(path.join(__dirname, `views/${viewFileName}.pug`), { ...locals, global: localGlobal })

  return res(rendered)
}

export const rendererGlobalStorageMiddleware = middleware([sessionSelector], next => async session => {
  const localGlobal: { [key: string]: any } = {}
  if (session.data?.uid != null) {
    localGlobal.uid = session.data.uid
  }

  return new Promise(resolve => {
    rendererLocalGlobalStorage.run(localGlobal, async () => {
      resolve(await next())
    })
  })
})
