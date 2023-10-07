import { memo, useCallback } from 'react';
import {
  Stack, CircularProgress, Grid, Box,
} from '@mui/material';
import { PageError } from 'widgets/PageError';
import { useQuery } from '@apollo/client';
import { DashboardStat } from '../../model/types/dashboardStat';
import { GET_DASHBOARD } from '../../model/services/getDashboard';
import cls from './MainPage.module.scss';
import { DashboardItem } from '../DashboardItem/DashboardItem';

const MainPage = memo(() => {
  const { data, loading: isLoading, error } = useQuery(GET_DASHBOARD);
  if (isLoading) {
    return (
      <Stack flexGrow={1} justifyContent="center" alignItems="center">
        <CircularProgress />
      </Stack>
    );
  }
  const dashboardStat: DashboardStat = data.dashboard;
  if (error) {
    return (
      <Stack flexGrow={1} justifyContent="center" alignItems="center">
        <PageError />
      </Stack>
    );
  }
  return (
    <Box
      className={cls.pageContent}
      maxWidth="lg"
      gap={8}
      justifyContent="center"
      alignSelf="center"
    >
      {Object.entries(dashboardStat).filter(([_, value]) => typeof value === 'object').map(([key, value]) => (
        <DashboardItem key={key} stats={value} title={key as keyof DashboardStat} />
      ))}
    </Box>
  );
});
export default MainPage;
