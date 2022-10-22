import React from 'react'

import { Form } from 'react-bootstrap'

import '../Form.css'

export default function SearchFormComponent({
  label,
  placeholder,
  value,
  onChange,
}) {
  return (
    <div className="custom-form">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
