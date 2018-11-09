import React from "react";
import '../styles/components/Nav.scss';
import { NavLink } from "react-router-dom";


function Nav () {
  return (

        <header className="sitehead shrink">

        <nav className="sitehead__nav">

           <NavLink to="/create-trip/" activeClassName="active" className="nav__item">Trip</NavLink>

            <NavLink to="/trip/" activeClassName="active" className="nav__item"><i className="far fa-user"></i></NavLink>

        </nav>

        <h1 className="sitehead__title">The Trip</h1>

        <div className="sitehead__logout">
        <NavLink to="/login/" activeClassName="active" className="nav__item"><i className="fas fa-sign-in-alt"></i></NavLink></div>

        </header>
        

  );
}

export default Nav;