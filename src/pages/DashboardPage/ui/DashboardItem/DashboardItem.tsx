import { Stack, Typography } from '@mui/material';
import { Statistic } from 'entities/Statistic';
import { memo, useCallback, useState } from 'react';
import {
  DashboardStat,
  DashboardTranslate,
} from '../../model/types/dashboardStat';
import cls from './DashboardItem.module.scss';
import { DashboardRow } from '../DashboardRow/DashboardRow';
import { DashboardChart } from '../DashboardChart/DashboardChart';

interface DashboardItemProps {
  stats: Statistic;
  title: keyof DashboardStat;
}
export const DashboardItem = memo(({ stats, title }: DashboardItemProps) => {
  const total = stats.active + stats.completed + stats.inactive;
  const [centerNumber, setCenterNumber] = useState(total);
  const [isParentHovered, setIsParentHovered] = useState(false);
  const [hovers, setHovers] = useState<Record<keyof Statistic, boolean>>({
    active: false,
    completed: false,
    inactive: false,
  });
  const onHover = useCallback(
    (type: keyof Statistic) => {
      setHovers((prev) => ({ ...prev, [type]: true }));
      setCenterNumber(stats[type]);
    },
    [stats],
  );
  const onMouseOut = useCallback(
    (type: keyof Statistic) => {
      setHovers((prev) => ({ ...prev, [type]: false }));
      setCenterNumber(total);
    },
    [total],
  );
  return (
    <Stack
      onMouseEnter={() => setIsParentHovered(true)}
      onMouseLeave={() => setIsParentHovered(false)}
      direction="column"
      spacing={2}
    >
      <DashboardChart
        centerNumber={centerNumber}
        title={title}
        isParentHovered={isParentHovered}
        hovers={hovers}
        stats={stats}
      />
      <Stack direction="column" spacing={0}>
        <Stack
          className={cls.caption}
          spacing={2}
          direction="row"
          justifyContent="space-between"
        >
          <Typography>Всего:</Typography>
          <Typography>{total}</Typography>
        </Stack>
        {Object.entries(stats)
          .filter(([_, value]) => typeof value === 'number')
          .map(([type, value]) => (
            <DashboardRow
              onHover={() => onHover(type as keyof Statistic)}
              onMouseOut={() => onMouseOut(type as keyof Statistic)}
              value={value}
              title={DashboardTranslate[type as keyof Statistic]}
              isHovered={hovers[type as keyof Statistic]}
            />
          ))}
      </Stack>
    </Stack>
  );
});
