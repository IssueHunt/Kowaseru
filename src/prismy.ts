import { middleware, prismy, res } from 'prismy'
import { sessionMiddleware } from './session'
import { render, rendererGlobalStorageMiddleware } from './render'

const errorMiddleware = middleware([], next => async () => {
  try {
    const result = await next()
    return result
  } catch (error) {
    console.error(error)
    try {
      return render(
        'error',
        {
          errorName: (error as any).name,
          errorDescription: (error as any).stack
        },
        500
      )
    } catch (renderError) {
      // Double-fault: the error page itself failed to render. Fall back to a
      // plain-text 500 so this never escapes and crashes the process.
      console.error(renderError)
      return res('Internal Server Error', 500, { 'content-type': 'text/plain' })
    }
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
