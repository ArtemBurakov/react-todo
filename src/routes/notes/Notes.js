import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'

export default function Notes() {
  const navigate = useNavigate()
  const onButtonClick = () => {
    navigate('noteId')
  }

  return (
    <>
      <div>Notes</div>
      <Button onClick={onButtonClick}>Selected note</Button>
    </>
  )
}
