export class Filters {
  interestLevels: InterestLevel[] = []
  role: string = ""
  learningStyles: string[] = []
  instruments: string[] = []
  hasFilter() {
    return this.role || this.interestLevels.length > 0
  }
  sortBy: string = "" // should be a UserInfo class
  sortReversed: boolean = false
}

export enum InterestLevel {
  Interested = "are interested in",
  WantToLearn = "want to learn more about"
}