import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'

interface LoginFormProps {
  onSuccess?: () => void
}

interface FormErrors {
  email?: string
  password?: string
  submit?: string
}

function LoginForm(props: LoginFormProps) {
  const { login, loading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<{ email?: boolean; password?: boolean }>({})

  const validateEmail = (value: string): string | undefined => {
    if (!value) {
      return 'Email is required'
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address'
    }
    return undefined
  }

  const validatePassword = (value: string): string | undefined => {
    if (!value) {
      return 'Password is required'
    }
    if (value.length < 6) {
      return 'Password must be at least 6 characters'
    }
    return undefined
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)
    
    if (touched.email) {
      const error = validateEmail(value)
      setErrors(prev => ({
        ...prev,
        email: error,
        submit: undefined // Clear submit error when user corrects field
      }))
    }
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPassword(value)
    
    if (touched.password) {
      const error = validatePassword(value)
      setErrors(prev => ({
        ...prev,
        password: error,
        submit: undefined // Clear submit error when user corrects field
      }))
    }
  }

  const handleEmailBlur = () => {
    setTouched(prev => ({ ...prev, email: true }))
    const error = validateEmail(email)
    setErrors(prev => ({ ...prev, email: error }))
  }

  const handlePasswordBlur = () => {
    setTouched(prev => ({ ...prev, password: true }))
    const error = validatePassword(password)
    setErrors(prev => ({ ...prev, password: error }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Validate all fields
    const emailError = validateEmail(email)
    const passwordError = validatePassword(password)
    
    setTouched({ email: true, password: true })
    
    if (emailError || passwordError) {
      setErrors({
        email: emailError,
        password: passwordError
      })
      return
    }

    try {
      setErrors({})
      await login(email, password)
      if (props.onSuccess) {
        props.onSuccess()
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed'
      setErrors({
        submit: errorMessage
      })
    }
  }

  return (
    <div className='login__container flex flex-col items-center justify-center w-full h-screen bg-white'>
      <div className='login__form-wrapper w-96 p-8 rounded-lg shadow-lg border border-gray-200'>
        <h1 className='login__title text-2xl font-medium text-gray-900 text-center mb-6'>
          Login
        </h1>

        <form onSubmit={handleSubmit} className='login__form flex flex-col gap-4'>
          {/* Email Field */}
          <div className='login__field-group flex flex-col gap-1'>
            <label htmlFor='email' className='login__label text-sm font-medium text-gray-900'>
              Email
            </label>
            <input
              id='email'
              type='email'
              className={`login__input px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
              }`}
              placeholder='Enter your email'
              value={email}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
              disabled={loading}
            />
            {errors.email && (
              <span className='login__error-message text-sm text-red-500 mt-1'>
                {errors.email}
              </span>
            )}
          </div>

          {/* Password Field */}
          <div className='login__field-group flex flex-col gap-1'>
            <label htmlFor='password' className='login__label text-sm font-medium text-gray-900'>
              Password
            </label>
            <input
              id='password'
              type='password'
              className={`login__input px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
              }`}
              placeholder='Enter your password'
              value={password}
              onChange={handlePasswordChange}
              onBlur={handlePasswordBlur}
              disabled={loading}
            />
            {errors.password && (
              <span className='login__error-message text-sm text-red-500 mt-1'>
                {errors.password}
              </span>
            )}
          </div>

          {/* Submit Error Message */}
          {errors.submit && (
            <div className='login__submit-error bg-red-50 border border-red-200 rounded-lg p-3 mt-2'>
              <p className='text-sm text-red-700'>{errors.submit}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type='submit'
            disabled={loading}
            className='login__button w-full px-4 py-2 mt-4 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2'
          >
            {loading ? (
              <>
                <span className='inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></span>
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>

        {/* Demo Info */}
        <div className='login__demo-info mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200'>
          <p className='text-xs text-gray-600 font-medium mb-2'>Demo Credentials:</p>
          <ul className='text-xs text-gray-600 space-y-1'>
            <li>Email: user@example.com</li>
            <li>Email: test@example.com</li>
            <li>Email: demo@example.com</li>
            <li>Password: Any (min 6 chars)</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
