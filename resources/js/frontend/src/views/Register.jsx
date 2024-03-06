import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { MenuItem } from '@mui/material';
import axiosClient from '../axios-client.js';
import { useStateContext } from "../contexts/ContextProvider";

export default function Register() {
  const {setUser, setToken} = useStateContext()

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const payload = {
      name: data.get('name'),
      surname: data.get('surname'),
      patronymic: data.get('patronymic'),
      email: data.get('email'),
      password: data.get('password'),
      leader: data.get('leader'),
    }

    axiosClient.post('/register', payload)
      .then(({data}) => {
        setUser(data.user);
        setToken(data.token)
      })
      .catch (error => {
        const response = error.response;
        if (response && response.status == 422) {
          console.log(response.data.errors);
        }
      })
  };

  return (
    <>
      <Typography component="h1" variant="h5">
        Регистрация
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
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
          margin="normal"
          required
          fullWidth
          id="surname"
          label="Фамилия"
          name="surname"
          autoComplete="surname"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="patronymic"
          label="Отчество"
          name="patronymic"
          autoComplete="patronymic"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Почта"
          name="email"
          autoComplete="email"
        />
        <TextField
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
              {"Уже есть аккаунт? Войти"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}