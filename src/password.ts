import bcrypt from 'bcrypt'

const saltRounds = 10

export function encryptPassword(password: string): Promise<string> {
  return bcrypt.hash(password, saltRounds)
}

export function checkPassword(password: string, encrypted: string) {
  return bcrypt.compare(password, encrypted)
}
