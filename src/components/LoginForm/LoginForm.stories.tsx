import type { Meta, StoryObj } from '@storybook/react-vite'
import { AuthContext, AuthContextType } from '../../contexts/AuthContext'
import LoginForm from './index'

// Mock AuthProvider decorator
const MockAuthProvider = (Story: React.ComponentType) => {
  const mockAuthContext: AuthContextType = {
    isAuthenticated: false,
    user: null,
    loading: false,
    login: async (email: string, password: string) => {
      console.log('Mock login called with:', email, password)
      // Simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000))
    },
    logout: () => {
      console.log('Mock logout called')
    }
  }

  return (
    <AuthContext.Provider value={mockAuthContext}>
      <Story />
    </AuthContext.Provider>
  )
}

const meta: Meta<typeof LoginForm> = {
  title: 'Components/LoginForm',
  component: LoginForm,
  decorators: [MockAuthProvider],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof LoginForm>

export const Default: Story = {
  args: {},
}
