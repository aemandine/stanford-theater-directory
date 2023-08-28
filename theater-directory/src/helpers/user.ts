export interface UserInfo {
  id: string
  name?: string
  graduationYear?: number
  accountEmail: string
  pronouns?: string
  rolesOfInterest?: string[]
  rolesToLearn?: string[]
  instruments?: string[]
  waysToLearn?: string[]
  notes?: string
}

export class User {
  id: string
  name?: string
  graduationYear?: number
  accountEmail: string
  pronouns?: string
  rolesOfInterest?: string[]
  rolesToLearn?: string[]
  instruments?: string[]
  waysToLearn?: string[]
  notes?: string

  protected constructor(userInfo: UserInfo) {
    this.id = userInfo.id
    this.name = userInfo.name
    this.graduationYear = userInfo.graduationYear
    this.accountEmail = userInfo.accountEmail
    this.pronouns = userInfo.pronouns
    this.rolesOfInterest = userInfo.rolesOfInterest
    this.rolesToLearn = userInfo.rolesToLearn
    this.instruments = userInfo.instruments
    this.waysToLearn = userInfo.waysToLearn
    this.notes = userInfo.notes
  }

  /**
   * Retrieves a User with specified userId from the database.
   * 
   * @static
   * @async
   * @param {string} userId - The user ID of the user we want to load.
   * @return {Promise<User | null>} The new user, or null if load failed.
   */
  public static async init(userId: string): Promise<User | null> {
    try {
      const resp = await fetch(`/api/user/get/${userId}`)
      if (resp.status === 200) {
        const { userInfo } = await resp.json()
        return new User(userInfo)
      } else {
        return null
      }
    } catch {
      return null
    }
  }

  /**
   * Saves this User to the database.
   * 
   * @async
   * @return {Promise<boolean>} Whether or not the save succeeded. 
   */
  public async save(): Promise<boolean> {
    try {
      const headers = {
        "Content-Type": "application/json"
      }
      const resp = await fetch("/api/user/set", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(this)
      })
      if (resp.status === 200) {
        return true
      }
      return false
    } catch {
      return false
    }
  }

  /**
   * Retrieves all Users from the database.
   * 
   * @static
   * @async
   * @return {Promise<User[] | null>} All users, or null if load failed.
   */
  public static async allUsers() { 
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
}