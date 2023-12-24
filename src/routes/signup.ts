import { redirect } from 'prismy'
import render from '../render'
import p from '../prismy'
import { sessionSelector } from '../session'
import { urlEncodedBodySelector } from '../selectors'
import db from '../db'
import { encryptPassword } from '../password'
import { isString } from '../validators'

export const signUpPageHandler = p([sessionSelector], session => {
  if (session.data?.uid != null) {
    return redirect('/')
  }
  return render('signup', { title: 'Sign Up' })
})

export const signUpHandler = p([sessionSelector, urlEncodedBodySelector], async (session, body) => {
  if (!isString(body.email) || body.email.length === 0) {
    return redirect('/signup?error=missing-email')
  }

  if (!isString(body.name) || body.name.length === 0) {
    return redirect('/signup?error=missing-name')
  }

  if (!isString(body.password) || body.password.length === 0) {
    return redirect('/signup?error=missing-password')
  }

  try {
    const user = (
      await db('users')
        .insert({
          email: body.email,
          name: body.name,
          password: await encryptPassword(body.password)
        })
        .returning('id')
    )[0]

    if (session.data == null) {
      session.data = {}
    }
    session.data.uid = user.id
  } catch (error) {
    // TODO: Handle duplication
    throw error
  }

  return redirect('/')
})
