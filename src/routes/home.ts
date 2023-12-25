import { render } from '../render'
import p from '../prismy'

const homePageHandler = p([], () => {
  return render('home')
})

export default homePageHandler
