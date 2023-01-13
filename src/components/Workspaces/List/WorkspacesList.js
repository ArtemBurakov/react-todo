import React, { useState, useMemo } from 'react'
import { useSelector } from 'react-redux'

import Masonry from 'react-masonry-css'

import {
  SORT_BY_A_TO_Z,
  SORT_BY_OLDEST,
  SORT_BY_RECENT,
  SORT_BY_Z_TO_A,
  STATUS_ACTIVE,
  WORKSPACES_PER_PAGE,
} from '../../../app/constants'
import AddWorkspace from '../AddWorkspace'
import WorkspaceItem from '../Item/WorkspaceItem'
import Pagination from '../../Pagination/Pagination'
import AddNewWorkspaceItem from '../Item/AddNewWorkspaceItem'
import { workspacesBreakpointColumns } from './WorkspacesBreakpointColumns'

import {
  getWorkspaces,
  getWorkspaceSearchParam,
  getWorkspaceSearchQuery,
  getWorkspaceSortBy,
} from '../../../features/workspaces/workspacesSlice'

export default function WorkspacesList({
  showCreateWorkspaceButton = true,
  maxWorkspaces = null,
}) {
  const workspaces = useSelector(getWorkspaces)
  const [currentPage, setCurrentPage] = useState(1)
  const [show, setShow] = useState(false)
  const sortBy = useSelector(getWorkspaceSortBy)
  const searchQuery = useSelector(getWorkspaceSearchQuery)
  const searchParam = useSelector(getWorkspaceSearchParam)

  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  const filteredData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * WORKSPACES_PER_PAGE
    const lastPageIndex = firstPageIndex + WORKSPACES_PER_PAGE

    const data = workspaces
      .filter((workspace) => workspace.status === STATUS_ACTIVE)
      .filter((item) =>
        searchParam?.some(
          (newItem) =>
            item[newItem]
              ?.toString()
              ?.toLowerCase()
              ?.indexOf(searchQuery.toLowerCase()) > -1
        )
      )

    if (sortBy === SORT_BY_RECENT)
      data.sort((a, b) => b.updated_at - a.updated_at)
    if (sortBy === SORT_BY_OLDEST)
      data.sort((a, b) => a.updated_at - b.updated_at)
    if (sortBy === SORT_BY_A_TO_Z) data.sort()
    if (sortBy === SORT_BY_Z_TO_A) data.sort().reverse()

    return {
      length: data.length,
      data: maxWorkspaces
        ? data.slice(0, maxWorkspaces)
        : data.slice(firstPageIndex, lastPageIndex),
    }
  }, [currentPage, workspaces, sortBy, searchParam, searchQuery])

  return (
    <>
      <Masonry
        breakpointCols={workspacesBreakpointColumns}
        className="masonry-grid"
        columnClassName="masonry-grid_column"
      >
        {showCreateWorkspaceButton && (
          <AddNewWorkspaceItem handleShow={handleShow} />
        )}
        {filteredData?.data?.map((workspace) => (
          <WorkspaceItem workspace={workspace} key={workspace.id} />
        ))}
      </Masonry>
      {!maxWorkspaces && (
        <Pagination
          currentPage={currentPage}
          totalCount={filteredData.length}
          pageSize={WORKSPACES_PER_PAGE}
          onPageChange={(page) => {
            window.scrollTo(0, 0)
            setCurrentPage(page)
          }}
        />
      )}
      {show && <AddWorkspace show={show} handleClose={handleClose} />}
    </>
  )
}
