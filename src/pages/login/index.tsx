import { useState } from 'react';
import Input from '../../components/Input';

interface LoginPageProps {}

function LoginPage(props: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    console.log('Sign in attempt:', { email, password });
  };

  return (
    <div className="login__container min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="login__card bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        
        <div className="login__header mb-8">
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            Welcome Back
          </h1>
          <p className="text-gray-600 text-center text-sm mt-2">
            Sign in to your account
          </p>
        </div>

        <div className="login__form space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={setEmail}
          />
          
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={setPassword}
          />

          <button
            onClick={handleSignIn}
            className="
              login__button
              w-full
              mt-6
              py-3
              px-4
              bg-gradient-to-r
              from-blue-500
              to-purple-600
              text-white
              font-semibold
              rounded-lg
              hover:from-blue-600
              hover:to-purple-700
              transition-all
              duration-200
            "
          >
            Sign In
          </button>
        </div>

        <div className="login__footer mt-8">
          <p className="text-center text-gray-600 text-sm">
            Don't have an account?{' '}
            <a href="#" className="text-blue-500 hover:text-blue-600 font-semibold">
              Sign up here
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}

export default LoginPage;
