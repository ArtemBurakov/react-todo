import { useState } from 'react'

import SignupForm from '../../components/forms/Signup'
import API from './../../services/Api'

export default function Signup() {
  const [signupSuccess, setSignupSuccess] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [responseError, setResponseError] = useState({
    displayError: false,
    errorMessage: '',
  })

  const handleResponseErrors = (error) => {
    setErrors({})
    if (error.response && error.response.status === 422)
      error.response.data.forEach(({ field, message }) => {
        setErrors((prevState) => ({
          ...prevState,
          ...{ [field]: message },
        }))
      })
    else
      setResponseError({
        displayError: true,
        errorMessage:
          'Oops, something went wrong! Check your internet connection or try again later.',
      })
  }

  const onSignupClick = async () => {
    try {
      setLoading(true)
      await API.post(`users/sign-up`, { username, email, password })
      setLoading(false)
      setSignupSuccess(true)
    } catch (error) {
      setLoading(false)
      handleResponseErrors(error)
    }
  }

  return (
    <SignupForm
      setUsername={setUsername}
      setEmail={setEmail}
      setPassword={setPassword}
      onSignupClick={onSignupClick}
      signupSuccess={signupSuccess}
      isLoading={isLoading}
      formErrors={errors}
      responseError={responseError}
    />
  )
}
