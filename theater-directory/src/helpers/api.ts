import { UserInfo } from "@/helpers/classes"

export const getUserInfo = async(id: string) => {
  try {
    const { userInfo } = await (await fetch(`/api/user/get/${id}`)).json()
    return userInfo
  } catch {
    return { error: "Could not load user info" }
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
    const { allUsers } = await (await fetch(`/api/users`)).json()
    return allUsers
  } catch {
    return []
  }
}