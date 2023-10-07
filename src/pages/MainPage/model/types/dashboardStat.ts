import { Statistic } from 'entities/Statistic';

export type DashboardStat = {
  scenarios: Statistic;
  lists: Statistic;
  dialogs: Statistic;
}
export const DashboardTranslate:Record<keyof DashboardStat, string> = {
  scenarios: 'Сценарии',
  lists: 'Списки',
  dialogs: 'Диалоги',
};
