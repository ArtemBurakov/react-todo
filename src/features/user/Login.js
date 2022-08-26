import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { authorizeUser, getUserLoading } from './userSlice'

import LoginForm from '../../components/Login/LoginForm'

export default function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const userLoading = useSelector(getUserLoading)

  const onLoginClick = async () => {
    if (userLoading === 'idle') {
      await dispatch(authorizeUser({ username, password }))
      navigate('/', { replace: true })
    }
  }

  return (
    <LoginForm
      setUsername={setUsername}
      setPassword={setPassword}
      onLoginClick={onLoginClick}
    />
  )
}
