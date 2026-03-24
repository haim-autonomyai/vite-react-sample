import { useState } from 'react';

interface LoginProps {
  onSubmit?: (email: string, password: string) => void;
}

function LoginPage(props: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (props.onSubmit) {
      props.onSubmit(email, password);
    }
  };

  return (
    <div className='
      login__container
      flex
      items-center
      justify-center
      w-full
      h-screen
      bg-gradient-to-r
      from-[#6EE7B7]
      via-[#3B82F6]
      to-[#9333EA]
    '>
      <div className='
        login__card
        bg-white
        rounded-lg
        shadow-md
        p-8
        w-96
      '>
        <div className='login__header mb-6'>
          <h1 className='text-2xl font-bold text-gray-900'>Login</h1>
          <p className='text-sm text-gray-500 mt-2'>Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className='login__form'>
          <div className='form__group mb-4'>
            <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-2'>
              Email
            </label>
            <input
              id='email'
              type='email'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='
                form__input
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
              '
              required
            />
          </div>

          <div className='form__group mb-6'>
            <label htmlFor='password' className='block text-sm font-medium text-gray-700 mb-2'>
              Password
            </label>
            <input
              id='password'
              type='password'
              placeholder='Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='
                form__input
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
              '
              required
            />
          </div>

          <button
            type='submit'
            className='
              login__button
              w-full
              bg-blue-500
              text-white
              py-2
              px-4
              rounded-lg
              font-medium
              hover:bg-blue-600
              transition-colors
              duration-200
            '
          >
            Sign In
          </button>
        </form>

        <div className='login__footer mt-4 text-center'>
          <p className='text-sm text-gray-600'>
            Don't have an account?{' '}
            <a href='#' className='text-blue-500 hover:text-blue-600 font-medium'>
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
