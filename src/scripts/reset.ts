import db from '../db/db'
import { encryptPassword } from '../password'

const seedUsers = [
  { email: 'tester1@test.com', name: 'tester1', password: 'tester1' },
  { email: 'attacker1@attacker.com', name: 'attacker1', password: 'attacker1' }
]

async function reset() {
  // Delete all row data, children before parents to respect FKs.
  // Keeps the tables (and applied migrations) intact.
  await db('comments').del()
  await db('user_links').del()
  await db('posts').del()
  await db('users').del()

  // Reset auto-increment so seeded ids are predictable (1, 2, ...).
  await db.raw('ALTER TABLE comments AUTO_INCREMENT = 1')
  await db.raw('ALTER TABLE user_links AUTO_INCREMENT = 1')
  await db.raw('ALTER TABLE posts AUTO_INCREMENT = 1')
  await db.raw('ALTER TABLE users AUTO_INCREMENT = 1')

  for (const user of seedUsers) {
    await db('users').insert({
      email: user.email,
      name: user.name,
      password: await encryptPassword(user.password)
    })
    console.log(`Seeded user ${user.email} (password: ${user.password})`)
  }
}

reset()
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(() => db.destroy())
