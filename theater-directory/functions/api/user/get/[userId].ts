interface Env {
  USERS: KVNamespace
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const authVerify = await fetch("/api/auth/verify")
  if (authVerify.status !== 200) {
    return Response.redirect("https://unofficialtheater.directory/")
  }

  let userId = context.params.userId
  if (typeof userId !== "string") {
    return Response.json({ error: "Malformed api request" })
  }
  try {
    const userInfoString = await context.env.USERS.get(userId)
    if (userInfoString === null) {
      return Response.json({ error: "No info for that user" })
    }
    const userInfo = JSON.parse(userInfoString)
    return Response.json({ userInfo })
  } catch (e) {
    return Response.json({ error: "Could not access user" })
  }
}