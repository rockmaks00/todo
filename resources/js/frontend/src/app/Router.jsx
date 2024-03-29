import { createBrowserRouter } from 'react-router-dom'
import Tasks from '../pages/Tasks'
import TasksLayout from '../components/TasksLayout'
import AuthLayout from '../components/AuthLayout'
import Login from '../pages/Login'
import Register from '../pages/Register'

const router = createBrowserRouter([
  {
    path: '/',
    element: <TasksLayout />,
    children: [
      {
        path: '/tasks',
        element: <Tasks />,
      },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
    ],
  },
])

export default router
