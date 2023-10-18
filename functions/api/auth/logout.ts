interface Env {
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
  try {
    // Look up the session ID
    const sessionId = parseCookie("session", context.request.headers.get("Cookie") || "")
    if (!sessionId) {
      return Response.json(null, { status: 200 }) // Already logged out, all is well:)
    }
    // Remove session ID from the sessions database
    const sessionHash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(sessionId))
    await context.env.SESSIONS.delete(new TextDecoder("utf-8").decode(sessionHash))

    // No need to clear the session cookie because it's already out of the database
    return Response.json(null, { status: 200 })
  } catch (e) {
    return Response.json(null, { status: 500 })
  }
}