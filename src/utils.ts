import path from 'path'

export function escapePathString(value: string) {
  return path.join('/', value)
}
