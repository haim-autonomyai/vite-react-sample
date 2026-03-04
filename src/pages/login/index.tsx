import { useState } from 'react';

interface LoginFormState {
  email: string;
  password: string;
  emailError: string;
  loginError: string;
  isLoading: boolean;
}

function LoginPage() {
  const [formState, setFormState] = useState<LoginFormState>({
    email: '',
    password: '',
    emailError: '',
    loginError: '',
    isLoading: false,
  });

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setFormState((prev) => ({
      ...prev,
      email,
      emailError: email && !validateEmail(email) ? 'Invalid email format' : '',
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({
      ...prev,
      password: e.target.value,
      loginError: '', // Clear login error when user types
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate email format
    if (!formState.email || !validateEmail(formState.email)) {
      setFormState((prev) => ({
        ...prev,
        emailError: 'Please enter a valid email address',
      }));
      return;
    }

    // Validate password is not empty
    if (!formState.password) {
      setFormState((prev) => ({
        ...prev,
        loginError: 'Please enter a password',
      }));
      return;
    }

    // Mock credential check
    if (formState.password === 'password123') {
      // Successful login
      const token = `user-token-${Date.now()}`;
      localStorage.setItem('authToken', token);

      // Reset form and trigger re-render by reloading or updating parent state
      setFormState({
        email: '',
        password: '',
        emailError: '',
        loginError: '',
        isLoading: false,
      });

      // Trigger a change in localStorage to update App component
      window.dispatchEvent(new Event('authStateChange'));
    } else {
      // Failed login
      setFormState((prev) => ({
        ...prev,
        loginError: 'Invalid email or password',
        password: '',
      }));
    }
  };

  return (
    <div className="login__container flex items-center justify-center min-h-screen w-full">
      <div className="login__form-wrapper w-full max-w-md px-8">
        <div className="login__header mb-8">
          <h1 className="text-3xl font-bold mb-2">Login</h1>
          <p className="text-gray-400">Enter your credentials to access the feed</p>
        </div>

        <form onSubmit={handleSubmit} className="login__form">
          {/* Email Input */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="user@example.com"
              value={formState.email}
              onChange={handleEmailChange}
              className="login__input w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            />
            {formState.emailError && (
              <p className="login__error mt-2 text-red-500 text-sm">{formState.emailError}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={formState.password}
              onChange={handlePasswordChange}
              className="login__input w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            />
            {formState.loginError && (
              <p className="login__error mt-2 text-red-500 text-sm">{formState.loginError}</p>
            )}
          </div>

          {/* Demo Credentials Info */}
          <div className="mb-6 p-3 bg-blue-900 bg-opacity-30 rounded-lg border border-blue-700 border-opacity-50">
            <p className="text-sm text-blue-300">
              Demo: Use any email format and password <code className="bg-blue-950 px-2 py-1 rounded">password123</code>
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={formState.isLoading}
            className="login__submit w-full py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed font-medium transition-colors duration-200"
          >
            {formState.isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
