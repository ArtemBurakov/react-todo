import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'

import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRightFromBracket,
  faArrowRightToBracket,
} from '@fortawesome/free-solid-svg-icons'

import './Header.css'
import Search from '../Search/Search'
import { getUser, removeUser } from '../../features/user/userSlice'

export default function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(getUser)
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false)

  const onLogoutClick = () => {
    dispatch(removeUser())
    navigate('login', { replace: true })
  }

  const hideMobileMenu = () => {
    if (isMobileMenuActive) setIsMobileMenuActive(!isMobileMenuActive)
  }

  return (
    <header className="border-bottom">
      <nav className={isMobileMenuActive ? 'mobile-view' : ''}>
        <div className="nav-container">
          <NavLink to="/" className="app-logo" onClick={hideMobileMenu}>
            Todoify
          </NavLink>
          <div className="menu">
            <NavLink to="/">Home</NavLink>
            {user ? (
              <>
                <NavLink to="tasks">Tasks</NavLink>
                <NavLink to="notes">Notes</NavLink>
                <NavLink to="workspaces">Workspaces</NavLink>
                <Search />
                <Button variant="outline-danger" onClick={onLogoutClick}>
                  <FontAwesomeIcon icon={faArrowRightFromBracket} />
                </Button>
              </>
            ) : (
              <NavLink to="login">Login</NavLink>
            )}
          </div>
          <button
            className={`hamburger ${isMobileMenuActive ? 'is-active' : ''}`}
            onClick={() => {
              setIsMobileMenuActive(!isMobileMenuActive)
            }}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${isMobileMenuActive ? 'is-open' : ''}`}>
        <NavLink to="/" onClick={hideMobileMenu}>
          Home
        </NavLink>
        {user ? (
          <>
            <NavLink to="tasks" onClick={hideMobileMenu}>
              Tasks
            </NavLink>
            <NavLink to="notes" onClick={hideMobileMenu}>
              Notes
            </NavLink>
            <NavLink to="workspaces" onClick={hideMobileMenu}>
              Workspaces
            </NavLink>
            <a
              href=""
              className="link-with-image"
              onClick={() => {
                hideMobileMenu()
                onLogoutClick()
              }}
            >
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
              <span>Logout</span>
            </a>
          </>
        ) : (
          <NavLink
            to="login"
            className="link-with-image"
            onClick={hideMobileMenu}
          >
            <FontAwesomeIcon icon={faArrowRightToBracket} />
            <span>Login</span>
          </NavLink>
        )}
      </div>
    </header>
  )
}
