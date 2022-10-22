import React, { useState, useMemo } from 'react'
import { useSelector } from 'react-redux'

import { Row } from 'react-bootstrap'

import Pagination from '../Pagination/Pagination'
import WorkspaceItem from './Item/WorkspaceItem'
import AddNewWorkspaceItem from './Item/AddNewWorkspaceItem'
import AddWorkspace from './AddWorkspace'
import {
  getWorkspaces,
  getWorkspaceSearchParam,
  getWorkspaceSearchQuery,
  getWorkspaceSortBy,
} from '../../features/workspaces/workspacesSlice'

const WORKSPACES_PER_PAGE = 17

export default function WorkspacesList() {
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
      .filter((workspace) => workspace.status === 10)
      .filter((item) => {
        return searchParam?.some((newItem) => {
          return (
            item[newItem]
              ?.toString()
              ?.toLowerCase()
              ?.indexOf(searchQuery.toLowerCase()) > -1
          )
        })
      })
    switch (sortBy) {
      case 'recent':
        data.sort((a, b) => b.updated_at - a.updated_at)
        break
      case 'oldest':
        data.sort((a, b) => a.updated_at - b.updated_at)
        break
      case 'aToZ':
        data.sort()
        break
      case 'zToA':
        data.sort().reverse()
        break
      default:
        data.sort((a, b) => b.updated_at - a.updated_at)
    }

    return {
      length: data.length,
      data: data.slice(firstPageIndex, lastPageIndex),
    }
  }, [workspaces, currentPage, sortBy, searchQuery])

  return (
    <>
      <Row xs={1} md={2} lg={3} className="g-3 mt-0">
        <AddNewWorkspaceItem handleShow={handleShow} />
        {filteredData?.data?.map((workspace) => (
          <WorkspaceItem workspace={workspace} key={workspace.id} />
        ))}
      </Row>
      <Pagination
        currentPage={currentPage}
        totalCount={filteredData.length}
        pageSize={WORKSPACES_PER_PAGE}
        onPageChange={(page) => {
          window.scrollTo(0, 0)
          setCurrentPage(page)
        }}
      />
      {show && <AddWorkspace show={show} handleClose={handleClose} />}
    </>
  )
}
