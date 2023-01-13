import React from 'react'

import { Form } from 'react-bootstrap'

import {
  SORT_BY_A_TO_Z,
  SORT_BY_OLDEST,
  SORT_BY_RECENT,
  SORT_BY_Z_TO_A,
} from '../../../app/constants'

import '../Form.css'

export default function FilterFormComponent({ label, value, onChange }) {
  return (
    <div className="custom-form">
      <Form.Label htmlFor="sortSelect">{label}</Form.Label>
      <Form.Select id="sortSelect" onChange={onChange} value={value}>
        <option value={SORT_BY_RECENT}>Recent</option>
        <option value={SORT_BY_OLDEST}>Oldest</option>
        <option value={SORT_BY_A_TO_Z}>Alphabetically A-Z</option>
        <option value={SORT_BY_Z_TO_A}>Alphabetically Z-A</option>
      </Form.Select>
    </div>
  )
}
