interface Env {
  EMAIL_TOKEN: string
  EMAIL_API_URL: string
  LOGINS: KVNamespace
}

interface LoginInfo {
  lastLoginDate: string
  unusedCodes: number
  codeHash: string
}

export const onRequest: PagesFunction<Env> = async (context) => {
  // Validate the email parameter (alphanumeric, hyphen, underscore, period)
  if (typeof context.params.email != "string") {
    return new Response(null, { status: 400 })
  }
  const valid = /^[a-zA-Z0-9_\-\.]*$/.test(context.params.email)
  if (!valid) {
    return new Response(null, { status: 400 })
  }

  // Get our email address now that we trust it
  const email = `${context.params.email.toLowerCase()}@stanford.edu`
  
  // Prevent spamming (in the future we can has, but right now I want to check for spam)
  const loginString = await context.env.LOGINS.get(email)
  const now = new Date()
  var newUnusedCodes = 0
  if (loginString !== null) {
    const info: LoginInfo = JSON.parse(loginString)
    const lastLogin = Date.parse(info.lastLoginDate)
    if (now.getTime() - lastLogin < 1000 * 60 * 2) { // Can only send a new link after 2 minutes
      return new Response(null, { status: 425 })
    }
    if (info.unusedCodes > 5 && now.getTime() - lastLogin < 1000 * 60 * 60 * 24) { // Max out at 5 unused codes per day
      return new Response(null, { status: 425 })
    }
    newUnusedCodes = info.unusedCodes
  }
  newUnusedCodes += 1 // Add to our unused codes (will get cleared later if it's used)

  // Generate a new six-digit code
  // It gets six random numbers and takes the ones digit from each one
  // I doubt this is cryptographically secure and I know reinventing the cryptographic wheel is bad news
  // But this is a really low stakes website so I want to practice
  var newCodeArray = new Uint16Array(6)
  crypto.getRandomValues(newCodeArray) // Get six random numbers
  const newCode = newCodeArray.map((n) => n%10).join("")
  const newCodeHash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(newCode))

  const newInfo: LoginInfo = {
    lastLoginDate: now.toUTCString(),
    unusedCodes: newUnusedCodes,
    codeHash: new TextDecoder("utf-8").decode(newCodeHash)
  }
  await context.env.LOGINS.put(email, JSON.stringify(newInfo))

  // Now, we can actually send the email!
  const url = context.env.EMAIL_API_URL
  const headers = {
    "authorization": context.env.EMAIL_TOKEN
  }
  const body = {
    "to": email,
    "from": { "email": "info@unofficialtheater.directory", "name": "Theater Directory 🌲" },
    "subject": "Your login code!",
    "text": `Your login code is ${newCode}. Please don't share with anyone. It expires in 10 minutes.`
  }

  const resp = await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body)
  })
  return resp
}

