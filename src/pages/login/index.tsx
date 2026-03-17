import LoginForm from '../../components/LoginForm';

interface LoginPageProps {
  onLoginSuccess?: () => void;
}

function LoginPage(props: LoginPageProps) {
  return (
    <div className='login__page'>
      <div className='login__card'>
        <h1 className='login__header'>Login</h1>
        <LoginForm onSuccess={props.onLoginSuccess} />
      </div>
    </div>
  );
}

export default LoginPage;
