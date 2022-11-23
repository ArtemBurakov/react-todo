import { useState } from 'react'

import { Button, Offcanvas } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListUl } from '@fortawesome/free-solid-svg-icons'

import NotesFilterList from './FilterList/NotesFilterList'

export default function NotesOffCanvas() {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <Button variant="primary" className="d-md-none" onClick={handleShow}>
        <FontAwesomeIcon icon={faListUl} />
      </Button>

      <Offcanvas show={show} onHide={handleClose} responsive="md">
        <Offcanvas.Header
          className="justify-content-end"
          closeButton
        ></Offcanvas.Header>
        <Offcanvas.Body className="p-0 d-md-none">
          <NotesFilterList onListItemSelect={handleClose} flush={true} />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}
