import { redirect } from 'prismy'
import p from '../prismy'
import { sessionSelector } from '../session'

export const signOutHandler = p([sessionSelector], session => {
  session.data = null

  return redirect('/signin')
})
