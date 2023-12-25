import { prismy } from 'prismy'
import { sessionMiddleware } from './session'
import { rendererGlobalStorageMiddleware } from './render'

const p: typeof prismy = function (selectors, handlers, middlewareList = []) {
  return prismy(selectors, handlers, [sessionMiddleware, rendererGlobalStorageMiddleware, ...middlewareList])
}

export default p
