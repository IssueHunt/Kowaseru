import createSession from 'prismy-session'
import JWTCookieStrategy from 'prismy-session-strategy-jwt-cookie'

const secret = process.env.SESSION_SECRET

if (secret == null || secret.length <= 0) {
  throw new Error('Configure Session Secret!!')
}

export const { sessionSelector, sessionMiddleware } = createSession(
  new JWTCookieStrategy({
    secret
  })
)
