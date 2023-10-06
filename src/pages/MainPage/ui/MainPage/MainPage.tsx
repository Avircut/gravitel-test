import { memo } from 'react';
import { Stack, Divider, CircularProgress } from '@mui/material';
import { PageError } from 'widgets/PageError';
import cls from './MainPage.module.scss';

const MainPage = memo(() => {
  const isLoading = true;
  const error = true;
  if (isLoading) {
    return (
      <Stack flexGrow={1} justifyContent="center" alignItems="center">
        <CircularProgress />
      </Stack>
    );
  }
  if (error) {
    return (
      <Stack flexGrow={1} justifyContent="center" alignItems="center">
        <PageError />
      </Stack>
    );
  }
  return (
    <Stack
      direction="row"
      divider={<Divider orientation="vertical" flexItem />}
      className={cls.pageContent}
    />
  );
});
export default MainPage;
