import { Stack, Typography } from '@mui/material';
import { memo } from 'react';
import cls from './DashboardRow.module.scss';

interface DashboardRowProps {
  onHover?: () => void,
  onMouseOut?: () => void,
  value: number,
  title: string,
  isHovered: boolean,
}

export const DashboardRow = memo((props: DashboardRowProps) => {
  const {
    onHover, onMouseOut, value, title, isHovered,
  } = props;
  return (
    <Stack
      onMouseEnter={() => onHover?.()}
      onMouseLeave={() => onMouseOut?.()}
      spacing={2}
      direction="row"
      justifyContent="space-between"
      className={cls.caption}
      sx={{
        ':hover>p': {
          fontWeight: 600,
          borderBottomColor: 'secondary.main',
        },
      }}
      color={isHovered ? 'secondary.main' : ''}
    >
      <Typography>
        {`${title}:`}
      </Typography>
      <Typography>{value}</Typography>
    </Stack>
  );
});
