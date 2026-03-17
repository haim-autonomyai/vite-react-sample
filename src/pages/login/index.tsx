import LoginForm from '../../components/LoginForm'

interface LoginPageProps {
  onLoginSuccess?: () => void
}

function LoginPage(props: LoginPageProps) {
  return (
    <LoginForm onSuccess={props.onLoginSuccess} />
  )
}

export default LoginPage
