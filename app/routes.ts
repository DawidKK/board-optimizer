import { index, route, type RouteConfig } from '@react-router/dev/routes'

export default [
  index('routes/index.tsx'),
  route('coming-soon', 'routes/coming-soon.tsx'),
  route('rozkroj-plyt-meblowych', 'routes/home.tsx'),
] satisfies RouteConfig
