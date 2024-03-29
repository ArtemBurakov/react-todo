import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Row, Col } from 'react-bootstrap'

import SearchFormComponent from '../Forms/Search/SearchFormComponent'
import FilterFormComponent from '../Forms/Filter/FilterFormComponent'

import {
  getWorkspaceSearchQuery,
  getWorkspaceSortBy,
  setWorkspaceSearchQuery,
  setWorkspaceSortBy,
} from '../../features/workspaces/workspacesSlice'

export default function WorkspacesFilterForm() {
  const dispatch = useDispatch()
  const sortBy = useSelector(getWorkspaceSortBy)
  const searchQuery = useSelector(getWorkspaceSearchQuery)

  const onFormSelectChange = (event) =>
    dispatch(setWorkspaceSortBy(event.target.value))
  const onFormControlChange = (event) =>
    dispatch(setWorkspaceSearchQuery(event.target.value))

  return (
    <Row className="mt-0 mb-3">
      <Col xs={7} sm={7} md={8}>
        <SearchFormComponent
          label="Search"
          placeholder="Search workspaces"
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
