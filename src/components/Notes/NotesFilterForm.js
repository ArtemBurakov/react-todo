import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Row, Col } from 'react-bootstrap'

import {
  getNoteSearchQuery,
  getNoteSortBy,
  setNoteSearchQuery,
  setNoteSortBy,
} from '../../features/notes/notesSlice'
import SearchFormComponent from '../Forms/Search/SearchFormComponent'
import FilterFormComponent from '../Forms/Filter/FilterFormComponent'

export default function NotesFilterForm() {
  const dispatch = useDispatch()
  const sortBy = useSelector(getNoteSortBy)
  const searchQuery = useSelector(getNoteSearchQuery)

  const onFormSelectChange = (event) =>
    dispatch(setNoteSortBy(event.target.value))
  const onFormControlChange = (event) =>
    dispatch(setNoteSearchQuery(event.target.value))

  return (
    <Row className="mt-0 mb-3">
      <Col xs={7} sm={7} md={8}>
        <SearchFormComponent
          label="Search"
          placeholder="Search notes"
          value={searchQuery}
          onChange={onFormControlChange}
        />
      </Col>
      <Col xs={5} sm={5} md={4}>
        <FilterFormComponent
          label="Sort by"
          value={sortBy}
          onChange={onFormSelectChange}
        />
      </Col>
    </Row>
  )
}
