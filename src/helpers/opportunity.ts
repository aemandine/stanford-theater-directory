import { type UserInfo } from "@/helpers/user"

export interface OpportunityInfo {
  id: string
  title: string
  content?: string
  authorId?: string // userID
  author?: UserInfo
  expires: Date // when the opportunity expires
  created?: Date
}

export class Opportunity {
  id: string
  title: string
  content?: string
  authorId?: string // userID
  author?: UserInfo
  expires: Date // when the opportunity expires
  created?: Date

  protected constructor(opportunityInfo: OpportunityInfo) {
    this.id = opportunityInfo.id
    this.title = opportunityInfo.title
    this.content = opportunityInfo.content
    this.authorId = opportunityInfo.authorId
    this.author = opportunityInfo.author
    this.expires = new Date(opportunityInfo.expires)
    this.created = opportunityInfo.created ? new Date(opportunityInfo.created) : undefined
  }

  /**
   * Retrieves an Opportunity with specified opportunityID from the database.
   * 
   * @static
   * @async
   * @param {string} opportunityId - The ID of the opportunity we want to load.
   * @return {Promise<Opportunity | null>} The new opportunity, or null if load failed.
   */
  public static async init(opportunityId: string): Promise<Opportunity | null> {
    try {
      const resp = await fetch(`/api/opportunity/get/${opportunityId}`)
      if (resp.status === 200) {
        const { opportunityInfo } = await resp.json()
        return new Opportunity(opportunityInfo)
      } else {
        return null
      }
    } catch {
      return null
    }
  }

  /**
   * Retrieves an Opportunity with specified opportunityID from the database.
   * 
   * @static
   * @param {string} opportunityId - The ID of the opportunity we want to load.
   * @return {Promise<Opportunity | null>} The new opportunity, or null if load failed.
   */
  public static new(): Opportunity {
    const defaultExpiration: Date = new Date(Date.now() + 1000 * 60 * 60 * 24 * 14) // two weeks from now
    // do not include an ID here because we come up with an ID on the backend so people can't overwrite existing
    return new Opportunity({ id: "", title: "", expires: defaultExpiration })
  }

  /**
   * Creates the metadata label for the opportunity. The first part is not linked, and the second
   * links to a user's profile
   * 
   * @static
   * @return {{ label: string, linkedLabel: string }} The metadata information in two parts
   */
  public getMetadata(): { label: string, linkedLabel: string } {
    var label = "Posted"
    var linkedLabel = ""
    if (this.created) {
      label += ` ${this.created.getMonth() + 1}/${this.created.getDate()}/${this.created.getFullYear()}`
    }
    if (this.author) {
      label += " by"
      if (this.author.name) {
        linkedLabel = `${this.author.name} (${this.author.accountEmail})`
      } else {
        linkedLabel = this.author.accountEmail
      }
    }
    return { label, linkedLabel }
  }

  /**
   * Saves this Opportunity to the database.
   * 
   * @async
   * @param {boolean} create - Whether we're creating a new one (true) or just editing (false)
   * @return {Promise<boolean>} Whether or not the save succeeded. 
   */
  public async save(create: boolean): Promise<boolean> {
    try {
      const headers = {
        "Content-Type": "application/json"
      }
      const resp = await fetch(`/api/opportunity/${create ? 'new' : 'set'}`, {
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
   * Deletes this Opportunity from the database.
   * 
   * @async
   * @return {Promise<boolean>} Whether or not the delete succeeded. 
   */
  public async delete(): Promise<boolean> {
    try {
      const headers = {
        "Content-Type": "application/json"
      }
      const resp = await fetch(`/api/opportunity/delete/${this.id}`, {
        method: "DELETE",
        headers: headers
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
   * Retrieves all (unexpired) Opportunities from the database.
   * 
   * @static
   * @async
   * @return {Promise<Opportunity[] | null>} All opportunities, or null if load failed.
   */
  public static async upcomingOpportunities(): Promise<Opportunity[] | null> { 
    try {
      const resp = await fetch("/api/opportunities")
      if (resp.status === 200) {
        const { upcomingOpportunities } = await resp.json()
        return upcomingOpportunities.map((opp: OpportunityInfo) => {
          if (opp) { // sometimes opp will be null if we just deleted something
            return new Opportunity(opp)
          }
        })
      } else {
        return null
      }
    } catch {
      return null
    }
  }
}