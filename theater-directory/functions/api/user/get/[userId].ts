interface Env {
  USERS: KVNamespace
}

export const onRequest: PagesFunction<Env> = async (context) => {
  //return Response.json({ userInfo: {"name":"Anna M","graduationYear":2024,"accountEmail":"amist@stanford.edu","primaryEmail":"amist@gmail.com","rolesOfInterest":["Producer", "Actor", "Writer", "Deviser", "Run Crew"],"rolesToLearn":["Intimacy Director", "Board Operator", "Hair and Makeup"],"notes":"Nothing!","instruments":[]}})
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