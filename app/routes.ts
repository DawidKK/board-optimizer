import { index, route, type RouteConfig } from '@react-router/dev/routes'

export default [
  index('routes/index.tsx'),
  route('coming-soon', 'routes/coming-soon.tsx'),
  route('rozkroj-plyt-meblowych', 'routes/home.tsx'),
  route('rozkroj-plyt-meblowych/druk', 'routes/print-layout.tsx'),
  route('rozkroj-plyt-mdf', 'routes/landing-mdf.tsx'),
  route('rozkroj-sklejki', 'routes/landing-sklejka.tsx'),
  route('blog', 'routes/blog.tsx'),
  route('blog/:slug', 'routes/blog-post.tsx'),
] satisfies RouteConfig
