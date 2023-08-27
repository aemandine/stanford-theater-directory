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

  const userList = await context.env.USERS.list()
  const allUsers = await Promise.all(userList.keys.map(async (userKey) => {
    try {
      const userInfoString = await context.env.USERS.get(userKey.name)
      return JSON.parse(userInfoString)
    } catch {
      return new Response(null, { status: 500 })
    }
  }))
  return new Response(JSON.stringify({ allUsers }), { status: 200 })
}