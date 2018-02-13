# Gatsby Remark Component [![Build Status](https://travis-ci.org/Hebilicious/gatsby-remark-component.svg?branch=master)](https://travis-ci.org/Hebilicious/gatsby-remark-component) [![npm version](https://badge.fury.io/js/gatsby-remark-component.svg)](https://badge.fury.io/js/gatsby-remark-component)

A gatsby-transformer-remark plugin that change the AST node parent of a custom component to a div.

> * [Gatsby](https://www.gatsbyjs.org/)
> * [gatsby-transformer-remark](https://www.gatsbyjs.org/packages/gatsby-transformer-remark/)

## Install

```bash
yarn add gatsby-transformer-remark gatsby-remark-component
```

## Release Notes

> v 1.1

* New configuration options!
* Can now auto-detect your custom components.

## How to use

> Read the great custom component article on the official gatsby remark blog [here](https://using-remark.gatsbyjs.org/custom-components/).

This is the base settings, your components inside your markdown will be auto-detected.

```js
//In your gatsby-config.js ...
plugins: [
  {
    resolve: "gatsby-transformer-remark",
    options: {
      plugins: ["gatsby-remark-component"]
    }
  }
]
```

You can explicitly declare the name of the components if you want to be strict. (it will disable the auto-detection
)

```js
plugins: [
  {
    resolve: "gatsby-transformer-remark",
    options: {
      plugins: [
        {
          resolve: "gatsby-remark-component",
          options: { components: ["my-component", "other-component"] }
        }
      ]
    }
  }
]
```

When you start gatsby, your queries will be built from your components, and gatsby-remark-components will update the AST tree.

This will convert this graphql result:

```json
//...
{
  "type": "element",
  "tagName": "p",
  "properties": {},
  "children": [
    {
      "type": "element",
      "tagName": "my-component",
      "properties": {},
      "children": []
    }
  ]
}
```

To this:

```json
//...
//Notice the tag name
{
  "type": "element",
  "tagName": "div",
  "properties": {},
  "children": [
    {
      "type": "element",
      "tagName": "my-component",
      "properties": {},
      "children": []
    }
  ]
}
```

Now in your markdown template you can do:

```jsx
import rehypeReact from "rehype-react"
import { MyComponent } from "../pages/my-component"

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: { "my-component": MyComponent }
}).Compiler
```

Replace :

```jsx
<div dangerouslySetInnerHTML={{ __html: post.html }} />
```

by:

```jsx
<div>{renderAst(post.htmlAst)}</div>
```

And in your page query ... :

```jsx
//...
markdownRemark(fields: { slug: { eq: $slug } }) {
 htmlAst // previously `html`

 //other fields...
}
//...
```

Now in your markdown you can do:

```md
# Some Title

Some text

<my-component></my-component>
```

This will render your component without any validateDOMNesting warning.
