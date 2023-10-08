import { Statistic } from 'entities/Statistic';

export type DashboardStat = {
  scenarios: Statistic;
  lists: Statistic;
  dialogs: Statistic;
}
export const DashboardTranslate:Record<keyof DashboardStat | keyof Statistic, string> = {
  scenarios: 'Сценарии',
  lists: 'Списки',
  dialogs: 'Диалоги',
  active: 'Активных',
  inactive: 'Неактивных',
  completed: 'Завершенных',
};
