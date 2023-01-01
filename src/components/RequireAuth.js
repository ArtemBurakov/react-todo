import { useSelector } from 'react-redux'
import { useLocation, Navigate, Outlet } from 'react-router-dom'

import Breadcrumbs from './Breadcrumbs/Breadcrumbs'

import { getUser } from '../features/user/userSlice'

const RequireAuth = () => {
  const location = useLocation()
  const user = useSelector(getUser)

  return user ? (
    <>
      <Breadcrumbs />
      <Outlet />
    </>
  ) : (
    <Navigate to="login" state={{ from: location }} replace />
  )
}

export default RequireAuth
