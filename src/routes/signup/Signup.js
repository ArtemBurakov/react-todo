import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'

export default function Signup() {
  const navigate = useNavigate()

  const onSignupClick = () => {
    navigate('/login', { replace: true })
  }

  return (
    <Button variant="outline-success" onClick={onSignupClick}>
      Signup
    </Button>
  )
}
