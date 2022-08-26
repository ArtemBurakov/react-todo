import { Outlet } from 'react-router-dom'

import { Container } from 'react-bootstrap'

import Header from './Header/Header'
import Footer from './Footer/Footer'

export default function AppLayout() {
  return (
    <>
      <Header />
      <Container className="mt-3">
        <Outlet />
      </Container>
      <Footer />
    </>
  )
}
