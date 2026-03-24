import type { Meta, StoryObj } from '@storybook/react-vite';
import Avatar from './index';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    nickname: 'john_doe',
    realname: 'John Doe',
  },
};

export const AnotherUser: Story = {
  args: {
    nickname: 'jane_smith',
    realname: 'Jane Smith',
  },
};
