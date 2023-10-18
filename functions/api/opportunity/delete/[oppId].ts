interface Env {
  OPPORTUNITIES: KVNamespace
}

import { OpportunityInfo } from '@/helpers/opportunity'

export const onRequest: PagesFunction<Env> = async (context) => {
  try {
    // Make sure it's a post request
    if (context.request.method !== "DELETE") {
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

    let opportunityId = context.params.oppId
    if (typeof opportunityId !== "string") {
      return new Response(null, { status: 400 })
    }

    const opportunityInfoString = await context.env.OPPORTUNITIES.get(opportunityId)
    if (opportunityInfoString === null) {
      return new Response(null, { status: 404 })
    }
    const opportunityInfo: OpportunityInfo = JSON.parse(opportunityInfoString)

    if (userId !== opportunityInfo.authorId) {
      return new Response(null, { status: 401 })
    }

    // If we've gotten here, the user ID from our cookie matches the author of the post
    // So we can safely delete
    await context.env.OPPORTUNITIES.delete(opportunityId)
    return new Response(null, { status: 200 })
  } catch {
    return new Response(null, { status: 500 })
  }
}