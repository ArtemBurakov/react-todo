import React, { useState, useMemo } from 'react'
import { useSelector } from 'react-redux'

import { Row } from 'react-bootstrap'

import WorkspaceItem from './WorkspaceItem'
import Pagination from '../Pagination/Pagination'
import { getWorkspaces } from '../../features/workspaces/workspacesSlice'

const WORKSPACES_PER_PAGE = 16

export default function WorkspacesList() {
  const workspaces = useSelector(getWorkspaces)
  const [currentPage, setCurrentPage] = useState(1)

  const filteredData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * WORKSPACES_PER_PAGE
    const lastPageIndex = firstPageIndex + WORKSPACES_PER_PAGE

    const data = workspaces
      .filter((workspace) => workspace.status === 10)
      .sort((a, b) => b.updated_at - a.updated_at)

    return {
      length: data.length,
      data: data.slice(firstPageIndex, lastPageIndex),
    }
  }, [workspaces, currentPage])

  return (
    <>
      <Row xs={1} md={2} lg={3} className="g-3">
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
    </>
  )
}
