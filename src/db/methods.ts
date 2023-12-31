import db from './db'

export async function listPosts(
  filter: Partial<{
    userId: number
  }> = {}
) {
  let postQuery = db('posts')
    .leftJoin('users', 'posts.user_id', '=', 'users.id')
    .select('posts.id', 'posts.content', 'posts.user_id', 'users.name as user_name', 'posts.created_at')

  if (filter.userId != null) {
    postQuery = postQuery.where('user_id', filter.userId)
  }

  const posts = await postQuery

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

  return posts
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
    })
}
