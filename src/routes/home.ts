import { render } from '../render'
import p from '../prismy'
import db from '../db'
import { querySelector } from 'prismy'

const homePageHandler = p([querySelector], async query => {
  const posts = await db('posts')
    .leftJoin('users', 'posts.user_id', '=', 'users.id')
    .select('posts.id', 'posts.content', 'posts.user_id as user_id', 'users.name as user_name', 'created_at')

  return render('home', { posts, error: query.error })
})

export default homePageHandler
