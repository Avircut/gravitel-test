import { CircularProgress, Backdrop } from '@mui/material';
import cls from './PageLoader.module.scss';

export const PageLoader = () => {
  return (
    <div id="pageLoader" data-testid="pageLoader" className={cls.PageLoader}>
      <Backdrop open>
        <CircularProgress />
      </Backdrop>
    </div>
  );
};
