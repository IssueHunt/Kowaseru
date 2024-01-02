import { render, renderErrorPage } from '../render'
import p from '../prismy'
import { querySelector } from 'prismy'
import { listPosts } from '../db/methods'
import { isString } from '../validators'

const searchPageHandler = p([querySelector], async query => {
  if (!isString(query.keyword)) {
    return renderErrorPage('Missing Keyword', 'Please provide keyword', 422)
  }

  return render('search', {
    keyword: query.keyword as string,
    posts: await listPosts({
      keyword: query.keyword as string
    }),
    error: query.error
  })
})

export default searchPageHandler
