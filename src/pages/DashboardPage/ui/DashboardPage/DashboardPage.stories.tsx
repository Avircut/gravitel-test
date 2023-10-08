import type { Meta, StoryObj } from '@storybook/react';
import DashboardPage from './DashboardPage';

const meta = {
  title: 'pages/Dashboard/DashboardPage',
  component: DashboardPage,
  tags: ['autodocs'],
} satisfies Meta<typeof DashboardPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
  },
};
