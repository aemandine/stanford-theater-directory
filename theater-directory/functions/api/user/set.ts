interface Env {
  USERS: KVNamespace
}

import { type UserInfo } from '@/helpers/user'
import Categories from '@/helpers/categories'

export const onRequest: PagesFunction<Env> = async (context) => {
  try {
    const authVerify = await fetch(
      "https://unofficialtheater.directory/api/auth/verify",
      { headers: context.request.headers }
      )
    const { userId }: { userId: string | null } = await authVerify.json()
    var userInfo: UserInfo = await context.request.json()

    // Only set information for a user we have the cookies to set for
    if (userId === null || userId !== userInfo.id) {
      return new Response(null, { status: 401 })
    }

    // Make sure none of the lists contain things not from approved categories
    // Also, sort everything while we're at it
    userInfo.rolesOfInterest = userInfo.rolesOfInterest?.filter((item) => Categories.ROLES.includes(item)).sort()
    userInfo.rolesToLearn = userInfo.rolesToLearn?.filter((item) => Categories.ROLES.includes(item)).sort()
    userInfo.waysToLearn = userInfo.waysToLearn?.filter((item) => Categories.WAYS_TO_LEARN.includes(item)).sort()
    userInfo.instruments = userInfo.instruments?.filter((item) => Categories.INSTRUMENTS.includes(item)).sort()

    if (!Categories.YEARS.includes(userInfo.graduationYear)) {
      userInfo.graduationYear = undefined
    }

    // Okay, all good, let's save it
    await context.env.USERS.put(userId, JSON.stringify(userInfo))
    return new Response(null, { status: 200 })
  } catch {
    return new Response(null, { status: 500 })
  }
}