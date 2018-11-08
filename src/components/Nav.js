import React from "react";
import '../styles/components/Nav.scss';

function Nav ({ view }) {
  return (
    <React.Fragment>

        <header className="app__header">
            <h1 className="app__title">The Trip</h1>

            <nav className="nav">
                <ul className="nav__menu menu--settings">
                    <a className="nav__menulink" href="LINK PATH">
                        <li className="nav__menuitem">Login</li>
                    </a>
                    <a className="nav__menulink"href="LINK PATH">
                        <li className="nav__menuitem">Your Trips</li>
                    </a>
                    <a className="nav__menulink"href="LINK PATH">
                        <li className="nav__menuitem">Create a Trip</li>
                    </a>                  
                </ul>
            </nav>
        </header>

    </React.Fragment>
  );
}

export default Nav;