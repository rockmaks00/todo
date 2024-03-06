import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from '../axios-client';

export default function Login() {
  const { setUser, setToken } = useStateContext()
  const [error, setErrors] = useState()

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const payload = {
      email: data.get('email'),
      password: data.get('password'),
    }

    axiosClient.post('/login', payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token)
      })
      .catch(error => {
        const response = error.response;
        if (response?.status == 422) {
          setErrors(response.data.errors);
        }
      })
  };

  return (
    <>
      <Typography component="h1" variant="h5">
        Авторизация
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
          autoFocus
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
          autoComplete="current-password"
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Запомнить"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Войти
        </Button>
        <Grid container>
          <Grid item>
            <Link href="/register" variant="body2">
              {"Нет аккаунта? Регистрация"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}