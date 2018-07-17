const visit = require("unist-util-visit")
import { html } from "./html-tags.js"

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
        parent.type = "div"
      }
    })
  }
}
