/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import lazyLoad from './lazyLoad'
import { lazy } from 'react'

const App = lazy(() => import('@/views/App'))
const Portal = lazy(() => import('@/views/Portal/Portal'))
const Vue = lazy(() => import('@/views/ComponentList/Vue'))

const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to='/portal' replace />,
      },
      {
        path: '/portal',
        element: lazyLoad(Portal),
        children: [
          {
            index: true,
            element: <Navigate to='/portal/vue' replace />,
          },
          {
            path: '/portal/vue',
            element: lazyLoad(Vue),
          },
        ],
      },
    ],
  },
]

const router = createBrowserRouter(routes, {
  basename: '/',
})

export default router
