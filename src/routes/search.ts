import { render } from '../render'
import p from '../prismy'
import { listPosts } from '../db/methods'
import { deepQuerySelector } from '../selectors'

const searchPageHandler = p([deepQuerySelector], async query => {
  return render('search', {
    keyword: query.keyword as string,
    posts: await listPosts({
      userId: query.user_id,
      keyword: query.keyword as string
    }),
    error: query.error
  })
})

export default searchPageHandler
