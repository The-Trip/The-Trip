import React from "react";
import '../styles/components/Nav.scss';
import { NavLink } from "react-router-dom";


function Nav () {
  return (
        <header className="app__header">
            <h1 className="app__title">The Trip</h1>

            <nav className="nav">
                <ul className="nav__menu menu--settings">
                        <li className="nav__menuitem"><NavLink to="/login/" activeClassName="active">Login</NavLink></li>
                        <li className="nav__menuitem"><NavLink to="/trip/" activeClassName="active">Your Trips</NavLink></li>
                        <li className="nav__menuitem"><NavLink to="/create-trip/" activeClassName="active">Create a Trip</NavLink></li>       
                </ul>
            </nav>
        </header>
  );
}

export default Nav;