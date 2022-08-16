import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'

export default function Tasks() {
  const navigate = useNavigate()
  const onButtonClick = () => {
    navigate('taskId')
  }

  return (
    <>
      <div>Tasks</div>
      <Button onClick={onButtonClick}>Selected task</Button>
    </>
  )
}
