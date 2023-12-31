import { createRouteParamSelector, redirect } from 'prismy'
import p from '../prismy'
import { currentUserSelector, urlEncodedBodySelector } from '../selectors'
import { render } from '../render'
import { isString } from '../validators'
import db from '../db/db'

export const commentsCreateHandler = p([currentUserSelector, urlEncodedBodySelector], async (currentUser, body) => {
  if (currentUser == null) {
    return render(
      'error',
      {
        errorName: 'Unauthenticated',
        errorDescription: 'Please sign up/in.'
      },
      401
    )
  }

  if (!isString(body.content) || body.content.length === 0) {
    return render(
      'error',
      {
        errorName: 'Missing Content',
        errorDescription: 'Write something'
      },
      422
    )
  }

  const postId = body.post_id
  const post = (isString(postId) && (await db('posts').select('id').where('id', '=', postId).limit(1))[0]) || null

  if (post == null) {
    return render(
      'error',
      {
        errorName: 'Missing Post',
        errorDescription: 'The post does not exist.'
      },
      404
    )
  }

  await db('comments').insert({
    content: body.content,
    post_id: post.id,
    user_id: currentUser.id
  })

  const hash = `#post-${post.id}`

  return redirect('/' + hash)
})

export const commentsDeleteHandler = p(
  [currentUserSelector, createRouteParamSelector('commentId')],
  async (currentUser, commentId) => {
    if (currentUser == null) {
      return render(
        'error',
        {
          errorName: 'Unauthenticated',
          errorDescription: 'Please sign up/in.'
        },
        401
      )
    }

    const comment = (await db('comments').select('id', 'user_id', 'post_id').where('id', commentId))[0]
    if (comment == null) {
      return render(
        'error',
        {
          errorName: 'Not Found',
          errorDescription: 'The comment does not exist'
        },
        404
      )
    }

    if (comment.user_id !== currentUser.id) {
      return render(
        'error',
        {
          errorName: 'Forbidden',
          errorDescription: 'Only the writer can delete the comment.'
        },
        403
      )
    }

    await db('comments').delete().where('id', commentId)

    const hash = `#post-${comment.post_id}`

    return redirect('/' + hash)
  }
)
