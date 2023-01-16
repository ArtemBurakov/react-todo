import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import SignupForm from '../../components/Forms/SignupForm'

import {
  getUserLoading,
  getUserSignupEvent,
  removeSignupStatus,
  signupUser,
} from './userSlice'

export default function Signup() {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const userLoading = useSelector(getUserLoading)
  const userSignupEvent = useSelector(getUserSignupEvent)

  useEffect(() => {
    return () => {
      if (userSignupEvent.status !== 'success') return
      dispatch(removeSignupStatus())
    }
  })

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
