const visit = require("unist-util-visit")

module.exports = ({ markdownAST }, { components }) => {
  components.forEach(comp => {
    visit(markdownAST, `html`, (node, index, parent) => {
      // console.log(parent)
      if (node.value == `<${comp}>`) {
        // console.log(`Setting type of ${comp} parent to div.`)
        parent.type = "div"
      }
    })
  })
}
