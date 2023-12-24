import { createRouteParamSelector, res } from 'prismy'
import fs from 'fs'
import fsPromises from 'fs/promises'
import path from 'path'
import { escapePathString } from '../utils'
import mime from 'mime'
import p from '../prismy'

const publicHandler = p([createRouteParamSelector('publicFilePath')], async publicFilePath => {
  const targetPath = path.join(process.cwd(), 'public', escapePathString((publicFilePath as any as string[]).join('/')))

  const contentType = mime.getType(targetPath) || 'application/octet-stream'

  try {
    await fsPromises.stat(targetPath)
  } catch (error) {
    console.log((error as any).code !== 'ENOENT')
    if ((error as any).code !== 'ENOENT') {
      throw error
    }
    return res('Not Found', 404)
  }

  const stream = fs.createReadStream(targetPath)

  return res(stream, 200, {
    'Content-Type': contentType
  })
})

export default publicHandler
