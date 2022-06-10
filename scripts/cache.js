const fs = require("node:fs")
const matter = require("gray-matter")
const path = require("node:path")

function postData() {
  const files = fs.readdirSync(path.join("posts"))

  const posts = files.map((filename) => {
    const slug = filename.replace(".md", "")
    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    )
    const { data: frontmatter } = matter(markdownWithMeta)

    return { slug, frontmatter }
  })

  return `export const posts = ${JSON.stringify(posts)}`
}

try {
  fs.readdirSync("cache")
} catch (error) {
  fs.mkdirSync("cache")
}

fs.writeFile("cache/data.js", postData(), function (err) {
  if (err) return console.log(err)
  console.log("Posts Cached...")
})
