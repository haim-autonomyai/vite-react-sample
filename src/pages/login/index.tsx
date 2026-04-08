import { useState } from 'react';
import LoginForm from '../../components/LoginForm';

interface LoginPageProps {
  onLoginSuccess?: () => void;
}

function LoginPage(props: LoginPageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (
    email: string,
    password: string
  ) => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock authentication - accept any email/password combination
      const token = btoa(`${email}:${password}`);
      
      // Store token and email in localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('userEmail', email);

      // Call success callback
      if (props.onLoginSuccess) {
        props.onLoginSuccess();
      }
    } catch (error) {
      setErrorMessage('Login failed. Please try again.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page__container">
      <div className="login-page__card">
        <h1 className="login-page__title">Welcome Back</h1>
        <p className="login-page__subtitle">
          Sign in to your account to continue
        </p>
        <LoginForm
          onSubmit={handleLogin}
          isLoading={isLoading}
          errorMessage={errorMessage}
        />
      </div>
    </div>
  );
}

export default LoginPage;
