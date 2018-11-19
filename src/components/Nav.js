import React from "react";
import "../styles/components/Nav.scss";
import { NavLink } from "react-router-dom";

class Nav extends React.Component {
  componentDidMount() {
    this.props.checkLogin();
  }

  componentDidUpdate(oldProps) {
    if (this.props.user && !oldProps.user) {
      this.props.history.push(`/trips/`);
    }
    if (this.props.registered && !oldProps.registered) {
      this.props.history.push(`/login/`);
    }
  }

  render() {
    return (
      <header className="sitehead shrink">
        <nav className="sitehead__nav">
          <NavLink to="/trips/" activeClassName="active" className="nav__item">
            <i className="fas fa-home fa-lg" aria-hidden="true" />
          </NavLink>
          <NavLink
            to="/create-trip/"
            activeClassName="active"
            className="nav__item"
          >
            <i className="fas fa-plus fa-lg" aria-hidden="true" />
          </NavLink>
        </nav>

        <h1 className="sitehead__title">
          <NavLink to="/">The Trip</NavLink>
        </h1>

        <div className="sitehead__logout">
          {/* <NavLink to="/invite/" activeClassName="active" className="nav__item">
            <i className="fas fa-envelope fa-lg" aria-hidden="true" />
          </NavLink> */}
          <NavLink to="/login/" activeClassName="active" className="nav__item">
            <i className="fas fa-sign-in-alt fa-lg" aria-hidden="true" />
          </NavLink>
        </div>
      </header>
    );
  }
}

export default Nav;
