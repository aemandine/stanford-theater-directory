export class UserInfo {
  id: string = ""
  name: string = ""
  graduationYear: number = 0
  accountEmail: string = ""
  personalEmail: string = ""
  rolesOfInterest: string[] = []
  rolesToLearn: string[] = []
  notes: string = ""
  instruments: string[] = []
  waysToLearn: string[] = []
}

export class Filters {
  interestLevels: InterestLevel[] = []
  role: string = ""
  isEmpty() {
    return !this.role && this.interestLevels.length == 0
  }
}

export enum InterestLevel {
  Interested = "are interested in",
  WantToLearn = "want to learn more about"
}