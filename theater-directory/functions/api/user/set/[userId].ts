interface Env {
  USERS: KVNamespace
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const authVerify = await fetch("/api/auth/verify")
  if (authVerify.status !== 200) {
    return Response.redirect("https://unofficialtheater.directory/")
  }

  let userId = context.params.userId
  let userInfo = context.request.body
  if (typeof userId !== "string") {
    return Response.json({ error: "Malformed api request" })
  }
  try {
    await context.env.USERS.put(userId, userInfo)
    return Response.json({ status: 200 })
  } catch (e) {
    return Response.json({ error: "Could not set user" })
  }
}