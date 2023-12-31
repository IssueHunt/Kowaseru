import { createRouteParamSelector } from 'prismy'
import p from '../prismy'
import db from '../db/db'
import { render } from '../render'
import { listPosts } from '../db/methods'

export const usersShowPageHandler = p([createRouteParamSelector('userId')], async userId => {
  const user = (await db('users').select('id', 'name').where('id', userId))[0]

  if (user == null) {
    return render(
      'error',
      {
        errorName: 'Not Found',
        errorDescription: 'The user does not exist.'
      },
      404
    )
  }

  const posts = await listPosts({ userId: user.id })

  return render('user', {
    user,
    posts
  })
})
