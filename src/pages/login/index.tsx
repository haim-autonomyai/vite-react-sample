import { useState } from 'react'
import LoginForm from '../../components/LoginForm'

interface LoginPageProps {}

function LoginPage(props: LoginPageProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const simulateApiCall = (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock API: always succeeds in demo mode
        resolve({
          success: true,
          message: `Welcome back! You are now logged in as ${email}`
        })
      }, 2000)
    })
  }

  const handleLoginSubmit = async (email: string, password: string) => {
    setIsLoading(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      const response = await simulateApiCall(email, password)
      
      if (response.success) {
        setSuccessMessage(response.message)
        // In a real app, you would store the token and redirect
        // For demo, reset form after 2 seconds
        setTimeout(() => {
          setSuccessMessage('')
        }, 3000)
      } else {
        setErrorMessage('Login failed. Please try again.')
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignUpClick = () => {
    // Placeholder for sign up navigation
    console.log('Sign up clicked')
  }

  const handleForgotPasswordClick = () => {
    // Placeholder for forgot password navigation
    console.log('Forgot password clicked')
  }

  return (
    <div className='login-page__container min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4'>
      <div className='login-page__card bg-white rounded-lg shadow-lg p-8 w-full max-w-md'>
        {successMessage ? (
          <div className='login-page__success-container text-center'>
            <div className='login-page__success-icon mb-4'>
              <svg className='w-16 h-16 mx-auto text-green-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
              </svg>
            </div>
            <h2 className='login-page__success-title text-xl font-medium text-gray-900 mb-2'>
              Login Successful!
            </h2>
            <p className='login-page__success-message text-gray-600'>
              {successMessage}
            </p>
          </div>
        ) : (
          <LoginForm
            onSubmit={handleLoginSubmit}
            isLoading={isLoading}
            errorMessage={errorMessage}
            onSignUpClick={handleSignUpClick}
            onForgotPasswordClick={handleForgotPasswordClick}
          />
        )}
      </div>
    </div>
  )
}

export default LoginPage
