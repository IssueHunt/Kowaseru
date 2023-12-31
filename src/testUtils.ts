import { faker } from '@faker-js/faker'
import { encryptPassword } from './password'
import db from './db'

export async function generateUser() {
  const userName = generateUserName()
  const password = await encryptPassword(generatePassword())
  const email = faker.internet.email()
  const user = (
    await db('users').insert(
      {
        name: userName,
        password,
        email
      },
      ['id', 'name', 'password', 'email']
    )
  )[0]

  return user
}

let count = 0
function generateUserName() {
  return faker.internet.displayName() + count
}

function generatePassword() {
  return faker.string.alphanumeric({ length: { min: 5, max: 10 } })
}

export async function generatePost(partials: Partial<{ user_id: number }> = {}) {
  let user_id = partials.user_id
  if (user_id == null) {
    const user = await generateUser()
    user_id = user.id
  }
  const post = (
    await db('posts').insert(
      {
        content: faker.lorem.paragraph(),
        user_id
      },
      ['id', 'content', 'user_id']
    )
  )[0]
  return post
}

export async function generateComment(partials: Partial<{ user_id: number; post_id: number }> = {}) {
  let user_id = partials.user_id
  if (user_id == null) {
    const user = await generateUser()
    user_id = user.id
  }

  let post_id = partials.post_id
  if (post_id == null) {
    const post = await generatePost()
    post_id = post.id
  }

  const comment = (
    await db('comments').insert(
      {
        post_id,
        user_id,
        content: faker.lorem.sentence()
      },
      ['id', 'post_id', 'user_id', 'content']
    )
  )[0]

  return comment
}
