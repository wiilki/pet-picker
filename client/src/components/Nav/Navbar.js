import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Auth from '../../utils/auth';
import AuthModal from './AuthModal'; // Update this path as necessary
import '../../styles/navbar.css';

const NavigationBar = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Container fluid>
          <Navbar.Brand as={Link} to='/'>
            Pet Picker
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbar' />
          <Navbar.Collapse id='navbar' className='d-flex flex-row-reverse'>
            <Nav className='ml-auto d-flex'>
              <Nav.Link as={Link} to='/'>
                Search For Pets
              </Nav.Link>
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link as={Link} to='/favorites'>
                    See Your Pets
                  </Nav.Link>
                  <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* AuthModal component is now used here */}
      <AuthModal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default NavigationBar;
