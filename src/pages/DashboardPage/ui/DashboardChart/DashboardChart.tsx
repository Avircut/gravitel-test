import { Stack, Typography } from '@mui/material';
import { memo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Statistic } from 'entities/Statistic';
import {
  Chart as ChartJS, ArcElement, Tooltip, ChartData,
} from 'chart.js';
import { mainTheme } from 'app/providers/theme/theme';
import { DashboardStat, DashboardTranslate } from '../../model/types/dashboardStat';
import cls from './DashboardChart.module.scss';

interface DashboardChartProps {
  centerNumber: number;
  title: keyof DashboardStat;
  isParentHovered: boolean;
  hovers: Record<keyof Statistic, boolean>;
  stats: Statistic
}

ChartJS.register(ArcElement, Tooltip);

export const DashboardChart = memo((props:DashboardChartProps) => {
  // This approach forces to full redraw chart if we need to update number
  // const plugins: Plugin<'doughnut'>[] = [
  //   {
  //     id: 'textInside',
  //     beforeDraw(chart) {
  //       const { width } = chart;
  //       const { height } = chart;
  //       const { ctx } = chart;
  //       ctx.restore();
  //       ctx.fillStyle = 'black';
  //       const fontSizeCaption = (height / 200).toFixed(2);
  //       ctx.font = `bold ${fontSizeCaption}em Roboto`;
  //       ctx.textBaseline = 'top';
  //       const textCaption = DashboardTranslate[title];
  //       const textXCaption = Math.round((width - ctx.measureText(textCaption).width) / 2);
  //       const textYCaption = height / 2.6;
  //       ctx.fillText(textCaption, textXCaption, textYCaption);
  //       ctx.save();
  //       ctx.restore();
  //       const fontSize = (height / 130).toFixed(2);
  //       ctx.font = `bold ${fontSize}em Roboto`;
  //       const text = centerNumber.toString();
  //       const textX = Math.round((width - ctx.measureText(text).width) / 2);
  //       const textY = height / 1.8;
  //       ctx.fillStyle = darkTheme.palette.primary.dark;
  //       ctx.fillText(text, textX, textY);
  //       ctx.save();
  //     },
  //   },
  // ];
  const {
    centerNumber, title, isParentHovered, hovers, stats: { inactive, active, completed },
  } = props;
  const isParentHoveredOnly = isParentHovered && !hovers.inactive && !hovers.active && !hovers.completed;
  const data: ChartData<'doughnut'> = {
    labels: ['Неактивные', 'Активные', 'Завершенные'],
    datasets: [
      {
        label: 'Количество проектов',
        data: [inactive, active, completed],
        backgroundColor: [
          isParentHoveredOnly || hovers.inactive
            ? mainTheme.palette.primary.light
            : mainTheme.palette.grey[100],
          isParentHoveredOnly || hovers.active
            ? mainTheme.palette.primary.main
            : mainTheme.palette.grey[400],
          isParentHoveredOnly || hovers.completed
            ? mainTheme.palette.primary.dark
            : mainTheme.palette.grey[700],
        ],
        borderWidth: 0,
      },
    ],
  };
  return (
    <Stack
      className={cls.chartWrapper}
      justifyContent="center"
      alignItems="center"
    >
      <Doughnut data={data} options={{ cutout: '90%' }} />
      <Stack
        className={cls.chartText}
        direction="column"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h6" className={cls.chartTitle}>
          {DashboardTranslate[title]}
        </Typography>
        <Typography color="primary" variant="h3" className={cls.chartNumber}>
          {centerNumber}
        </Typography>
      </Stack>
    </Stack>
  );
});
