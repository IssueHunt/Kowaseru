import { prismy, router } from 'prismy'
import render from './render'

export default router([
  [
    '/',
    prismy([], () => {
      return render('home')
    })
  ]
])
