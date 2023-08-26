interface Env {
  USERS: KVNamespace
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const authVerify = await fetch("/api/auth/verify")
  if (authVerify.status !== 200) {
    return Response.redirect("https://unofficialtheater.directory/")
  }

  const userList = await context.env.USERS.list()
  const allUsers = await Promise.all(userList.keys.map(async (userKey) => {
    try {
      const userInfoString = await context.env.USERS.get(userKey.name)
      return JSON.parse(userInfoString)
    } catch (e) {
      console.log("Couldn't get user info")
    }
  }))
  return Response.json({ allUsers })
}