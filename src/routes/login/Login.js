import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import useAuth from '../../hooks/useAuth'
import API from './../../services/Api'
import LoginForm from './../../components/forms/Login'

export default function Login() {
  const { setAuth } = useAuth()
  const navigate = useNavigate()

  const [isLoading, setLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [responseError, setResponseError] = useState({
    displayError: false,
    errorMessage: '',
  })

  const handleResponseErrors = (error) => {
    if (error.response && error.response.status === 401)
      setResponseError({
        displayError: true,
        errorMessage:
          'You are requesting with an invalid credential! Check your username or password.',
      })
    else
      setResponseError({
        displayError: true,
        errorMessage:
          'Oops, something went wrong! Check your internet connection or try again later.',
      })
  }

  const onLoginClick = async () => {
    try {
      setLoading(true)
      const response = await API.post(`users/authorize`, { username, password })
      setLoading(false)
      const user = response.data
      setAuth(user)
      localStorage.setItem('user', JSON.stringify(user))
      navigate('/', { replace: true })
    } catch (error) {
      setLoading(false)
      handleResponseErrors(error)
    }
  }

  return (
    <LoginForm
      setUsername={setUsername}
      setPassword={setPassword}
      onLoginClick={onLoginClick}
      isLoading={isLoading}
      responseError={responseError}
    />
  )
}
