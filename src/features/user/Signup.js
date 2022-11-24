import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import SignupForm from '../../components/Signup/SignupForm'

import { getUserLoading, signupUser } from './userSlice'

export default function Signup() {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const userLoading = useSelector(getUserLoading)

  const onSignupClick = () => {
    if (userLoading === 'idle')
      dispatch(signupUser({ username, email, password }))
  }

  return (
    <SignupForm
      setUsername={setUsername}
      setEmail={setEmail}
      setPassword={setPassword}
      onSignupClick={onSignupClick}
    />
  )
}
