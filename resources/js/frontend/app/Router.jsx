import { createBrowserRouter } from 'react-router-dom';
import Tasks from './views/Tasks';
import TasksLayout from '../src/components/TasksLayout';
import AuthLayout from '../src/components/AuthLayout';
import Login from './views/Login';
import Register from './views/Register';

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
        ]
    }
])

export default router;