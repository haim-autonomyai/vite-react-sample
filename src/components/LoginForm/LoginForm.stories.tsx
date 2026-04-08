import type { Meta, StoryObj } from '@storybook/react-vite';
import LoginForm from './index';

const meta: Meta<typeof LoginForm> = {
  title: 'Components/LoginForm',
  component: LoginForm,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {
  args: {
    onSubmit: async (email: string, password: string) => {
      console.log('Login submitted:', { email, password });
      await new Promise((resolve) => setTimeout(resolve, 1000));
    },
  },
};

export const Loading: Story = {
  args: {
    onSubmit: async () => {},
    isLoading: true,
  },
};

export const WithError: Story = {
  args: {
    onSubmit: async () => {},
    errorMessage: 'Invalid email or password. Please try again.',
  },
};
