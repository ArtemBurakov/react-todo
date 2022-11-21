import React from 'react'

import classNames from 'classnames'
import { ListGroup, Accordion } from 'react-bootstrap'

export default function FilterListItem({
  title,
  data,
  onSelect,
  activeFilter,
  eventKey,
}) {
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
                className={classNames('border-0 rounded text-truncate mb-1', {
                  'text-primary fw-bold': activeFilter.name === item.name,
                })}
              >
                {item.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </ListGroup.Item>
      </Accordion.Body>
    </Accordion.Item>
  )
}
