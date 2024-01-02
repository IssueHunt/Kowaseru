import { createRouteParamSelector, querySelector, redirect } from 'prismy'
import p from '../prismy'
import db from '../db/db'
import { render, renderErrorPage } from '../render'
import { listPosts } from '../db/methods'
import { currentUserSelector, urlEncodedBodySelector } from '../selectors'
import { isString } from '../validators'
import { checkPassword, encryptPassword } from '../password'

export const usersShowPageHandler = p([createRouteParamSelector('userId')], async userId => {
  const user = (await db('users').select('id', 'name').where('id', userId))[0]

  if (user == null) {
    return renderErrorPage('Not Found', 'The user does not exist.', 404)
  }

  const posts = await listPosts({ userId: user.id })

  return render('users.show', {
    user,
    posts
  })
})

export const usersEditPageHandler = p([createRouteParamSelector('userId'), querySelector], async (userId, query) => {
  const user = (await db('users').select('id', 'name').where('id', userId))[0]

  if (user == null) {
    return renderErrorPage('Not Found', 'The user does not exist.', 404)
  }

  return render('users.edit', {
    user,
    error: query.error,
    success: query.success
  })
})

export const usersUpdateHandler = p(
  [createRouteParamSelector('userId'), currentUserSelector, urlEncodedBodySelector],
  async (userId, currentUser, body) => {
    if (currentUser == null) {
      return renderErrorPage('Unauthenticated', 'Please sign in.', 401)
    }

    if (!isString(body.name)) {
      return renderErrorPage('Missing Name', 'Provide name.')
    }

    const user = (await db('users').select('id', 'name').where('id', userId))[0]
    if (user == null) {
      return renderErrorPage('Not Found', 'The user does not exist.', 404)
    }

    // VUL: IDOR
    // if (user.id !== currentUser.id) {
    //   return renderErrorPage('Forbidden', 'Only the user can edit their profile.', 403)
    // }

    await db('users').update('name', body.name).where('id', userId)

    return redirect(`/users/${user.id}`)
  }
)

export const usersPasswordUpdateHandler = p(
  [createRouteParamSelector('userId'), currentUserSelector, urlEncodedBodySelector],
  async (userId, currentUser, body) => {
    if (currentUser == null) {
      return renderErrorPage('Unauthenticated', 'Please sign in.', 401)
    }

    if (!isString(body.currentPassword)) {
      return renderErrorPage('Missing Name', 'Provide current password.')
    }

    if (!isString(body.newPassword)) {
      return renderErrorPage('Missing Name', 'Provide new password.')
    }

    if (!isString(body.newPasswordConfirmation)) {
      return renderErrorPage('Missing Name', 'Provide new password confirmation.')
    }

    if (body.newPassword !== body.newPasswordConfirmation) {
      return redirect(`/users/${userId}/edit?error=missmatching-new-password`)
    }

    const user = (await db('users').select('id', 'password').where('id', userId))[0]
    if (user == null) {
      return renderErrorPage('Not Found', 'The user does not exist.', 404)
    }

    if (user.id !== currentUser.id) {
      return renderErrorPage('Forbidden', 'Only the user can edit their profile.', 403)
    }

    if (!(await checkPassword(body.currentPassword, user.password))) {
      return redirect(`/users/${userId}/edit?error=wrong-current-password`)
    }

    const newEncryptedPassword = await encryptPassword(body.newPassword)
    await db('users').update('password', newEncryptedPassword).where('id', userId)

    return redirect(`/users/${user.id}/edit?success=true`)
  }
)
