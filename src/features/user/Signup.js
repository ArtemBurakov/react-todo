import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUserLoading, signupUser } from './userSlice'

import SignupForm from '../../components/Signup/SignupForm'

export default function Signup() {
  const dispatch = useDispatch()
  const userLoading = useSelector(getUserLoading)

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSignupClick = () => {
    if (userLoading === 'idle') {
      dispatch(signupUser({ username, email, password }))
    }
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
