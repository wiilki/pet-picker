import React from 'react';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';

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
        <header className="flex-row">
            <h1>
                <Link to="/">
                    Pet Picker
                </Link>
            </h1>

            <nav>{showNavigation()}</nav>
        </header>
    );
}

export default Nav;
