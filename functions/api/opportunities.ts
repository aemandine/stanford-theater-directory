interface Env {
  OPPORTUNITIES: KVNamespace
  USERS: KVNamespace
}

import { OpportunityInfo } from "@/helpers/opportunity"
import { UserInfo } from "@/helpers/user"

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

    const now = Date.now()
    const opportunitiesList = await context.env.OPPORTUNITIES.list()
    var upcomingOpportunities = await Promise.all(opportunitiesList.keys.map(async (opportunityKey) => {
      try {
        const opportunityString = await context.env.OPPORTUNITIES.get(opportunityKey.name)
        var opp: OpportunityInfo = JSON.parse(opportunityString)

        // Don't add if it's expired
        if (new Date(opp.expires).getTime() <= now) {
          return
        }

        // Get author information
        const userString = await context.env.USERS.get(opp.authorId) // Get user name and accountEmail
        const user: UserInfo = JSON.parse(userString)
        opp.author = { id: opp.authorId, accountEmail: user.accountEmail, name: user.name }

        return opp
      } catch { return }
    }))
    // Remove nulls (e.g. expired dates)
    upcomingOpportunities = upcomingOpportunities.filter((item) => !!item)
    return new Response(JSON.stringify({ upcomingOpportunities }), { status: 200 })
  } catch (e) {
    return new Response(JSON.stringify({ error: e }), { status: 500 })
  }
}