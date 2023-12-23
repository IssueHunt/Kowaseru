import { prismy } from 'prismy'
import render from '../render'

const homePageHandler = prismy([], () => {
  return render('home')
})

export default homePageHandler
