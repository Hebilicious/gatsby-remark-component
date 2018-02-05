const Remark = require(`remark`)
const plugin = require(`../../lib`)

const markdown = "Text test\n<my-component></my-component>\n###Test"
const markdowns = [markdown]
const options = { components: ["my-component", "super-component"] }

describe(`remark component plugin`, () => {
  it(`Should render markdown with inline html properly.`, () => {
    let remark = new Remark()
    markdowns.forEach(md => {
      let markdownAST = remark.parse(md)
      plugin({ markdownAST }, { ...options })
      expect(markdownAST).toMatchSnapshot()
    })
  })

  it(`Set a component with components parent type to div in the AST.`, () => {
    let remark = new Remark()

    markdowns.forEach(md => {
      let markdownAST = remark.parse(md)
      plugin({ markdownAST }, { ...options })
      expect(markdownAST.children[0]).toMatchObject({ type: "div" })
      expect(markdownAST).toMatchSnapshot()
    })
  })

  it(`Should set a component without components or options parent type to div in the AST.`, () => {
    let remark = new Remark()

    markdowns.forEach(md => {
      let markdownAST = remark.parse(md)
      plugin({ markdownAST }, {})
      expect(markdownAST.children[0]).toMatchObject({ type: "div" })
      expect(markdownAST).toMatchSnapshot()
    })
  })
})
