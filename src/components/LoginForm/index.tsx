import { useState } from 'react';
import Input from '../Input';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  isLoading?: boolean;
  errorMessage?: string;
}

function LoginForm(props: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (value: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset errors
    setEmailError('');
    setPasswordError('');

    // Validate email
    if (!email) {
      setEmailError('Email is required');
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
    }

    // Validate password
    if (!password) {
      setPasswordError('Password is required');
    }

    // Only proceed if validation passes
    if (email && validateEmail(email) && password) {
      try {
        await props.onSubmit(email, password);
      } catch (error) {
        console.error('Login failed:', error);
      }
    }
  };

  return (
    <form className="login-form__container" onSubmit={handleSubmit}>
      {props.errorMessage && (
        <div className="login-form__error-message">{props.errorMessage}</div>
      )}
      
      <div className="login-form__field">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={emailError}
          disabled={props.isLoading}
        />
      </div>

      <div className="login-form__field">
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={passwordError}
          disabled={props.isLoading}
        />
      </div>

      <button
        className="login-form__submit-button"
        type="submit"
        disabled={props.isLoading}
      >
        {props.isLoading ? 'Logging in...' : 'Login'}
      </button>

      <p className="login-form__signup-link">
        Don't have an account? <a href="#signup">Sign up</a>
      </p>
    </form>
  );
}

export default LoginForm;
