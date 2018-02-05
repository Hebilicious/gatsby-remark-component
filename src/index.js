const visit = require("unist-util-visit")
import { html } from "./html-tags.js"

module.exports = ({ markdownAST }, { components }) => {
  console.log("Initializing gatsby-remark-component")
  if (!components || components.length == 0) {
    setParentForNonHtmlElements(markdownAST)
    return
  }
  if (components.length > 0) {
    setParentForComponents(markdownAST, components)
  }

  function setParentForComponents(markdownAST, components) {
    console.log(`Options provided ${JSON.stringify(components)}`)
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
    console.log("No options provided.")
    visit(markdownAST, "html", (node, index, parent) => {
      if (!html.some(tag => node.value == `<${tag}>`)) {
        console.log("Found a custom tag " + node.value)
        parent.type = "div"
      }
    })
  }
}
