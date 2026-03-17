import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import LoginPage from './index'

const meta: Meta<typeof LoginPage> = {
  title: 'Pages/LoginPage',
  component: LoginPage,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    onSuccess: fn(),
  },
}

export default meta
type Story = StoryObj<typeof LoginPage>

/**
 * Login form with demo credentials displayed.
 * Users can type into the email/password fields, see validation errors when empty,
 * and submit with the test credentials (test@example.com / password123).
 */
export const Default: Story = {}
