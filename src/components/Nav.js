import React from "react";
import "../styles/components/Nav.scss";
import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <header className="sitehead shrink">
      <nav className="sitehead__nav">
        <NavLink to="/trips/" activeClassName="active" className="nav__item">
          <i className="fas fa-home fa-lg" />
        </NavLink>
        <NavLink
          to="/create-trip/"
          activeClassName="active"
          className="nav__item"
        >
          <i className="fas fa-plus-circle fa-lg" />
        </NavLink>
      </nav>

      <h1 className="sitehead__title">
        <NavLink to="/">The Trip</NavLink>
      </h1>

      <div className="sitehead__logout">
        <NavLink to="/login/" activeClassName="active" className="nav__item">
          <i className="fas fa-sign-in-alt fa-lg" />
        </NavLink>
      </div>
    </header>
  );
}

export default Nav;
