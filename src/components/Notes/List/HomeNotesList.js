import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Row } from 'react-bootstrap'
import Masonry from 'react-masonry-css'

import NoteItem from './NoteItem'
import LoadingNotesList from './LoadingNotesList'
import { STATUS_DELETED } from '../../../app/constants'
import { notesBreakpointColumns } from './NotesBreakpointColumns'

import {
  getFetchNotesLoading,
  getNotes,
} from '../../../features/notes/notesSlice'
import { getFetchTasksLoading } from '../../../features/tasks/tasksSlice'

export default function HomeNotesList({ maxNotes }) {
  const notes = useSelector(getNotes)
  const fetchNotesLoading = useSelector(getFetchNotesLoading)
  const fetchTasksLoading = useSelector(getFetchTasksLoading)

  const filteredData = useMemo(() => {
    const data = notes
      .filter((note) => note.status !== STATUS_DELETED)
      .sort((a, b) => b.updated_at - a.updated_at)
      .sort((a, b) => a.status - b.status)

    return data.slice(0, maxNotes)
  }, [notes])

  return (
    <>
      {filteredData.length > 0 && (
        <Row>
          <Link className="link-title mt-2 mb-2" to="notes">
            NOTES
          </Link>
          {[fetchNotesLoading, fetchTasksLoading].includes('pending') ? (
            <LoadingNotesList numberOfNotes={maxNotes} />
          ) : (
            <Masonry
              breakpointCols={notesBreakpointColumns}
              className="masonry-grid"
              columnClassName="masonry-grid_column"
            >
              {filteredData?.map((note) => (
                <NoteItem note={note} key={note.id} />
              ))}
            </Masonry>
          )}
        </Row>
      )}
    </>
  )
}
