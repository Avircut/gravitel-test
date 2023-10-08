import { gql } from '@apollo/client';

export const GET_DASHBOARD = gql`
  fragment statisticFields on Statistic{
    active, completed, inactive
  }
  query GetDashboard{
    dashboard{
      scenarios{...statisticFields},
      lists{...statisticFields},
      dialogs{...statisticFields}
    }
  }
`;
