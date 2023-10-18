interface Env {
  USERS: KVNamespace
  LOGINS: KVNamespace
  SESSIONS: KVNamespace
  IDS: KVNamespace
}

interface LoginAttempt {
  code: string
  email: string
}

interface LoginInfo {
  lastLoginDate: string
  unusedCodes: number
  codeHash: string
}

import { UserInfo } from '@/helpers/user'

export const onRequest: PagesFunction<Env> = async (context) => {
  // We are expecting the login code and email
  try {
    // Make sure it's a post request
    if (context.request.method !== "POST") {
      return new Response(null, { status: 405 })
    }
    
    const loginAttempt: LoginAttempt = await context.request.json()
    loginAttempt.email = loginAttempt.email.toLowerCase()
    const loginInfoString = await context.env.LOGINS.get(loginAttempt.email)
    if (!loginInfoString) {
      return new Response(JSON.stringify({ error: "Something went wrong. Try requesting a new code." }), { status: 401 })
    }
    var loginInfo: LoginInfo = JSON.parse(loginInfoString)

    // Is the code correct (and not already used, which is true if there are zero unusedCodes)?
    const attemptedCodeHash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(loginAttempt.code))
    const correctCode = loginInfo.codeHash === (new TextDecoder("utf-8").decode(attemptedCodeHash))
    const codeAlreadyUsed = loginInfo.unusedCodes === 0

    // Has it been less than 10 minutes?
    const now = new Date()
    const lastLogin = Date.parse(loginInfo.lastLoginDate)
    const codeTimedOut = (now.getTime() - lastLogin >= 1000 * 60 * 10) || (now.getTime() < lastLogin)

    if (!correctCode) {
      return new Response(JSON.stringify({ error: "Incorrect code" }), { status: 401 })
    }

    // If the code is already used or timed out, return an error
    if (codeTimedOut) {
      return new Response(JSON.stringify({ error: "Code timed out. Please request a new code." }), { status: 401 })
    }
    if (codeAlreadyUsed) {
      return new Response(JSON.stringify({ error: "You've already used that code. Please request a new one." }), { status: 401 })
    }    

    // If the code is correct, reset last correct code
    loginInfo.unusedCodes = 0
    await context.env.LOGINS.put(loginAttempt.email, JSON.stringify(loginInfo))

    // Make a session ID for them!
    const newSessionId = crypto.randomUUID()
    const sessionHash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(newSessionId))
    const sessionHashKey = new TextDecoder("utf-8").decode(sessionHash)

    // Try to get their user ID from their email
    var userId: (string | null) = await context.env.IDS.get(loginAttempt.email)

    // If their user ID is null, make them a new user profile
    if (userId === null) {
      userId = crypto.randomUUID()
      var newUserInfo: UserInfo = { id: userId, accountEmail: loginAttempt.email }
      await context.env.USERS.put(userId, JSON.stringify(newUserInfo))
      await context.env.IDS.put(loginAttempt.email, userId)
    }

    // Okay, now save the user ID into the sessions list
    // It will only last for 30 days
    await context.env.SESSIONS.put(sessionHashKey, userId, { expirationTtl: 60 * 60 * 24 * 30 })

    // Lastly, save the cookie!
    const headers = {
      "Set-Cookie": `session=${newSessionId};HttpOnly;Secure;SameSite=Strict;Path=/`
    }

    // Returns the User ID and sets the session ID cookie
    return new Response(JSON.stringify({ userId }), { status: 200, headers: headers })
  } catch (e) {
    return new Response(JSON.stringify({ error: "Something went wrong. Try requesting a new code." }), { status: 500 })
  }
}