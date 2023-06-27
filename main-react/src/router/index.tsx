// src/router/index.tsx
import { createBrowserRouter, Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import lazyLoad from './lazyLoad'
import { lazy } from 'react'

const Portal = lazy(() => import('@/views/portal/portal.tsx'))

const routes: RouteObject[] = [
  {
    path: '/',
    children: [
      {
        index: true,
        element: <Navigate to='/portal' replace />,
      },
      {
        path: 'portal',
        element: lazyLoad(Portal),
      },
    ],
  },
]

// eslint-disable-next-line react-refresh/only-export-components
export default createBrowserRouter(routes, {
  basename: '/',
})
