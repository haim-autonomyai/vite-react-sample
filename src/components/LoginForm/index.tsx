import { useState } from 'react';

interface LoginFormProps {
  onSubmit?: (formData: { email: string; password: string }) => void;
  loading?: boolean;
  error?: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

function LoginForm(props: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  // Email validation regex
  const validateEmail = (emailValue: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailValue);
  };

  // Validate form before submission
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm() && props.onSubmit) {
      props.onSubmit({ email, password });
    }
  };

  // Handle email input change
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors({ ...errors, email: undefined });
    }
  };

  // Handle password input change
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors({ ...errors, password: undefined });
    }
  };

  const isFormValid = email.trim() && password.trim() && !props.loading;

  return (
    <form
      onSubmit={handleSubmit}
      className="login__form flex flex-col gap-4 w-full max-w-md"
    >
      {/* Email Input */}
      <div className="login__form-group flex flex-col gap-2">
        <label htmlFor="email" className="login__label text-left text-sm font-medium">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="you@example.com"
          className="login__input px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={props.loading}
        />
        {errors.email && (
          <span className="login__error-message text-red-500 text-xs">{errors.email}</span>
        )}
      </div>

      {/* Password Input */}
      <div className="login__form-group flex flex-col gap-2">
        <label htmlFor="password" className="login__label text-left text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="••••••••"
          className="login__input px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={props.loading}
        />
        {errors.password && (
          <span className="login__error-message text-red-500 text-xs">{errors.password}</span>
        )}
      </div>

      {/* Form-level error message */}
      {props.error && (
        <div className="login__form-error bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
          {props.error}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!isFormValid}
        className="login__button mt-4 w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {props.loading ? 'Logging in...' : 'Log In'}
      </button>
    </form>
  );
}

export default LoginForm;
