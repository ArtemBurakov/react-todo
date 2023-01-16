import React, { useState, useMemo } from 'react'
import { useSelector } from 'react-redux'

import Masonry from 'react-masonry-css'

import {
  ALL_NOTES_STATUS,
  NOTES_PER_PAGE,
  SORT_BY_A_TO_Z,
  SORT_BY_OLDEST,
  SORT_BY_RECENT,
  SORT_BY_Z_TO_A,
} from '../../../app/constants'
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

export default function NotesList({ maxNotes = null }) {
  const [currentPage, setCurrentPage] = useState(1)
  const notes = useSelector(getNotes)
  const noteStatus = useSelector(getNotesActiveFilterStatus)
  const sortBy = useSelector(getNoteSortBy)
  const searchQuery = useSelector(getNoteSearchQuery)
  const searchParam = useSelector(getNoteSearchParam)
  const selectedWorkspace = useSelector(getSelectedWorkspace)

  const preparedData = useMemo(() => {
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

    const data = preparedData.filter((object) =>
      searchParam.some((objectKeyName) =>
        object[objectKeyName]
          ?.toString()
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
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
      data: maxNotes
        ? data.slice(0, maxNotes)
        : data.slice(firstPageIndex, lastPageIndex),
    }
  }, [preparedData, currentPage, sortBy, searchParam, searchQuery])

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
      {!maxNotes && (
        <Pagination
          currentPage={currentPage}
          totalCount={filteredData.length}
          pageSize={NOTES_PER_PAGE}
          onPageChange={(page) => {
            window.scrollTo(0, 0)
            setCurrentPage(page)
          }}
        />
      )}
    </>
  )
}
