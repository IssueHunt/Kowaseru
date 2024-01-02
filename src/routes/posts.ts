import { createRouteParamSelector, querySelector, redirect, res } from 'prismy'
import { currentUserSelector, urlEncodedBodySelector } from '../selectors'
import p from '../prismy'
import { isString } from '../validators'
import db from '../db/db'
import { render } from '../render'

export const postsCreateHandler = p([currentUserSelector, urlEncodedBodySelector], async (currentUser, body) => {
  if (currentUser == null) {
    return render('error', {
      errorName: 'Unauthenticated',
      errorDescription: 'Please sign up/in.'
    })
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

export const postsDeleteHandler = p(
  [currentUserSelector, createRouteParamSelector('postId'), urlEncodedBodySelector],
  async (currentUser, postId, body) => {
    if (currentUser == null) {
      return render('error', {
        errorName: 'Unauthenticated',
        errorDescription: 'Please sign up/in.'
      })
    }

    const post =
      (postId != null && (await db('posts').select('id', 'user_id').where('id', '=', postId).limit(1))[0]) || null

    if (post == null) {
      return render('error', {
        errorName: 'Missing Post',
        errorDescription: 'The post does not exist.'
      })
    }

    if (currentUser.id !== post.user_id) {
      return render('error', {
        errorName: 'Forbidden',
        errorDescription: 'Only the original writer can delete the post.'
      })
    }

    await db('posts').where('id', '=', postId).delete()

    // VUL: Open Redirect
    const redirectTo = isString(body.from) ? body.from : '/'

    return redirect(redirectTo)
  }
)
