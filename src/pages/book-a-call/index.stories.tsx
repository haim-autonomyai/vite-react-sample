import type { Meta, StoryObj } from '@storybook/react';
import BookACallPage from './index';

const meta = {
  title: 'Pages/Book A Call',
  component: BookACallPage,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof BookACallPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
