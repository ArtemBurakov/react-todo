import axios from 'axios'

const URL = 'http://192.168.88.23/php-yii2-todo/backend/web/v1/'

export default axios.create({
  baseURL: URL,
  headers: {
    'Content-Type': 'application/json',
    Pragma: 'no-cache',
    'Cache-Control': 'no-cache',
  },
})

export const handleResponseError = ({ response }) => {
  if (response.status === 401) {
    if (localStorage.getItem('user')) localStorage.removeItem('user')
    return 'You are requesting with an invalid credential! Check your username or password.'
  }

  return 'Oops, something went wrong! Check your internet connection or try again later.'
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
    responseError.errorMessage =
      'Oops, something went wrong! Check your internet connection or try again later.'
  }

  return responseError
}
