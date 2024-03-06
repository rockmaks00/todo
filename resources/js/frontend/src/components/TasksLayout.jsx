import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'
import { useEffect } from 'react'
import AppBar from '@mui/material/AppBar'
import { Button, Toolbar, Typography } from '@mui/material'

export default function TasksLayout() {
  const { axiosClient, user, token, setUser, setToken } = useStateContext()

  useEffect(() => {
    axiosClient.get('/users/self').then(({ data }) => {
      setUser(data)
    })
  }, [])

  if (!token) {
    return <Navigate to="/login" />
  }

  const onLogout = (event) => {
    event.preventDefault()

    axiosClient.post('/auth/logout').then(() => {
      setUser({})
      setToken(null)
    })
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex' }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Здравствуйте, {user.name}
          </Typography>
          <Button color="inherit" variant="outlined" sx={{ mr: 1 }}>
            Новая задача
          </Button>
          <Button color="inherit" onClick={onLogout}>
            Выйти
          </Button>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  )
}
