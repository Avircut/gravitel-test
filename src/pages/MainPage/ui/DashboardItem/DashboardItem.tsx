import { Stack, Typography } from '@mui/material';
import { Statistic } from 'entities/Statistic';
import {
  memo, useCallback, useState,
} from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  ChartData,
  Plugin,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { darkTheme } from 'app/providers/theme/theme';
import { DashboardStat, DashboardTranslate } from '../../model/types/dashboardStat';
import cls from './DashboardItem.module.scss';

interface DashboardItemProps {
  stats: Statistic;
  title: keyof DashboardStat;
}
// TODO: try override draw method to get right order of arcs, think about animation fix
export const DashboardItem = memo(({ stats, title }: DashboardItemProps) => {
  const { active, completed, inactive } = stats;
  const total = stats.active + stats.completed + stats.inactive;
  const [centerNumber, setCenterNumber] = useState(total);
  const [isParentHovered, setIsParentHovered] = useState(false);
  const [hovers, setHovers] = useState<Record<keyof Statistic, boolean>>({
    active: false,
    completed: false,
    inactive: false,
  });
  ChartJS.register(ArcElement, Tooltip);
  const data: ChartData<'doughnut'> = {
    labels: ['Неактивные', 'Активные', 'Завершенные'],
    datasets: [
      {
        label: 'Количество проектов',
        data: [inactive, active, completed],
        borderRadius: {
          innerStart: 15,
          outerStart: 15,
        },
        backgroundColor: [
          (isParentHovered && (!hovers.inactive && !hovers.active && !hovers.completed)) || hovers.inactive
            ? darkTheme.palette.primary.light
            : darkTheme.palette.grey[100],
          (isParentHovered && (!hovers.active && !hovers.completed && !hovers.inactive)) || hovers.active
            ? darkTheme.palette.primary.main
            : darkTheme.palette.grey[400],
          (isParentHovered && (!hovers.completed && !hovers.active && !hovers.inactive)) || hovers.completed
            ? darkTheme.palette.primary.dark
            : darkTheme.palette.grey[700],
        ],
        borderWidth: 0,
        spacing: -10,
      },
    ],
  };
  const plugins: Plugin<'doughnut'>[] = [
    {
      id: 'textInside',
      beforeDraw(chart, args, options) {
        const { width } = chart;
        const { height } = chart;
        const { ctx } = chart;
        ctx.restore();
        ctx.fillStyle = 'black';
        const fontSizeCaption = (height / 160 - 0.8).toFixed(2);
        ctx.font = `bold ${fontSizeCaption}em Roboto`;
        ctx.textBaseline = 'top';
        const textCaption = DashboardTranslate[title];
        const textXCaption = Math.round((width - ctx.measureText(textCaption).width) / 2);
        const textYCaption = height / 2.6;
        ctx.fillText(textCaption, textXCaption, textYCaption);
        ctx.save();
        ctx.restore();
        const fontSize = (height / 130).toFixed(2);
        ctx.font = `bold ${fontSize}em Roboto`;
        const text = centerNumber.toString();
        const textX = Math.round((width - ctx.measureText(text).width) / 2);
        const textY = height / 1.8;
        ctx.fillStyle = darkTheme.palette.primary.dark;
        ctx.fillText(text, textX, textY);
        ctx.save();
      },
    },
  ];
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
      className={cls.dashboardItem}
      direction="column"
      spacing={2}
    >
      <Doughnut redraw data={data} options={{ cutout: '90%', animations: { numbers: false } }} plugins={plugins} />
      <Stack direction="column" spacing={0}>
        <Stack className={cls.caption} spacing={2} direction="row" justifyContent="space-between">
          <Typography>Всего:</Typography>
          <Typography>{total}</Typography>
        </Stack>
        <Stack
          onMouseEnter={() => onHover('active')}
          onMouseLeave={() => onMouseOut('active')}
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
          color={hovers.active ? 'secondary.main' : ''}
        >
          <Typography>Активных:</Typography>
          <Typography>{active}</Typography>
        </Stack>
        <Stack
          onMouseEnter={() => onHover('inactive')}
          onMouseLeave={() => onMouseOut('inactive')}
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
          color={hovers.inactive ? 'secondary.main' : ''}
        >
          <Typography>Неактивных:</Typography>
          <Typography>{inactive}</Typography>
        </Stack>
        <Stack
          onMouseEnter={() => onHover('completed')}
          onMouseLeave={() => onMouseOut('completed')}
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
          color={hovers.completed ? 'secondary.main' : ''}
        >
          <Typography>Завершенных:</Typography>
          <Typography>{completed}</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
});
