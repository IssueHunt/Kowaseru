import { User } from 'knex/types/tables'
import { AsyncSelector, SyncSelector, createUrlEncodedBodySelector } from 'prismy'
import { sessionSelector } from './session'
import db from './db/db'
import qs from 'qs'

export const urlEncodedBodySelector = createUrlEncodedBodySelector()

export const currentUserSelector: AsyncSelector<Pick<User, 'id' | 'name'> | null> = async context => {
  const session = await sessionSelector(context)

  if (session.data?.uid == null) {
    return null
  }

  const user = (await db('users').select('id', 'name').where('id', session.data.uid).limit(1))[0]

  return user
}

export const deepQuerySelector: SyncSelector<any> = context => {
  return qs.parse(new URL(context.req.url!, 'http://dummy.url').search.slice(1))
}
