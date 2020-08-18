import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

function Navigation() {
  return (
    <Navbar collapseOnSelect expand='sm' bg='light' variant='light'>
      <Navbar.Brand href='/'>Games</Navbar.Brand>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='mr-auto'>
          <Nav.Link href='/memory'>Memory</Nav.Link>
          <Nav.Link href='/snake'>Snake</Nav.Link>
          <Nav.Link href='/minesweeper'>Minesweeper</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation
