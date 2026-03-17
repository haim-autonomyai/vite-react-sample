import LoginForm from "../../components/LoginForm"

interface LoginPageProps {
  onSuccess: () => void
}

function LoginPage(props: LoginPageProps) {
  return (
    <div className='loginpage__container flex items-center justify-center min-h-screen bg-white'>
      <div className='loginpage__content w-full max-w-md px-4'>
        <div className='loginpage__header text-center mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>Welcome Back</h1>
          <p className='text-gray-600'>Sign in to your account</p>
        </div>

        <LoginForm onSuccess={props.onSuccess} />
      </div>
    </div>
  )
}

export default LoginPage
