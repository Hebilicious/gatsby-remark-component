'use strict';

var html = ["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "math", "menu", "menuitem", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "pre", "progress", "q", "rb", "rp", "rt", "rtc", "ruby", "s", "samp", "script", "section", "select", "slot", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "svg", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "u", "ul", "var", "video", "wbr"];

var visit = require("unist-util-visit");
console.log("Initializing gatsby-remark-component");
module.exports = function (_ref, _ref2) {
  var markdownAST = _ref.markdownAST;
  var components = _ref2.components;

  if (!components || components.length == 0) {
    setParentForNonHtmlElements(markdownAST);
    return;
  }
  if (components.length > 0) {
    setParentForComponents(markdownAST, components);
  }

  function setParentForComponents(markdownAST, components) {
    components.forEach(function (comp) {
      visit(markdownAST, "html", function (node, index, parent) {
        if (node.value == "<" + comp + ">") {
          console.log("Setting type of " + comp + " parent to div.");
          parent.type = "div";
        }
      });
    });
  }

  function setParentForNonHtmlElements(markdownAST) {
    visit(markdownAST, "html", function (node, index, parent) {
      if (!html.some(function (tag) {
        return node.value == "<" + tag + ">" || node.value.startsWith("<" + tag + " ");
      })) {
        console.log("Found a custom tag " + node.value);
        parent.type = "div";
      }
    });
  }
};
