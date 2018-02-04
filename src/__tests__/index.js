const Remark = require(`remark`)
const plugin = require(`../index`)

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

  it(`Should set a component parent type to div in the AST.`, () => {
    let remark = new Remark()

    markdowns.forEach(md => {
      let markdownAST = remark.parse(md)
      plugin({ markdownAST }, { ...options })
      expect(markdownAST.children[0]).toMatchObject({ type: "div" })
      expect(markdownAST).toMatchSnapshot()
    })
  })
})
