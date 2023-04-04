import React from 'react';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';
import './index.css'

function Nav() {
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row">
          <li>
            <Link to="/favorites">Favorite Pets</Link>
          </li>
          <li>
            <Link to="/search">Search Pets</Link>
          </li>
          <li>
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="flex-row">
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/search">Search Pets</Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <header className="nav-header">
      <h1>
        <Link to="/" className="logo-link">
          Pet Picker
        </Link>
      </h1>

      <nav className="nav-links">{showNavigation()}</nav>
    </header>
  );
}

export default Nav;