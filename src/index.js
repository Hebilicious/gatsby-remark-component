const visit = require("unist-util-visit")
import { html } from "./html-tags.js"

console.log("Initializing gatsby-remark-component")
module.exports = ({ markdownAST }, { components }) => {
  if (!components || components.length == 0) {
    setParentForNonHtmlElements(markdownAST)
    return
  }
  if (components.length > 0) {
    setParentForComponents(markdownAST, components)
  }

  function setParentForComponents(markdownAST, components) {
    components.forEach(comp => {
      visit(markdownAST, `html`, (node, index, parent) => {
        if (node.value == `<${comp}>`) {
          console.log(`Setting type of ${comp} parent to div.`)
          parent.type = "div"
        }
      })
    })
  }

  function setParentForNonHtmlElements(markdownAST) {
    visit(markdownAST, "html", (node, index, parent) => {
      if (
        !html.some(
          tag => node.value == `<${tag}>` || node.value.startsWith(`<${tag} `)
        )
      ) {
        console.log("Found a custom tag " + node.value)
        parent.type = "div"
      }
    })
  }
}
