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