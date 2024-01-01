import { createRouteParamSelector, redirect } from 'prismy'
import p from '../prismy'
import db from '../db/db'
import { render, renderErrorPage } from '../render'
import { listPosts } from '../db/methods'
import { currentUserSelector, urlEncodedBodySelector } from '../selectors'
import { isString } from '../validators'

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

export const usersEditPageHandler = p([createRouteParamSelector('userId')], async userId => {
  const user = (await db('users').select('id', 'name').where('id', userId))[0]

  if (user == null) {
    return renderErrorPage('Not Found', 'The user does not exist.', 404)
  }

  return render('users.edit', {
    user
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
