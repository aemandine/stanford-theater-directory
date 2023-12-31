interface Env {
  USERS: KVNamespace
  SESSIONS: KVNamespace
}

const parseCookie = (cookieName: string, allCookies: string) => {
  const cookiePrefix = cookieName + "="
  var decodedCookie = decodeURIComponent(allCookies)
  var cookies = decodedCookie.split(";")
  for (var i = 0; i < cookies.length; i += 1) {
    const cookie = cookies[i].trim()
    if (cookie.startsWith(cookiePrefix) && cookie !== cookiePrefix) {
      return cookie.substring(cookiePrefix.length)
    }
  }
  return null
}

export const onRequest: PagesFunction<Env> = async (context) => {
  // Get the hash of the session ID and look that up
  // (Hash so that no one can steal the database and get all the IDs)
  try {
    // Look up the session ID
    const sessionId = parseCookie("session", context.request.headers.get("Cookie") || "")
    if (!sessionId) {
      return Response.json({ userId: null })
    }
    const sessionHash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(sessionId))
    const userId = await context.env.SESSIONS.get(new TextDecoder("utf-8").decode(sessionHash))
    if (userId === null) {
      return Response.json({ userId: null })
    }
    return Response.json({ userId })
  } catch (e) {
    return Response.json({ userId: null })
  }
}