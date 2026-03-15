import type { Meta, StoryObj } from '@storybook/react-vite';
import BookACallPage from './index';

const meta: Meta<typeof BookACallPage> = {
  title: 'Pages/BookACallPage',
  component: BookACallPage,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof BookACallPage>;

export const Default: Story = {};
