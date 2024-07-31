import * as path from "path"
const html = path.resolve(__dirname, "templates", "html_css_js", "index.html")
let templates = [
  {
    name: "HTML/CSS/JS",
    files: [
      {
        filename: "index.html",
        path: html
      },
      {
        filename: "style.css",
        path: html
      },
      {
        filename: "script.js",
        path: html
      }
    ]
  }
]

export default templates
