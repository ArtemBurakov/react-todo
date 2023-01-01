import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import useBreadcrumbs from 'use-react-router-breadcrumbs'

import './Breadcrumbs.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'

import { getSelectedWorkspace } from '../../features/workspaces/workspacesSlice'

const DynamicWorkspaceBreadcrumb = () => {
  const selectedWorkspace = useSelector(getSelectedWorkspace)
  return <span>{selectedWorkspace?.name}</span>
}

const routes = [
  {
    path: '/',
    breadcrumb: () => <FontAwesomeIcon icon={faHouse} className="home-icon" />,
  },
  { path: '/workspaces/:workspaceId', breadcrumb: DynamicWorkspaceBreadcrumb },
]

export default function Breadcrumbs() {
  const location = useLocation()
  const breadcrumbs = useBreadcrumbs(routes)

  return (
    <div className="breadcrumbs">
      <ol className="breadcrumb">
        {breadcrumbs.map(({ breadcrumb, match }) => (
          <li
            key={match.pathname}
            className={`breadcrumb-item text-truncate ${
              match.pathname === location.pathname && 'active'
            }`}
          >
            <Link to={match.pathname}>{breadcrumb}</Link>
          </li>
        ))}
      </ol>
    </div>
  )
}
