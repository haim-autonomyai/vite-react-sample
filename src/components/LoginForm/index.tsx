import { useState } from 'react'

interface LoginFormProps {
  onSubmit: (email: string, password: string, rememberMe: boolean) => Promise<void>;
  isLoading?: boolean;
  errorMessage?: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

function LoginForm(props: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState({ email: false, password: false })

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Email validation
    if (!email) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required'
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleBlur = (field: 'email' | 'password') => {
    setTouched({ ...touched, [field]: true })
    
    // Validate field on blur
    const newErrors = { ...errors }
    if (field === 'email') {
      if (!email) {
        newErrors.email = 'Email is required'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        newErrors.email = 'Please enter a valid email address'
      } else {
        delete newErrors.email
      }
    } else if (field === 'password') {
      if (!password) {
        newErrors.password = 'Password is required'
      } else if (password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters'
      } else {
        delete newErrors.password
      }
    }
    setErrors(newErrors)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      await props.onSubmit(email, password, rememberMe)
    }
  }

  return (
    <div className="loginform__container w-full max-w-md">
      <form onSubmit={handleSubmit} className="loginform__form">
        {/* Email Field */}
        <div className="loginform__field mb-6">
          <label 
            htmlFor="email" 
            className="loginform__label block text-sm font-medium text-gray-900 mb-2"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => handleBlur('email')}
            className={`loginform__input w-full px-4 py-2 border rounded-lg transition-colors ${
              touched.email && errors.email 
                ? 'border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500' 
                : 'border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
            }`}
            placeholder="you@example.com"
            disabled={props.isLoading}
          />
          {touched.email && errors.email && (
            <p className="loginform__error text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="loginform__field mb-6">
          <label 
            htmlFor="password" 
            className="loginform__label block text-sm font-medium text-gray-900 mb-2"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => handleBlur('password')}
            className={`loginform__input w-full px-4 py-2 border rounded-lg transition-colors ${
              touched.password && errors.password 
                ? 'border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500' 
                : 'border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
            }`}
            placeholder="••••••••"
            disabled={props.isLoading}
          />
          {touched.password && errors.password && (
            <p className="loginform__error text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Remember Me Checkbox */}
        <div className="loginform__remember mb-6 flex items-center">
          <input
            id="rememberMe"
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="loginform__checkbox w-4 h-4 rounded border-gray-300"
            disabled={props.isLoading}
          />
          <label 
            htmlFor="rememberMe" 
            className="loginform__remember-label ml-2 text-sm text-gray-600"
          >
            Remember me
          </label>
        </div>

        {/* Error Message */}
        {props.errorMessage && (
          <div className="loginform__error-message bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {props.errorMessage}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={props.isLoading}
          className="loginform__submit w-full py-2 px-4 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {props.isLoading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  )
}

export default LoginForm
