import Home from '@pages/Home.jsx'
import MyAccount from '@/pages/MyAccount'
import MyOrder from '@pages/MyOrder.jsx'
import MyOrders from '@pages/MyOrders.jsx'
import NotFound from '@pages/NotFound.jsx'
import SignIn from '@pages/SignIn.jsx'
import SignUp from '@pages/SignUp.jsx'
import LayoutApp from '@/Layout/App.jsx'

import ProtectedRoutes from './ProtectedRoutes'
import RedirectIfAuthenticate from './RedirectIfAuthenticate'

import { createBrowserRouter } from 'react-router-dom'

const routes = [
  {
    path: '/',
    element: (
      <ProtectedRoutes>
        <LayoutApp />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: '/',
        element: (
          <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>
        ),
      },
      {
        path: 'category/:category',
        element: (
          <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>
        ),
      },
      {
        path: 'my-account',
        element: (
          <ProtectedRoutes>
            <MyAccount />
          </ProtectedRoutes>
        ),
      },
      {
        path: 'my-order/:orderId?',
        element: (
          <ProtectedRoutes>
            <MyOrder />
          </ProtectedRoutes>
        ),
      },
      {
        path: 'my-orders',
        element: (
          <ProtectedRoutes>
            <MyOrders />
          </ProtectedRoutes>
        ),
      },
    ],
  },
  {
    path: 'sign-in',
    element: (
      <RedirectIfAuthenticate>
        <SignIn />
      </RedirectIfAuthenticate>
    ),
  },
  {
    path: 'sign-up',
    element: (
      <RedirectIfAuthenticate>
        <SignUp />
      </RedirectIfAuthenticate>
    ),
  },
  {
    path: '*',
    element: <NotFound />,
  },
]

export const router = createBrowserRouter(routes)
