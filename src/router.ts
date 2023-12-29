import { router } from 'prismy'
import homePageHandler from './routes/home'
import publicHandler from './routes/public'
import { signInHandler, signInPageHandler } from './routes/signin'
import { signUpHandler, signUpPageHandler } from './routes/signup'
import { signOutHandler } from './routes/signout'
import { postsCreateHandler, postsDeleteHandler } from './routes/posts'

export default router([
  ['/', homePageHandler],

  ['/signin', signInPageHandler],
  [['/signin', 'post'], signInHandler],
  ['/signup', signUpPageHandler],
  [['/signup', 'post'], signUpHandler],
  [['/signout', 'post'], signOutHandler],

  [['/posts', 'post'], postsCreateHandler],
  [['/posts/:postId/delete', 'post'], postsDeleteHandler],

  ['/public/:publicFilePath+', publicHandler]
])
