import React, { useState, useMemo } from 'react'
import { useSelector } from 'react-redux'

import { Row } from 'react-bootstrap'

import NoteItem from './NoteItem'
import Pagination from '../Pagination/Pagination'
import { getNotes } from '../../features/notes/notesSlice'
import { getSelectedWorkspace } from '../../features/workspaces/workspacesSlice'

const NOTES_PER_PAGE = 14

export default function NotesList({ status }) {
  const notes = useSelector(getNotes)
  const selectedWorkspace = useSelector(getSelectedWorkspace)
  const [currentPage, setCurrentPage] = useState(1)

  const filteredData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * NOTES_PER_PAGE
    const lastPageIndex = firstPageIndex + NOTES_PER_PAGE

    const data = notes
      .filter(
        (note) =>
          note.board_id === (selectedWorkspace?.id || null) &&
          note.status === status
      )
      .sort((a, b) => b.updated_at - a.updated_at)
      .sort((a, b) => a.status - b.status)

    return {
      length: data.length,
      data: data.slice(firstPageIndex, lastPageIndex),
    }
  }, [notes, currentPage])

  return (
    <>
      <Row xs={1} md={2} lg={3} className="g-3">
        {filteredData?.data?.map((note) => (
          <NoteItem note={note} key={note.id} />
        ))}
      </Row>
      <Pagination
        currentPage={currentPage}
        totalCount={filteredData.length}
        pageSize={NOTES_PER_PAGE}
        onPageChange={(page) => {
          window.scrollTo(0, 0)
          setCurrentPage(page)
        }}
      />
    </>
  )
}
