import { querySelector, redirect } from 'prismy'
import { render } from '../render'
import p from '../prismy'
import { sessionSelector } from '../session'
import { urlEncodedBodySelector } from '../selectors'
import db from '../db/db'
import { checkPassword } from '../password'
import { isString } from '../validators'

export const signInPageHandler = p([sessionSelector, querySelector], (session, query) => {
  if (session.data?.uid != null) {
    return redirect('/')
  }

  return render('signin', { title: 'Sign In', error: query.error })
})

export const signInHandler = p([sessionSelector, urlEncodedBodySelector], async (session, body) => {
  if (!isString(body.email) || body.email.length === 0) {
    return redirect('/signin?error=missing-email')
  }

  if (!isString(body.password) || body.password.length === 0) {
    return redirect('/signin?error=missing-password')
  }

  const user = (await db('users').select('id', 'password').where('email', body.email).limit(1))[0]

  if (user == null || !(await checkPassword(body.password, user.password))) {
    return redirect('/signin?error=auth-fail')
  }

  if (session.data == null) {
    session.data = {}
  }
  session.data.uid = user.id

  return redirect('/')
})
