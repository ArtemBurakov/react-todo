import React from 'react'
import { useSelector } from 'react-redux'

import Guest from './Guest'
import Authorized from './Authorized'

import { getUser } from '../../features/user/userSlice'

export default function Home() {
  const user = useSelector(getUser)
  return !user ? <Guest /> : <Authorized />
}
