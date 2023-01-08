import React, { useState, useMemo } from 'react'
import { useSelector } from 'react-redux'

import Masonry from 'react-masonry-css'

import NoteItem from './NoteItem'
import Pagination from '../../Pagination/Pagination'
import { notesBreakpointColumns } from './NotesBreakpointColumns'

import {
  getNotes,
  getNoteSearchQuery,
  getNoteSortBy,
  getNoteSearchParam,
  getNotesActiveFilterStatus,
} from '../../../features/notes/notesSlice'
import { getSelectedWorkspace } from '../../../features/workspaces/workspacesSlice'

const NOTES_PER_PAGE = 15
const ALL_NOTES_STATUS = 30

export default function NotesList({ maxNotes = null }) {
  const [currentPage, setCurrentPage] = useState(1)
  const notes = useSelector(getNotes)
  const noteStatus = useSelector(getNotesActiveFilterStatus)
  const sortBy = useSelector(getNoteSortBy)
  const searchQuery = useSelector(getNoteSearchQuery)
  const searchParam = useSelector(getNoteSearchParam)
  const selectedWorkspace = useSelector(getSelectedWorkspace)

  const prepareData = useMemo(() => {
    if (noteStatus === ALL_NOTES_STATUS)
      return selectedWorkspace
        ? notes.filter((note) => note.board_id === selectedWorkspace?.id)
        : [...notes]

    return notes
      .filter((note) => note.board_id === (selectedWorkspace?.id || null))
      .filter((note) => note.status === noteStatus)
  }, [noteStatus, notes, selectedWorkspace])

  const filteredData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * NOTES_PER_PAGE
    const lastPageIndex = firstPageIndex + NOTES_PER_PAGE

    const data = prepareData.filter((item) =>
      searchParam?.some(
        (newItem) =>
          item[newItem]
            ?.toString()
            ?.toLowerCase()
            ?.indexOf(searchQuery.toLowerCase()) > -1
      )
    )

    if (sortBy === 'recent') data.sort((a, b) => b.updated_at - a.updated_at)
    if (sortBy === 'oldest') data.sort((a, b) => a.updated_at - b.updated_at)
    if (sortBy === 'aToZ') data.sort()
    if (sortBy === 'zToA') data.sort().reverse()

    return {
      length: data.length,
      data: maxNotes
        ? data.slice(0, maxNotes)
        : data.slice(firstPageIndex, lastPageIndex),
    }
  }, [prepareData, currentPage, sortBy, searchParam, searchQuery])

  return (
    <>
      <Masonry
        breakpointCols={notesBreakpointColumns}
        className="masonry-grid"
        columnClassName="masonry-grid_column"
      >
        {filteredData?.data?.map((note) => (
          <NoteItem note={note} key={note.id} />
        ))}
      </Masonry>
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
