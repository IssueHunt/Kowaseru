import { prismy } from 'prismy'
import { sessionMiddleware } from './session'

const p: typeof prismy = function (selectors, handlers, middlewareList = []) {
  return prismy(selectors, handlers, [sessionMiddleware, ...middlewareList])
}

export default p
