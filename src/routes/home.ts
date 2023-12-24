import render from '../render'
import p from '../prismy'
import { sessionSelector } from '../session'

const homePageHandler = p([sessionSelector], session => {
  return render('home', { uid: session.data?.uid })
})

export default homePageHandler
