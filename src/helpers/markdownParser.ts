export interface MarkdownItem {
  text: string
  bold: boolean
  link?: string
} 

/**
 * Parses markdown text into a list of MarkdownItem lists following these rules:
 * [text](link)
 * **bold and italics**
 * 
 * @param {string} rawText - The raw markdown text to convert
 * @return a list of MarkdownItems
 */
export const parseMarkdown = (rawText: string) => {

  var finalMarkdown: MarkdownItem[][] = []

  // Split it into lines
  rawText.split("\n").forEach((line) => {
  
    var lineMarkdown: MarkdownItem[] = []

    // If they messed up the number of bolds, remove the last one
    if (line.split("**").length % 2 == 0) {
      const loc = line.lastIndexOf("**")
      line = line.substring(0, loc) + line.substring(loc + 2)
    }

    // Link finder
    // Returns all the text but it's split up into normal text, link text, and link URL
    // Each match will return either:
    // ("the whole thing", "link text", "link URL"), OR
    // ("the whole thing") if there are no links
    const linkRegEx = /(.*)(?:\[(.+?)\]\((https?:\/\/[\S]+)\))|(?:.+)/g
    const linkMatches = [...line.matchAll(linkRegEx)]
    linkMatches.forEach((match) => {
      if (match[2] && match[3]) { // If we have a link text and a link URL, add it
        if (match[1]) {
          lineMarkdown.push({text: match[1], bold: false}) // Add the text before
        }
        lineMarkdown.push({text: match[2], bold: false, link: match[3]})
      } else { // Otherwise, just add the text
        lineMarkdown.push({text: match[0], bold: false})
      }
    })

    // Go through all tokens and check for bolding
    const numTokens = lineMarkdown.length
    var pendingBold = false // Is there a bold from the last section that we need to close out?
    for (var i = 0; i < numTokens; i ++) {
      const item = lineMarkdown.shift()
      if (item) {
        const sections = item.text.split("**")
        const boldMod = pendingBold ? 0 : 1 // if there's a pending bold, that shifts our mod
        for (var j = 0; j < sections.length; j ++) {
          lineMarkdown.push({text: sections[j], bold: j % 2 == boldMod, link: item.link})
        }
        // If we have an even number of sections, that's an odd number of **s, which means that
        // the pendingBold status should flip
        if (sections.length % 2 == 0) {
          pendingBold = !pendingBold
        }
      }
    }
    finalMarkdown.push(lineMarkdown)
  })
  return finalMarkdown
}