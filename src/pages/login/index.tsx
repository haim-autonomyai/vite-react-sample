import { useState } from 'react';
import Input from '../../components/Input';
import { useAuth } from '../../context/AuthContext';

interface LoginPageProps {}

function LoginPage(props: LoginPageProps) {
  const { login, error: authError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
    } catch (err) {
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <div className='login__container'>
      <div className='login__form-wrapper'>
        <h1 className='login__title'>Welcome Back</h1>
        <p className='login__subtitle'>Sign in to your account</p>

        <form onSubmit={handleSubmit} className='login__form'>
          <div className='login__field-group'>
            <Input
              type='email'
              placeholder='Email address'
              value={email}
              onChange={handleEmailChange}
              name='email'
              required
            />
          </div>

          <div className='login__field-group'>
            <Input
              type='password'
              placeholder='Password'
              value={password}
              onChange={handlePasswordChange}
              name='password'
              required
            />
          </div>

          {authError && (
            <div className='login__error-message'>
              {authError}
            </div>
          )}

          <button
            type='submit'
            disabled={isLoading}
            className='login__submit-button'
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
