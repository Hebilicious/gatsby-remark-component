// rollup.config.js
import babel from "rollup-plugin-babel"

export default {
  input: "src/index.js",
  output: {
    file: "lib.js",
    format: "cjs"
  },
  plugins: [
    babel({
      exclude: "node_modules/**" // only transpile our source code
    })
  ]
}
