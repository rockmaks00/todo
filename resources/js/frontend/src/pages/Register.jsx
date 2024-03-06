import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { MenuItem } from '@mui/material'
import { useStateContext } from '../contexts/ContextProvider'
import { useState } from 'react'

export default function Register() {
  const { axiosClient, setUser, setToken } = useStateContext()
  const [error, setErrors] = useState()

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    const payload = {
      name: data.get('name'),
      surname: data.get('surname'),
      patronymic: data.get('patronymic'),
      email: data.get('email'),
      password: data.get('password'),
      password_confirmation: data.get('passwordConfirm'),
      leader: data.get('leader'),
    }

    axiosClient
      .post('/auth/register', payload)
      .then(({ data }) => {
        setUser(data.user)
        setToken(data.token)
      })
      .catch((error) => {
        const response = error.response
        if (response?.status == 422) {
          setErrors(response.data.errors)
        }
      })
  }

  return (
    <>
      <Typography component="h1" variant="h5">
        Регистрация
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          error={Boolean(error?.name)}
          helperText={error?.name}
          margin="normal"
          required
          fullWidth
          id="name"
          label="Имя"
          name="name"
          autoComplete="name"
          autoFocus
        />
        <TextField
          error={Boolean(error?.surname)}
          helperText={error?.surname}
          margin="normal"
          required
          fullWidth
          id="surname"
          label="Фамилия"
          name="surname"
          autoComplete="surname"
        />
        <TextField
          error={Boolean(error?.patronymic)}
          helperText={error?.patronymic}
          margin="normal"
          required
          fullWidth
          id="patronymic"
          label="Отчество"
          name="patronymic"
          autoComplete="patronymic"
        />
        <TextField
          error={Boolean(error?.email)}
          helperText={error?.email}
          margin="normal"
          required
          fullWidth
          id="email"
          label="Почта"
          name="email"
          autoComplete="email"
        />
        <TextField
          error={Boolean(error?.password)}
          helperText={error?.password}
          margin="normal"
          required
          fullWidth
          name="password"
          label="Пароль"
          type="password"
          id="password"
          autoComplete="new-password"
        />
        <TextField
          error={Boolean(error?.password_confirmation)}
          helperText={error?.password_confirmation}
          margin="normal"
          required
          fullWidth
          name="passwordConfirm"
          label="Подтвердите пароль"
          type="password"
          id="passwordConfirm"
        />
        <TextField
          error={Boolean(error?.leader)}
          helperText={error?.leader}
          fullWidth
          id="leader"
          select
          value={0}
          label="Руководитель"
          sx={{ mt: 2 }}
        >
          <MenuItem value={0}>Не выбрано</MenuItem>
          <MenuItem value={1}>Камогус Камогусович Камсваловский</MenuItem>
        </TextField>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Зарегистрироваться
        </Button>
        <Grid container>
          <Grid item>
            <Link href="/login" variant="body2">
              {'Уже есть аккаунт? Войти'}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}
