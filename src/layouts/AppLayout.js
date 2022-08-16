import { Outlet } from 'react-router-dom'
import Container from 'react-bootstrap/Container'

import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'

export default function AppLayout() {
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </>
  )
}
