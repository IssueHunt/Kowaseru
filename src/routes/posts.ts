import { querySelector, redirect, res } from 'prismy'
import { currentUserSelector, urlEncodedBodySelector } from '../selectors'
import p from '../prismy'
import { isString } from '../validators'
import db from '../db'

export const postsCreateHandler = p([currentUserSelector, urlEncodedBodySelector], async (currentUser, body) => {
  if (currentUser == null) {
    return redirect('/?error=unauthenticated')
  }

  if (!isString(body.content) || body.content.length === 0) {
    return redirect('/?error=missing-content')
  }

  await db('posts').insert({
    content: body.content,
    user_id: currentUser.id
  })

  return redirect('/')
})
