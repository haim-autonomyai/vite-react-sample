import { useState } from 'react';
import '../../App.css';

interface LoginFormData {
  email: string;
  password: string;
}

function LoginPage() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });

  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Login attempt with:', formData);
      // Reset form on success
      setFormData({ email: '', password: '' });
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='
      login__container
      flex
      justify-center
      items-center
      min-h-screen
      bg-gradient-to-r
      from-[#6EE7B7]
      via-[#3B82F6]
      to-[#9333EA]
    '>
      <form 
        onSubmit={handleSubmit}
        className='
          login__form
          bg-white
          rounded-lg
          shadow-lg
          p-8
          w-full
          max-w-md
        '
      >
        <div className='login__header mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>
            Login
          </h1>
          <p className='text-gray-600'>
            Welcome back! Please enter your credentials
          </p>
        </div>

        {error && (
          <div className='
            login__error
            bg-red-100
            border
            border-red-400
            text-red-700
            px-4
            py-3
            rounded
            mb-4
          '>
            {error}
          </div>
        )}

        <div className='login__field mb-6'>
          <label 
            htmlFor='email'
            className='
              block
              text-gray-700
              font-medium
              mb-2
            '
          >
            Email Address
          </label>
          <input
            type='email'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleInputChange}
            placeholder='your@email.com'
            className='
              w-full
              px-4
              py-2
              border
              border-gray-300
              rounded-lg
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              focus:border-transparent
              text-gray-900
            '
          />
        </div>

        <div className='login__field mb-6'>
          <label 
            htmlFor='password'
            className='
              block
              text-gray-700
              font-medium
              mb-2
            '
          >
            Password
          </label>
          <input
            type='password'
            id='password'
            name='password'
            value={formData.password}
            onChange={handleInputChange}
            placeholder='••••••••'
            className='
              w-full
              px-4
              py-2
              border
              border-gray-300
              rounded-lg
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              focus:border-transparent
              text-gray-900
            '
          />
        </div>

        <button
          type='submit'
          disabled={isLoading}
          className='
            login__button
            w-full
            py-2
            px-4
            bg-gradient-to-r
            from-[#3B82F6]
            to-[#9333EA]
            text-white
            font-medium
            rounded-lg
            hover:shadow-lg
            transition-shadow
            duration-200
            disabled:opacity-50
            disabled:cursor-not-allowed
          '
        >
          {isLoading ? 'Logging in...' : 'Sign In'}
        </button>

        <div className='login__footer mt-6 text-center'>
          <p className='text-gray-600 text-sm'>
            Don't have an account?{' '}
            <a 
              href='#'
              className='text-blue-600 hover:text-blue-800 font-medium'
            >
              Sign up
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
