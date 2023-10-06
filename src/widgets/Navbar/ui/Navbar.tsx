import { memo, useCallback } from 'react';
import {
  Stack, IconButton, AppBar, Divider, Container,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useReactiveVar } from '@apollo/client';
import { isAuthVar } from 'entities/User';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localStorage';
import cls from './Navbar.module.scss';

export const Navbar = memo(() => {
  const isAuth = useReactiveVar(isAuthVar);
  const onLogout = useCallback(() => {
    isAuthVar(false);
    localStorage.removeItem(USER_LOCALSTORAGE_KEY);
  }, []);
  if (isAuth) {
    return (
      <AppBar position="static">
        <Container maxWidth="lg">
          <Stack direction="row" justifyContent="end" alignItems="center">
            <IconButton onClick={onLogout} className={cls.icon}>
              <LogoutIcon />
            </IconButton>
          </Stack>
        </Container>
        <Divider />
      </AppBar>
    );
  }
  return null;
});
