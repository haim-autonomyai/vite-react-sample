import { useState } from 'react';
import Input from '../Input';
import { useAuth } from '../../context/AuthContext';

interface LoginFormProps {
  onSuccess?: () => void;
}

function LoginForm(props: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const { login, isLoading, error: authError } = useAuth();

  // Email validation regex
  const validateEmail = (value: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  // Validate fields on input change
  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (value && !validateEmail(value)) {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email' }));
    } else {
      setErrors(prev => (prev.email ? { ...prev, email: undefined } : prev));
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (!value) {
      setErrors(prev => ({ ...prev, password: 'Password is required' }));
    } else {
      setErrors(prev => (prev.password ? { ...prev, password: undefined } : prev));
    }
  };

  // Validate on form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: { email?: string; password?: string } = {};
    
    // Validate email
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    // Validate password
    if (!password) {
      newErrors.password = 'Password is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Call login from AuthContext
    try {
      await login(email, password, rememberMe);
      // Reset form after successful login
      setEmail('');
      setPassword('');
      setRememberMe(false);
      setErrors({});
      // Call callback if provided
      if (props.onSuccess) {
        props.onSuccess();
      }
    } catch (err) {
      // Error is handled in AuthContext
    }
  };

  return (
    <form className='login__form' onSubmit={handleSubmit}>
      <Input
        label='Email'
        type='email'
        value={email}
        onChange={handleEmailChange}
        error={errors.email}
        placeholder='you@example.com'
        disabled={isLoading}
      />
      
      <Input
        label='Password'
        type='password'
        value={password}
        onChange={handlePasswordChange}
        error={errors.password}
        placeholder='Enter your password'
        disabled={isLoading}
      />
      
      <div className='login__checkbox-group'>
        <input
          id='rememberMe'
          type='checkbox'
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          disabled={isLoading}
          className='login__checkbox'
        />
        <label htmlFor='rememberMe' className='login__checkbox-label'>
          Remember me
        </label>
      </div>

      {authError && (
        <p className='login__error login__error--form'>
          {authError}
        </p>
      )}

      <button
        type='submit'
        disabled={isLoading || !email || !password || errors.email !== undefined || errors.password !== undefined}
        className='login__button'
      >
        {isLoading ? 'Logging in...' : 'Log In'}
      </button>
    </form>
  );
}

export default LoginForm;
