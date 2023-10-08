import type { Meta, StoryObj } from '@storybook/react';
import { DashboardChart } from './DashboardChart';

const meta = {
  title: 'pages/Dashboard/DashboardChart',
  component: DashboardChart,
  tags: ['autodocs'],
  args: {
    centerNumber: 33,
    title: 'scenarios',
    stats: { active: 33, inactive: 214, completed: 106 },
  },
} satisfies Meta<typeof DashboardChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isParentHovered: false,
    hovers: { active: false, inactive: false, completed: false },
  },
};
export const HoveredParentOnly: Story = {
  args: {
    isParentHovered: true,
    hovers: { active: false, inactive: false, completed: false },
  },
};

export const HoveredPart: Story = {
  args: {
    isParentHovered: false,
    hovers: { active: true, inactive: false, completed: false },
  },
};
