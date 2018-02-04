# gatsby-remark-component

Simply change the node parent of a custom component to a div.

## Install

`yarn add gatsby-transformer-remark gatsby-remark-component`

## How to use

```js
//In your gatsby-config.js
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
  //...
}
```

To this:

```json
//...
{
  "type": "element",
  "tagName": "div", // <= Change here
  "properties": {},
  "children": [
    {
      "type": "element",
      "tagName": "my-component",
      "properties": {},
      "children": []
    }
  ]
  //...
}
```

### TODO

* Tests
