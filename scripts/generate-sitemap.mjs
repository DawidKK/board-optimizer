import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const BASE_URL = 'https://pilsen.pl'
const projectRoot = process.cwd()

const blogPostsPath = resolve(projectRoot, 'src/content/blogPosts.ts')
const glossaryPath = resolve(projectRoot, 'src/content/glossary/glossary.ts')
const sitemapPath = resolve(projectRoot, 'public/sitemap.xml')

function extractSlugs(fileContents) {
  const slugRegex = /slug:\s*'([^']+)'/g
  const slugs = new Set()

  for (const match of fileContents.matchAll(slugRegex)) {
    if (match[1]) {
      slugs.add(match[1])
    }
  }

  return [...slugs]
}

const blogPostsFile = readFileSync(blogPostsPath, 'utf-8')
const glossaryFile = readFileSync(glossaryPath, 'utf-8')

const blogSlugs = extractSlugs(blogPostsFile)
const glossarySlugs = extractSlugs(glossaryFile)

const staticSeoPaths = [
  '/',
  '/rozkroj-plyt-meblowych',
  '/blog',
  '/faq/rozkroj-plyt',
  '/rozkroj-plyt-mdf',
  '/rozkroj-sklejki',
  '/slownik',
]

const allPaths = [
  ...staticSeoPaths,
  ...blogSlugs.map((slug) => `/blog/${slug}`),
  ...glossarySlugs.map((slug) => `/slownik/${slug}`),
]

const uniquePaths = [...new Set(allPaths)]

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${uniquePaths
  .map((path) => `  <url>\n    <loc>${BASE_URL}${path}</loc>\n  </url>`)
  .join('\n')}\n</urlset>\n`

writeFileSync(sitemapPath, sitemapXml, 'utf-8')
console.log(`Generated sitemap with ${uniquePaths.length} URLs at ${sitemapPath}`)
