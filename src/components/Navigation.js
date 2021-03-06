import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

function Navigation() {
  return (
    <Navbar collapseOnSelect expand='sm' bg='dark' variant='dark'>
      <Link to='/' className='navbar-brand'>
        Nostalgic games
      </Link>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='mr-auto'>
          <Link to='/memory' className='nav-link'>
            Memory
          </Link>
          <Link to='/snake' className='nav-link'>
            Snake
          </Link>
          <Link to='/minesweeper' className='nav-link'>
            Minesweeper
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation
