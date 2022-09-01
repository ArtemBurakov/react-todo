import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'

import { Form } from 'react-bootstrap'

import {
  getSearchQuery,
  setSearchQuery,
} from '../../features/search/searchSlice'

export default function Search() {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const searchQuery = useSelector(getSearchQuery)

  const handleQuery = (event) => dispatch(setSearchQuery(event.target.value))

  const onSearchFormControlFocus = () => {
    if (location.pathname === '/search') return
    navigate('search', { replace: true })
  }

  return (
    <Form className="d-flex">
      <Form.Control
        type="search"
        placeholder="Search"
        className="me-2"
        aria-label="Search"
        value={searchQuery}
        onChange={handleQuery}
        onFocus={onSearchFormControlFocus}
      />
    </Form>
  )
}
