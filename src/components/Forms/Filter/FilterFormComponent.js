import React from 'react'

import { Form } from 'react-bootstrap'

import '../Form.css'

export default function FilterFormComponent({ label, value, onChange }) {
  return (
    <div className="custom-form">
      <Form.Label htmlFor="sortSelect">{label}</Form.Label>
      <Form.Select id="sortSelect" onChange={onChange} value={value}>
        <option value="recent">Recent</option>
        <option value="oldest">Oldest</option>
        <option value="aToZ">Alphabetically A-Z</option>
        <option value="zToA">Alphabetically Z-A</option>
      </Form.Select>
    </div>
  )
}
