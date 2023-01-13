import React from 'react'
import { useNavigate } from 'react-router-dom'

import classNames from 'classnames'
import { ListGroup, Accordion } from 'react-bootstrap'

import { SHOW_MORE_WORKSPACES_LINK_TEXT } from '../../../app/constants'

export default function FilterListItem({
  title,
  data,
  onSelect,
  activeFilter,
  eventKey,
  enableShowMoreLink = false,
}) {
  const navigate = useNavigate()

  if (!data) return

  return (
    <Accordion.Item eventKey={eventKey}>
      <Accordion.Header>{title}</Accordion.Header>
      <Accordion.Body className="p-0">
        <ListGroup.Item className="border-0">
          <ListGroup>
            {data.map((item) => (
              <ListGroup.Item
                action
                key={item.name}
                onClick={() => onSelect(item)}
                className={classNames('border-0 rounded text-truncate', {
                  'text-primary fw-bold': activeFilter.name === item.name,
                })}
              >
                {item.name}
              </ListGroup.Item>
            ))}
            {enableShowMoreLink && (
              <ListGroup.Item
                action
                key={SHOW_MORE_WORKSPACES_LINK_TEXT}
                onClick={() => navigate('/workspaces')}
                className="border-0 rounded text-truncate"
              >
                {SHOW_MORE_WORKSPACES_LINK_TEXT}
              </ListGroup.Item>
            )}
          </ListGroup>
        </ListGroup.Item>
      </Accordion.Body>
    </Accordion.Item>
  )
}
