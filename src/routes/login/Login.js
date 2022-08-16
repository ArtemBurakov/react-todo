import useAuth from '../../hooks/useAuth'
import Button from 'react-bootstrap/Button'
import { useNavigate, useLocation } from 'react-router-dom'

export default function Login() {
  const { setAuth } = useAuth()

  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || ''

  const onLoginClick = () => {
    setAuth({ user: 'User' })
    navigate(from, { replace: true })
  }

  return (
    <Button variant="outline-success" onClick={onLoginClick}>
      Login
    </Button>
  )
}
