import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import LoginForm from '../../components/Forms/LoginForm'

import { authorizeUser, getUser, getUserLoading } from './userSlice'

export default function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const userLoading = useSelector(getUserLoading)
  const user = useSelector(getUser)

  useEffect(() => {
    if (userLoading === 'idle' && user) navigate('/', { replace: true })
  }, [userLoading, user])

  const onLoginClick = () => {
    if (userLoading === 'idle') dispatch(authorizeUser({ username, password }))
  }

  return (
    <LoginForm
      setUsername={setUsername}
      setPassword={setPassword}
      onLoginClick={onLoginClick}
    />
  )
}
