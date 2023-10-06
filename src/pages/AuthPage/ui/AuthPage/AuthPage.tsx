import { memo, useCallback } from 'react';

import {
  Box, Avatar, Typography, Button,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ControlledTextField } from 'shared/ui/ControlledTextField/ControlledTextField';
import { useMutation } from '@apollo/client';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localStorage';
import { useNavigate } from 'react-router-dom';
import { LOGIN } from 'entities/User/model/services/login';
import { isAuthVar } from 'entities/User';

type Inputs = {
  username: string;
  password: string;
};
const AuthPage = memo(() => {
  const navigate = useNavigate();
  const [login, { loading }] = useMutation(LOGIN);
  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = useCallback(
    async (form) => {
      try {
        const { data } = await login({ variables: { username: form.username, password: form.password } });
        localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(data.login.token));
        isAuthVar(true);
        navigate('/dashboard');
      } catch (e) {
        setError('username', { message: 'Неверные данные' });
      }
    },
    [login, navigate, setError],
  );
  return (
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
      <Typography component="h1" variant="h5">
        Вход
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
        <ControlledTextField
          required
          type="text"
          name="username"
          control={control}
          label="Логин"
        />
        <ControlledTextField
          required
          type="password"
          name="password"
          control={control}
          label="Пароль"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={loading}
          sx={{ mt: 3, mb: 2 }}
        >
          Войти
        </Button>
      </Box>
    </Box>

  );
});
export default AuthPage;
