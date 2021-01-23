import Iron from '@hapi/iron'

const { TOKEN_SECRET } = process.env

export function encryptSession(session) {
  return session && Iron.seal(session, TOKEN_SECRET, Iron.defaults)
}

export function decryptSession (session) {
  return session && Iron.unseal(session, TOKEN_SECRET, Iron.defaults)
}
