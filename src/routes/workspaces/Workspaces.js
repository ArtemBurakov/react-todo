import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'

export default function Workspaces() {
  const navigate = useNavigate()
  const onButtonClick = () => {
    navigate('workspaceId')
  }

  return (
    <>
      <div>Workspaces</div>
      <Button onClick={onButtonClick}>Selected workspace</Button>
    </>
  )
}
