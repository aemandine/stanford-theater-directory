import { UserInfo } from "@/helpers/classes"

export const isLoggedIn = async() => {
  try {
    const { userId } = await(await fetch("/api/auth/verify")).json()
    if (userId !== null) {
      return true
    } else {
      return false
    }
  } catch {
    return false
  }
}

export const getUserId = async() => {
  try {
    const { userId } = await(await fetch("/api/auth/verify")).json()
    if (userId !== null) {
      return userId
    } else {
      return null
    }
  } catch {
    return null
  }
}

export const getUserInfo = async(id: string) => {
  try {
    const resp = await fetch(`/api/user/get/${id}`)
    if (resp.status === 200) {
      const { userInfo } = await resp.json()
      return userInfo
    } else {
      return null
    }
  } catch {
    return null
  }
}

export const setUserInfo = async(id: string, userInfo: UserInfo, midSave?: any) => {
  // Sort everything into alphabetical order before saving
  userInfo.rolesOfInterest = userInfo.rolesOfInterest.sort()
  userInfo.rolesToLearn = userInfo.rolesToLearn.sort()
  userInfo.instruments = userInfo.instruments.sort()
  userInfo.waysToLearn = userInfo.waysToLearn.sort()
  if (midSave) {
    midSave.value = true
  }
  const headers = {
    "Content-Type": "application/json"
  }
  const resp = await fetch(`/api/user/set/${id}`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(userInfo)
  })
  if (midSave) {
    midSave.value = false
  }
}

export const getUsers = async() => {
  try {
    const resp = await fetch("/api/users")
    if (resp.status === 200) {
      const { allUsers } = await resp.json()
      return allUsers
    } else {
      return null
    }
  } catch {
    return null
  }
}