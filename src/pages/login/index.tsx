import { useState } from 'react';
import FormInput from '../../components/FormInput';
import { useAuth } from '../../contexts/AuthContext';

interface LoginFormErrors {
  email?: string;
  password?: string;
  form?: string;
}

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const validateForm = (): boolean => {
    const newErrors: LoginFormErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!email.includes('@')) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      await login(email, password);
      // Navigation will be handled by the router based on auth state
      // In a real app with React Router, we would navigate here
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed. Please try again.';
      setErrors({ form: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login__container min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="login__form-wrapper w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="login__header text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">
            Sign in to your account to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="login__form">
          <FormInput
            label="Email Address"
            type="email"
            value={email}
            onChange={setEmail}
            error={errors.email}
            placeholder="you@example.com"
          />

          <FormInput
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            error={errors.password}
            placeholder="••••••••"
          />

          {errors.form && (
            <div className="login__form-error mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">
                {errors.form}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`
              login__submit-button
              w-full
              py-2
              rounded-lg
              font-medium
              transition-colors
              mt-6
              ${isLoading
                ? 'bg-blue-300 text-white cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
              }
            `}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>

          <div className="login__footer mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign up
              </a>
            </p>
          </div>
        </form>

        <div className="login__demo-info mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center mb-2 font-semibold">
            Demo Credentials
          </p>
          <p className="text-xs text-gray-500 text-center">
            Email: <span className="font-mono">test@example.com</span>
          </p>
          <p className="text-xs text-gray-500 text-center">
            Password: <span className="font-mono">password123</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
