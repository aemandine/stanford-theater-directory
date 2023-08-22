interface Env {
  REGISTRATIONS: KVNamespace
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const registrations = await context.env.REGISTRATIONS.list()
  const lastActiveDates = await Promise.all(registrations.keys.map(async (x) => {
    try {
      // Take each key and get its lastActive value
      const infoString = await context.env.REGISTRATIONS.get(x.name)
      const info = JSON.parse(infoString)
      if ("lastActive" in info) {
        return info.lastActive
      }
    } catch (e) {
      // If we can't get the lastActive value, it won't be added to the map
      console.log("Couldn't get registration info")
    }
  }))
  return Response.json({ lastActiveDates })
}