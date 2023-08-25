interface Env {
  USERS: KVNamespace
  SESSIONS: KVNamespace
}

export const onRequest: PagesFunction<Env> = async (context) => {
  // Look up the session ID
  if (!context.request.headers.has("Authorization")) {
    return new Response(null, { status: 401 })
  }
  const sessionId = context.request.headers.get("Authorization")
  if (sessionId.length === 0) {
    return new Response(null, { status: 401 })
  }

  // Get the hash of the session ID and look that up
  // (Hash so that no one can steal the database and get all the IDs)
  try {
    const sessionHash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(sessionId))
    const userId = await context.env.SESSIONS.get(new TextDecoder("utf-8").decode(sessionHash))
    return Response.json({ userId })
  } catch (e) {
    return new Response(null, { status: 500 })
  }
}