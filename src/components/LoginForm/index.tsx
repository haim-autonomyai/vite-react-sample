import { useState } from 'react'

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void
  isLoading?: boolean
  errorMessage?: string
  onSignUpClick?: () => void
  onForgotPasswordClick?: () => void
}

function LoginForm(props: LoginFormProps) {
  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [localErrors, setLocalErrors] = useState({
    email: '',
    password: ''
  })

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateForm = (): boolean => {
    const errors = { email: '', password: '' }
    let isValid = true

    if (!emailValue.trim()) {
      errors.email = 'Email is required'
      isValid = false
    } else if (!validateEmail(emailValue)) {
      errors.email = 'Please enter a valid email address'
      isValid = false
    }

    if (!passwordValue) {
      errors.password = 'Password is required'
      isValid = false
    } else if (passwordValue.length < 6) {
      errors.password = 'Password must be at least 6 characters'
      isValid = false
    }

    setLocalErrors(errors)
    return isValid
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      props.onSubmit(emailValue, passwordValue)
    }
  }

  const isFormValid = emailValue.trim() && passwordValue && validateEmail(emailValue) && passwordValue.length >= 6

  return (
    <div className='login-form__container w-full max-w-md mx-auto'>
      <form onSubmit={handleSubmit} className='login-form__form'>
        <h1 className='login-form__title text-2xl font-medium text-gray-900 mb-8'>
          Welcome Back
        </h1>

        {props.errorMessage && (
          <div className='login-form__error-message bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6'>
            {props.errorMessage}
          </div>
        )}

        <div className='login-form__field mb-6'>
          <label htmlFor='email' className='login-form__label block text-sm font-medium text-gray-700 mb-2'>
            Email Address
          </label>
          <input
            id='email'
            type='email'
            value={emailValue}
            onChange={(e) => {
              setEmailValue(e.target.value)
              setLocalErrors({ ...localErrors, email: '' })
            }}
            placeholder='Enter your email'
            className='login-form__input w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          />
          {localErrors.email && (
            <p className='login-form__error-text text-red-600 text-sm mt-1'>
              {localErrors.email}
            </p>
          )}
        </div>

        <div className='login-form__field mb-6'>
          <label htmlFor='password' className='login-form__label block text-sm font-medium text-gray-700 mb-2'>
            Password
          </label>
          <div className='login-form__password-wrapper relative'>
            <input
              id='password'
              type={showPassword ? 'text' : 'password'}
              value={passwordValue}
              onChange={(e) => {
                setPasswordValue(e.target.value)
                setLocalErrors({ ...localErrors, password: '' })
              }}
              placeholder='Enter your password'
              className='login-form__password w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            />
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='login-form__toggle-password absolute right-3 top-2 text-gray-500 hover:text-gray-700'
            >
              {showPassword ? (
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' />
                </svg>
              ) : (
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21' />
                </svg>
              )}
            </button>
          </div>
          {localErrors.password && (
            <p className='login-form__error-text text-red-600 text-sm mt-1'>
              {localErrors.password}
            </p>
          )}
        </div>

        <button
          type='submit'
          disabled={!isFormValid || props.isLoading}
          className='login-form__submit w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200'
        >
          {props.isLoading ? (
            <div className='login-form__loader flex items-center justify-center'>
              <div className='animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2'></div>
              Signing in...
            </div>
          ) : (
            'Sign In'
          )}
        </button>

        <div className='login-form__footer mt-6 text-center'>
          <p className='login-form__signup-text text-sm text-gray-600'>
            Don't have an account?{' '}
            <button
              type='button'
              onClick={props.onSignUpClick}
              className='login-form__signup-link text-blue-500 hover:text-blue-600 font-medium'
            >
              Sign Up
            </button>
          </p>
          <p className='login-form__forgot-text text-sm text-gray-600 mt-3'>
            <button
              type='button'
              onClick={props.onForgotPasswordClick}
              className='login-form__forgot-link text-blue-500 hover:text-blue-600 font-medium'
            >
              Forgot Password?
            </button>
          </p>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
