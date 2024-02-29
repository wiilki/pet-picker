import React, { useState } from 'react';
import Navbar from './Navbar';
import { Modal, Tab } from 'react-bootstrap';
import Signup from '../../pages/Signup';
import Login from '../../pages/Login';
import '../../styles/navbar.css'

const Header = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Navbar setShowModal={setShowModal} />
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title>Login/Sign Up</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'><Login handleModalClose={() => setShowModal(false)} /></Tab.Pane>
              <Tab.Pane eventKey='signup'><Signup handleModalClose={() => setShowModal(false)} /></Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default Header;
