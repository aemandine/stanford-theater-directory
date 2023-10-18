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

    if (typeof context.params.userId !== "string") {
      return new Response(null, { status: 400 })
    }
    const userInfoString = await context.env.USERS.get(context.params.userId)
    if (userInfoString === null) {
      return new Response(null, { status: 404 })
    }
    const userInfo = JSON.parse(userInfoString)

    return Response.json({ userInfo })
  } catch {
    return new Response(null, { status: 500 })
  }
}