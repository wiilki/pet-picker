import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Signup from '../../pages/Signup';
import Login from '../../pages/Login';

import Auth from '../../utils/auth';

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <nav style={{ backgroundColor: 'dark' }}>
        <div className='container-fluid'>
          <Link className='navbar-brand' to='/'>
            Pet Picker
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#navbar'
            aria-controls='navbar'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse d-flex flex-row-reverse' id='navbar'>
            <ul className='navbar-nav ml-auto d-flex'>
              <li className='nav-item'>
                <Link className='nav-link' to='/'>
                  Search For Pets
                </Link>
              </li>
              {/* if user is logged in show saved pets and logout */}
              {Auth.loggedIn() ? (
                <>
                  <li className='nav-item'>
                    <Link className='nav-link' to='/saved'>
                      See Your Pets
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <button className='nav-link' onClick={Auth.logout}>
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li className='nav-item'>
                  <button className='nav-link' onClick={() => setShowModal(true)}>
                    Login/Sign Up
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      {/* set modal data up */}
      {showModal ? (
        <div>
          {/* tab container to do either signup or login component */}
          <div>
            <div>
              <button className='btn btn-secondary' onClick={() => setShowModal(false)}>
                Close
              </button>
            </div>
            <div>
              <ul className='nav nav-pills nav-fill mb-3' role='tablist'>
                <li className='nav-item' role='presentation'>
                  <button
                    className='nav-link active'
                    data-bs-toggle='tab'
                    data-bs-target='#login'
                    type='button'
                    role='tab'
                    aria-controls='login'
                    aria-selected='true'
                  >
                    Login
                  </button>
                </li>
                <li className='nav-item' role='presentation'>
                  <button
                    className='nav-link'
                    data-bs-toggle='tab'
                    data-bs-target='#signup'
                    type='button'
                    role='tab'
                    aria-controls='signup'
                    aria-selected='false'
                  >
                    Sign Up
                  </button>
                </li>
              </ul>
              <div className='tab-content'>
                <div className='tab-pane fade show active' id='login' role='tabpanel'>
                  <Login handleModalClose={() => setShowModal(false)} />
                </div>
                <div className='tab-pane fade' id='signup' role='tabpanel'>
                  <Signup handleModalClose={() => setShowModal(false)} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default AppNavbar;
