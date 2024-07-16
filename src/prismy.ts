import { middleware, prismy } from 'prismy'
import { sessionMiddleware } from './session'
import { render, rendererGlobalStorageMiddleware } from './render'

const errorMiddleware = middleware([], next => async () => {
  try {
    const result = await next()
    return result
  } catch (error) {
    console.error(error)
    return render(
      'error',
      {
        errorName: (error as any).name,
        errorDescription: (error as any).stack
      },
      500
    )
  }
})

const p: typeof prismy = function (selectors, handlers, middlewareList = []) {
  return prismy(selectors, handlers, [
    errorMiddleware,
    sessionMiddleware,
    rendererGlobalStorageMiddleware,
    ...middlewareList
  ])
}

export default p
