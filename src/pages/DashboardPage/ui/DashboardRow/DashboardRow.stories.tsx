import type { Meta, StoryObj } from '@storybook/react';
import { DashboardRow } from './DashboardRow';

const meta = {
  title: 'pages/Dashboard/DashboardRow',
  component: DashboardRow,
  tags: ['autodocs'],
  args: {
    title: 'Активных',
    value: 11,
  },
} satisfies Meta<typeof DashboardRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isHovered: false,
  },
};

export const Hovered: Story = {
  args: {
    isHovered: true,
  },
};
