import { router } from 'prismy'
import homePageHandler from './routes/home'
import publicHandler from './routes/public'
import { signInHandler, signInPageHandler } from './routes/signin'
import { signUpHandler, signUpPageHandler } from './routes/signup'
import { signOutHandler } from './routes/signout'
import { postsCreateHandler, postsDeleteHandler } from './routes/posts'
import { commentsCreateHandler, commentsDeleteHandler } from './routes/comments'
import {
  usersEditPageHandler,
  usersLinksCreateHandler,
  usersLinksDeleteHandler,
  usersPasswordUpdateHandler,
  usersShowPageHandler,
  usersUpdateHandler
} from './routes/users'
import p from './prismy'
import { render } from './render'
import searchPageHandler from './routes/search'

export default router(
  [
    ['/', homePageHandler],

    ['/signin', signInPageHandler],
    [['/signin', 'post'], signInHandler],
    ['/signup', signUpPageHandler],
    [['/signup', 'post'], signUpHandler],
    [['/signout', 'post'], signOutHandler],

    [['/posts', 'post'], postsCreateHandler],
    [['/posts/:postId/delete', 'post'], postsDeleteHandler],
    [['/comments', 'post'], commentsCreateHandler],
    [['/comments/:commentId/delete', 'post'], commentsDeleteHandler],

    ['/users/:userId', usersShowPageHandler],
    ['/users/:userId/edit', usersEditPageHandler],
    [['/users/:userId', 'post'], usersUpdateHandler],
    [['/users/:userId/password', 'post'], usersPasswordUpdateHandler],
    [['/users/:userId/user-links', 'post'], usersLinksCreateHandler],
    [['/users/:userId/user-links/delete', 'post'], usersLinksDeleteHandler],

    ['/search', searchPageHandler],

    ['/public/:publicFilePath+', publicHandler]
  ],
  {
    notFoundHandler: p([], () => {
      return render(
        'error',
        {
          errorName: 'Not Found',
          errorDescription: 'The page does not exist.'
        },
        404
      )
    })
  }
)
