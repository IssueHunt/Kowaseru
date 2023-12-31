import pug from 'pug'
import path from 'path'
import { middleware, res } from 'prismy'
import { AsyncLocalStorage } from 'async_hooks'
import { currentUserSelector } from './selectors'

const rendererLocalGlobalStorage = new AsyncLocalStorage()

export function render(viewFileName: string, locals?: any, statusCode: number = 200) {
  const localGlobal = rendererLocalGlobalStorage.getStore()

  const rendered = pug.renderFile(path.join(__dirname, `views/${viewFileName}.pug`), { ...locals, global: localGlobal })

  return res(rendered, statusCode)
}

export const rendererGlobalStorageMiddleware = middleware([currentUserSelector], next => async currentUser => {
  const localGlobal: { [key: string]: any } = {}
  if (currentUser != null) {
    localGlobal.currentUser = currentUser
  }

  return new Promise(resolve => {
    rendererLocalGlobalStorage.run(localGlobal, async () => {
      resolve(await next())
    })
  })
})
