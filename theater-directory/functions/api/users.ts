interface Env {
  USERS: KVNamespace
}

export const onRequest: PagesFunction<Env> = async (context) => {
  return Response.json({ allUsers: [ { "name": "Anna M", "graduationYear": 2024, "accountEmail": "amist@stanford.edu", "waysToLearn": [], "personalEmail": "amist@gmail.com", "rolesOfInterest": [ "Producer", "Actor", "Writer", "Deviser", "Run Crew", "Orchestra" ], "rolesToLearn": [ "Intimacy Director", "Board Operator", "Hair and Makeup" ], "instruments": [ "Cymbals" ], "notes": "Nothing!" }, { "name": "Jayda A", "graduationYear": 2024, "accountEmail": "jayda@stanford.edu", "waysToLearn": [], "personalEmail": "jayda@gmail.com", "rolesOfInterest": [ "Director", "Actor" ], "rolesToLearn": [ "Intimacy Director", "Board Operator", "Hair and Makeup" ], "instruments": [ "Cymbals" ], "notes": "Nothing!" } ]})
  const userList = await context.env.USERS.list()
  const allUsers = await Promise.all(userList.keys.map(async (userKey) => {
    try {
      const userInfo = await context.env.USERS.get(userKey.name)
      return userInfo
    } catch (e) {
      console.log("Couldn't get user info")
    }
  }))
  return Response.json({ allUsers })
}