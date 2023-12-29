import { render } from '../render'
import p from '../prismy'
import db from '../db'
import { querySelector } from 'prismy'

const homePageHandler = p([querySelector], async query => {
  const posts = await db('posts')
    .leftJoin('users', 'posts.user_id', '=', 'users.id')
    .select('posts.id', 'posts.content', 'posts.user_id', 'users.name as user_name', 'posts.created_at')

  const comments = await db('comments')
    .whereIn(
      'post_id',
      posts.map(post => post.id)
    )
    .leftJoin('users', 'comments.user_id', '=', 'users.id')
    .select(
      'comments.id',
      'comments.content',
      'comments.created_at',
      'comments.post_id',
      'comments.user_id',
      'users.name as user_name'
    )

  const postIdCommentListMap: Map<string, any[]> = comments.reduce((map, comment) => {
    let commentList = map.get(comment.post_id)
    if (commentList == null) {
      commentList = []
      map.set(comment.post_id, commentList)
    }
    commentList.push(comment)
    return map
  }, new Map())

  return render('home', {
    posts: posts
      .map(post => {
        return {
          ...post,
          comments: (postIdCommentListMap.get(post.id) || []).sort((a, b) => {
            return a.created_at - b.created_at
          })
        }
      })
      .sort((a, b) => {
        return b.created_at - a.created_at
      }),
    error: query.error
  })
})

export default homePageHandler
