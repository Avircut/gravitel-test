import { graphql } from 'msw';

export const msw = {
  handlers: [
    graphql.query('GetDashboard', (req, res, ctx) => {
      return res(
        ctx.data({
          dashboard: {
            scenarios: {
              active: 90,
              completed: 32,
              inactive: 3,
              __typename: 'Statistic',
            },
            lists: {
              active: 64,
              completed: 54,
              inactive: 49,
              __typename: 'Statistic',
            },
            dialogs: {
              active: 83,
              completed: 68,
              inactive: 96,
              __typename: 'Statistic',
            },
            __typename: 'DashboardStat',
          },
        }),
      );
    }),
  ],
};
