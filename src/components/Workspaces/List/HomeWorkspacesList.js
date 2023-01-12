import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Row } from 'react-bootstrap'
import Masonry from 'react-masonry-css'

import WorkspaceItem from '../Item/WorkspaceItem'
import LoadingWorkspacesList from './LoadingWorkspacesList'
import { workspacesBreakpointColumns } from './WorkspacesBreakpointColumns'

import {
  getFetchWorkspacesLoading,
  getWorkspaces,
} from '../../../features/workspaces/workspacesSlice'

export default function HomeWorkspacesList({ maxWorkspaces }) {
  const workspaces = useSelector(getWorkspaces)
  const fetchWorkspacesLoading = useSelector(getFetchWorkspacesLoading)

  const filteredData = useMemo(() => {
    const data = workspaces
      .filter((workspace) => workspace.status !== 0)
      .sort((a, b) => b.updated_at - a.updated_at)

    return data.slice(0, maxWorkspaces)
  }, [workspaces])

  return (
    <>
      {filteredData.length > 0 && (
        <Row>
          <Link className="link-title mt-3 mb-2" to="workspaces">
            WORKSPACES
          </Link>
          {fetchWorkspacesLoading === 'pending' ? (
            <LoadingWorkspacesList numberOfWorkspaces={maxWorkspaces} />
          ) : (
            <Masonry
              breakpointCols={workspacesBreakpointColumns}
              className="masonry-grid"
              columnClassName="masonry-grid_column"
            >
              {filteredData?.map((workspace) => (
                <WorkspaceItem workspace={workspace} key={workspace.id} />
              ))}
            </Masonry>
          )}
        </Row>
      )}
    </>
  )
}
