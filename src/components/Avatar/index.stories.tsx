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

export const WithLongName: Story = {
  args: {
    nickname: 'alice_wonderland',
    realname: 'Alice Wonderland',
  },
};
