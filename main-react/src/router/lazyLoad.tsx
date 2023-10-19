// router/lazyLoad.tsx
import { Suspense } from 'react'

const lazyLoad = (Component: React.LazyExoticComponent<() => JSX.Element>) => (
  <Suspense>
    <Component />
  </Suspense>
)

export default lazyLoad
