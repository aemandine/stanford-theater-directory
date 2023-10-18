interface Env {
  OPPORTUNITIES: KVNamespace
}

import { OpportunityInfo } from '@/helpers/opportunity'

// Accepts a title and content, adds UUID and userID
export const onRequest: PagesFunction<Env> = async (context) => {
  try {
    // Make sure it's a post request
    if (context.request.method !== "POST") {
      return new Response(null, { status: 405 })
    }
    const authVerify = await fetch(
      "https://unofficialtheater.directory/api/auth/verify",
      { headers: context.request.headers }
      )
    const { userId }: { userId: string | null } = await authVerify.json()
    if (userId === null) {
      return new Response(null, { status: 401 })
    }
    const request: OpportunityInfo = await context.request.json()

    if (request.title == "") { // We need a title
      return new Response(null, { status: 400 })
    }

    const opportunityInfoString = await context.env.OPPORTUNITIES.get(request.id)
    var opportunityInfo: OpportunityInfo = JSON.parse(opportunityInfoString)

    // Check that we are the author
    if (opportunityInfo.authorId !== userId) {
      return new Response(null, { status: 401 })
    }

    // Only change the mutable things
    opportunityInfo.title = request.title
    opportunityInfo.content = request.content
    opportunityInfo.expires = request.expires

    await context.env.OPPORTUNITIES.put(opportunityInfo.id, JSON.stringify(opportunityInfo))
    return new Response(null, { status: 200 })
  } catch {
    return new Response(null, { status: 500 })
  }
}