import { router } from 'prismy'
import homePageHandler from './routes/home'
import publicHandler from './routes/public'

export default router([
  ['/', homePageHandler],
  ['/public/:publicFilePath+', publicHandler]
])
