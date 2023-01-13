import axios from 'axios'
import {
  RESPONSE_NETWORK_ERROR,
  RESPONSE_NETWORK_INVALID_CREDENTIALS,
} from './constants'

export default axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Pragma: 'no-cache',
    'Cache-Control': 'no-cache',
  },
})

export const handleResponseError = ({ response }) => {
  if (response.status === 401) {
    if (localStorage.getItem('user')) localStorage.removeItem('user')
    return RESPONSE_NETWORK_INVALID_CREDENTIALS
  }

  return RESPONSE_NETWORK_ERROR
}

export const handleSignupResponseError = ({ response }) => {
  const responseError = {
    errorMessage: null,
    formError: null,
  }

  if (response.status === 422) {
    response.data.forEach(({ field, message }) => {
      responseError.formError = {
        ...responseError.formError,
        ...{ [field]: message },
      }
    })
  } else {
    responseError.errorMessage = RESPONSE_NETWORK_ERROR
  }

  return responseError
}
