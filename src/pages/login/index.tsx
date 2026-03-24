import { useState } from 'react';

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginPageProps {
  onSubmit?: (data: LoginFormData) => void;
}

function LoginPage(props: LoginPageProps) {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (props.onSubmit) {
      props.onSubmit(formData);
    }
  };

  return (
    <div className='
      login__container
      flex
      items-center
      justify-center
      min-h-screen
      bg-gradient-to-r
      from-[#6EE7B7]
      via-[#3B82F6]
      to-[#9333EA]
    '>
      <div className='
        login__card
        bg-white
        rounded-lg
        shadow-lg
        p-8
        w-full
        max-w-md
      '>
        <div className='login__header text-center mb-8'>
          <h1 className='
            text-3xl
            font-bold
            text-gray-900
            mb-2
          '>
            Welcome Back
          </h1>
          <p className='text-gray-600 text-sm'>
            Sign in to your account
          </p>
        </div>

        <form className='login__form' onSubmit={handleSubmit}>
          <div className='login__form-group mb-6'>
            <label htmlFor='email' className='
              block
              text-sm
              font-medium
              text-gray-900
              mb-2
            '>
              Email Address
            </label>
            <input
              id='email'
              name='email'
              type='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='you@example.com'
              className='
                w-full
                px-4
                py-2
                border
                border-gray-300
                rounded-lg
                focus:outline-none
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-200
                transition-colors
              '
              required
            />
          </div>

          <div className='login__form-group mb-8'>
            <label htmlFor='password' className='
              block
              text-sm
              font-medium
              text-gray-900
              mb-2
            '>
              Password
            </label>
            <input
              id='password'
              name='password'
              type='password'
              value={formData.password}
              onChange={handleChange}
              placeholder='••••••••'
              className='
                w-full
                px-4
                py-2
                border
                border-gray-300
                rounded-lg
                focus:outline-none
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-200
                transition-colors
              '
              required
            />
          </div>

          <button
            type='submit'
            className='
              w-full
              py-2
              px-4
              bg-gradient-to-r
              from-[#6EE7B7]
              via-[#3B82F6]
              to-[#9333EA]
              text-white
              font-medium
              rounded-lg
              hover:opacity-90
              transition-opacity
              focus:outline-none
              focus:ring-2
              focus:ring-blue-400
              focus:ring-offset-2
            '
          >
            Sign In
          </button>
        </form>

        <div className='login__footer text-center mt-6'>
          <p className='text-gray-600 text-sm'>
            Don't have an account?{' '}
            <a href='#' className='
              text-blue-500
              hover:text-blue-600
              font-medium
            '>
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
