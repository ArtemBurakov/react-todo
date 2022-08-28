import React from 'react'

import { Placeholder } from 'react-bootstrap'

export default function LoadingWorkspace() {
  return (
    <>
      <Placeholder as="h4" animation="glow">
        <Placeholder xs={7} />
      </Placeholder>
      <Placeholder.Button xs={2} aria-hidden="true" variant="secondary" />
    </>
  )
}
