import { prismy, res, router } from 'prismy'

export default router([
  [
    '/',
    prismy([], () => {
      return res('')
    })
  ]
])
