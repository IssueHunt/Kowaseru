import pug from 'pug'
import path from 'path'
import { res } from 'prismy'

function render(viewFileName: string, locals?: any) {
  const rendered = pug.renderFile(path.join(__dirname, `views/${viewFileName}.pug`), locals)

  return res(rendered)
}

export default render
