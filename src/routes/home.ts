import { render } from '../render'
import p from '../prismy'
import { querySelector } from 'prismy'
import { listPosts } from '../db/methods'

const homePageHandler = p([querySelector], async query => {
  return render('home', {
    posts: await listPosts(),
    error: query.error
  })
})

export default homePageHandler
