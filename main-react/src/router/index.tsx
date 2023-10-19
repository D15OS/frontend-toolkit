/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import { lazy } from 'react'
import lazyLoad from './lazyLoad.tsx'

const App = lazy(() => import('@/views/App.tsx'))
const Portal = lazy(() => import('@/views/Portal/Portal.tsx'))
const Vue = lazy(() => import('@/views/Portal/componentWrapper/Vue.tsx'))
const React = lazy(() => import('@/views/Portal/componentWrapper/React/React.tsx'))
const Detail = lazy(() => import('@/views/Portal/componentDetail/Detail.tsx'))

const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/portal" replace />,
      },
      {
        path: '/portal',
        element: lazyLoad(Portal),
        children: [
          {
            index: true,
            element: <Navigate to="/portal/react" replace />,
          },
          {
            path: '/portal/vue',
            element: lazyLoad(Vue),
          },
          {
            path: '/portal/react',
            element: lazyLoad(React),
          },
          {
            path: '/portal/detail',
            element: lazyLoad(Detail),
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
