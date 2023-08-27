interface Env {
  USERS: KVNamespace
}

export const onRequest: PagesFunction<Env> = async (context) => {
  try {
    const authVerify = await fetch(
      "https://unofficialtheater.directory/api/auth/verify",
      { headers: context.request.headers }
      )
    const { userId }: { userId: string | null } = await authVerify.json()
    if (userId === null) {
      return new Response(null, { status: 401 })
    }
  } catch {
    return new Response(null, { status: 500 })
  }

  let userId = context.params.userId
  let userInfo = context.request.body
  if (typeof userId !== "string") {
    return new Response(null, { status: 400 })
  }
  try {
    await context.env.USERS.put(userId, userInfo)
    return new Response(null, { status: 200 })
  } catch {
    return new Response(null, { status: 500 })
  }
}