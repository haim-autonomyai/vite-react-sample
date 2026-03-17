import { useState } from 'react'

interface LoginFormProps {
  onSuccess: () => void
}

interface FormErrors {
  email?: string
  password?: string
}

function LoginForm(props: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})
  const [loading, setLoading] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      // Mock credentials
      const testEmail = 'test@example.com'
      const testPassword = 'password123'

      if (email === testEmail && password === testPassword) {
        // Store auth token in localStorage
        localStorage.setItem('authToken', 'mock-token-12345')
        props.onSuccess()
      } else {
        setErrors({
          email: 'Invalid email or password'
        })
      }

      setLoading(false)
    }, 500)
  }

  return (
    <form onSubmit={handleSubmit} className='loginform__container w-full max-w-md'>
      <div className='loginform__field mb-6'>
        <label htmlFor='email' className='block text-sm font-medium text-gray-900 mb-2'>
          Email
        </label>
        <input
          id='email'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='loginform__input w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
          placeholder='Enter your email'
          disabled={loading}
        />
        {errors.email && (
          <p className='loginform__error text-red-600 text-sm mt-1'>{errors.email}</p>
        )}
      </div>

      <div className='loginform__field mb-6'>
        <label htmlFor='password' className='block text-sm font-medium text-gray-900 mb-2'>
          Password
        </label>
        <input
          id='password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='loginform__input w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
          placeholder='Enter your password'
          disabled={loading}
        />
        {errors.password && (
          <p className='loginform__error text-red-600 text-sm mt-1'>{errors.password}</p>
        )}
      </div>

      <button
        type='submit'
        disabled={loading}
        className='loginform__button w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
      >
        {loading ? 'Logging in...' : 'Log In'}
      </button>

      <p className='loginform__hint text-sm text-gray-500 mt-4 text-center'>
        Demo credentials: test@example.com / password123
      </p>
    </form>
  )
}

export default LoginForm
