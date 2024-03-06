import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { Avatar } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import CssBaseline from '@mui/material/CssBaseline'

export default function AuthLayout() {
  const { token } = useStateContext()

  if (token) {
    return <Navigate to="/tasks" />
  }

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Outlet />
        </Box>
      </Container>
    </>
  )
}
