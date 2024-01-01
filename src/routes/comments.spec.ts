import { commentsDeleteHandler } from './comments'
import db from '../db/db'
import { generateComment, generateUser } from '../testUtils'
import assert from 'assert'

describe('commentsDeleteHandler', () => {
  it('deletes a comment', async () => {
    // Given
    const user = await generateUser()
    const comment = await generateComment({
      user_id: user.id
    })

    // When
    const result = await commentsDeleteHandler.handler(user, comment.id.toString(), {})

    // Then
    const list = await db('comments').select('*').where('id', comment.id)
    assert.equal(list.length, 0)
    assert.equal(result.headers?.location, `/#post-${comment.post_id}`)
    assert.equal(result.statusCode, 302)
  })
})
