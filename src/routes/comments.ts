import { redirect } from 'prismy'
import p from '../prismy'
import { currentUserSelector, urlEncodedBodySelector } from '../selectors'
import { render } from '../render'
import { isString } from '../validators'
import db from '../db'

export const commentsCreateHandler = p([currentUserSelector, urlEncodedBodySelector], async (currentUser, body) => {
  if (currentUser == null) {
    return render('error', {
      errorName: 'Unauthenticated',
      errorDescription: 'Please sign up/in.'
    })
  }

  if (!isString(body.content) || body.content.length === 0) {
    return render('error', {
      errorName: 'Missing Content',
      errorDescription: 'Write something'
    })
  }

  const postId = body.post_id
  const post = (isString(postId) && (await db('posts').select('id').where('id', '=', postId).limit(1))[0]) || null

  if (post == null) {
    return render('error', {
      errorName: 'Missing Post',
      errorDescription: 'The post does not exist.'
    })
  }

  await db('comments').insert({
    content: body.content,
    post_id: post.id,
    user_id: currentUser.id
  })

  const hash = `#post-${post.id}`

  return redirect('/' + hash)
})
