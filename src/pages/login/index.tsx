import { useState } from 'react'
import LoginForm from '../../components/LoginForm'

function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleLogin = async (email: string, password: string, rememberMe: boolean) => {
    setIsLoading(true)
    setErrorMessage('')

    try {
      // Simulate API call to authentication endpoint
      // In a real app, this would be: const response = await fetch('/api/login', { ... })
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          rememberMe,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Login failed. Please try again.')
      }

      const data = await response.json()

      // Store auth token in localStorage if "Remember me" is checked
      if (rememberMe && data.token) {
        localStorage.setItem('authToken', data.token)
        localStorage.setItem('userEmail', email)
      } else if (data.token) {
        // Store temporarily in session storage if not remembering
        sessionStorage.setItem('authToken', data.token)
        sessionStorage.setItem('userEmail', email)
      }

      // Redirect to feed page on successful login
      // In a real app with routing, this would be: navigate('/feed')
      window.location.href = '/feed'
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'An error occurred. Please try again.'
      setErrorMessage(errorMsg)
      setIsLoading(false)
    }
  }

  return (
    <div className="loginpage__container min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="loginpage__content bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        {/* Header */}
        <div className="loginpage__header text-center mb-8">
          <h1 className="loginpage__title text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="loginpage__subtitle text-gray-600">
            Sign in to access your feed and connect with others
          </p>
        </div>

        {/* Login Form */}
        <div className="loginpage__form-wrapper">
          <LoginForm
            onSubmit={handleLogin}
            isLoading={isLoading}
            errorMessage={errorMessage}
          />
        </div>

        {/* Footer */}
        <div className="loginpage__footer text-center mt-8 pt-6 border-t border-gray-200">
          <p className="loginpage__signup-text text-gray-600 text-sm">
            Don't have an account?{' '}
            <a href="/signup" className="text-blue-500 hover:text-blue-700 font-medium">
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
