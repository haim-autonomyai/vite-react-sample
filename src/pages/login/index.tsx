import { useState } from 'react';
import LoginForm from '../../components/LoginForm';

interface LoginFormData {
  email: string;
  password: string;
}

function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleLoginSubmit = (formData: LoginFormData) => {
    setLoading(true);
    setError('');

    // Simulate API call delay
    setTimeout(() => {
      console.log('Login attempted with:', formData);
      // In a real implementation, this would call an authentication API
      // For now, just log the data and show success
      setLoading(false);
    }, 500);
  };

  return (
    <div className="login__container flex items-center justify-center min-h-screen bg-gray-50">
      <div className="login__content flex flex-col gap-8 w-full max-w-md px-4 py-8">
        {/* Header */}
        <div className="login__header flex flex-col gap-2 text-center">
          <h1 className="login__title text-4xl font-bold text-gray-900">Welcome Back</h1>
          <p className="login__subtitle text-gray-600">
            Log in to your account to continue
          </p>
        </div>

        {/* Login Form */}
        <div className="login__form-wrapper">
          <LoginForm
            onSubmit={handleLoginSubmit}
            loading={loading}
            error={error || undefined}
          />
        </div>

        {/* Divider */}
        <div className="login__divider flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-gray-500 text-sm">or</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Footer Links */}
        <div className="login__footer flex flex-col gap-4 text-center">
          <div className="login__signup-link">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <a href="/signup" className="text-blue-600 font-medium hover:text-blue-700">
                Sign up
              </a>
            </p>
          </div>

          <div className="login__reset-link">
            <a href="/reset-password" className="text-blue-600 font-medium hover:text-blue-700">
              Forgot your password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
