import { useSelector } from 'react-redux'
import { useLocation, Navigate, Outlet } from 'react-router-dom'

import { getUser } from '../features/user/userSlice'

const RequireAuth = () => {
  const location = useLocation()
  const user = useSelector(getUser)

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="login" state={{ from: location }} replace />
  )
}

export default RequireAuth
