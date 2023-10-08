import type { Meta, StoryObj } from '@storybook/react';
import { DashboardItem } from './DashboardItem';

const meta = {
  title: 'pages/Dashboard/DashboardItem',
  component: DashboardItem,
  tags: ['autodocs'],
  args: {
    title: 'dialogs',
    stats: {
      active: 11,
      completed: 122,
      inactive: 53,
    },
  },
} satisfies Meta<typeof DashboardItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
};
