import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'
import { useEffect } from 'react'
import AppBar from '@mui/material/AppBar'
import { Button, Toolbar, Typography } from '@mui/material'

export default function TasksLayout() {
  const { axiosClient, token, setUser, setToken } = useStateContext()

  useEffect(() => {
    axiosClient.get('/user').then(({ data }) => {
      setUser(data)
    })
  }, [])

  if (!token) {
    return <Navigate to="/login" />
  }

  const onLogout = (event) => {
    event.preventDefault()

    axios.post('/auth/logout').then(() => {
      setUser({})
      setToken(null)
    })
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex' }}>
          <Typography variant="h6" component="div">
            TODO App
          </Typography>
          <Button color="inherit" sx={{ ml: 'auto' }}>
            Новая задача
          </Button>
          <Button color="inherit" onClick={onLogout} sx={{ ml: 'auto' }}>
            Выйти
          </Button>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  )
}
